import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';
import { auth } from '@clerk/nextjs/server';
import { withOnboardingGuard } from '@/lib/middleware/onboarding-guard';

// Define a Zod schema for incoming recipe data for creation
// This should match the structure expected from the client when saving a recipe.
// It's similar to the schema in fetch-recipe, but this is for *saving*
// so all fields are expected to be present from the already parsed/generated recipe.
const createRecipeSchema = z.object({
  title: z.string().min(1, "Title is required"),
  ingredients: z.array(z.string()).min(1, "Ingredients are required"),
  steps: z.array(z.string()).min(1, "Steps are required"),
  image: z.string().url("Image must be a valid URL if present.").nullable(),
  description: z.string().default("").transform(val => val || ""),
  cuisine: z.string().default("").transform(val => val || ""),
  category: z.string().default("Uncategorized").transform(val => val || "Uncategorized"),
  prepTime: z.string().default("").transform(val => val || ""),
  cleanupTime: z.string().default("").transform(val => val || ""),
  // createdAt and updatedAt will be handled by Prisma
});

// Zod schema for updating a recipe (e.g., just the title)
const updateRecipeSchema = z.object({
  id: z.string().min(1, "Recipe ID is required for an update."),
  title: z.string().min(1, "Title cannot be empty.").optional(),
  // Add other fields here if you want to allow updating them, e.g.:
  // ingredients: z.array(z.string()).min(1).optional(),
  // steps: z.array(z.string()).min(1).optional(),
  // etc.
});

export const POST = withOnboardingGuard(async (req: NextRequest) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const recipeData = createRecipeSchema.parse(body);

    // Ensure user exists in database
    // Check if user exists first to avoid unique constraint issues
    const existingUser = await prisma.user.findUnique({
      where: { id: userId }
    });
    
    if (!existingUser) {
      // Create user with a unique temporary email to avoid constraint violations
      await prisma.user.create({
        data: { 
          id: userId, 
          email: `temp-${userId}@placeholder.local` // Temporary unique email
        }
      });
    }

    // Check if a recipe with the same title already exists for this user
    const existingRecipe = await prisma.recipe.findFirst({
      where: { 
        title: recipeData.title,
        userId: userId
      },
    });

    if (existingRecipe) {
      return NextResponse.json({ error: 'A recipe with this title already exists in your collection.' }, { status: 409 });
    }

    const newRecipe = await prisma.recipe.create({
      data: {
        title: recipeData.title,
        description: recipeData.description,
        ingredients: recipeData.ingredients,
        steps: recipeData.steps,
        image: recipeData.image,
        cuisine: recipeData.cuisine,
        category: recipeData.category,
        prepTime: recipeData.prepTime,
        cleanupTime: recipeData.cleanupTime,
        userId: userId
      },
    });

    return NextResponse.json(newRecipe, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid recipe data provided.", details: error.format() }, { status: 400 });
    }
    console.error('Error creating recipe:', error instanceof Error ? error.message : String(error));
    return NextResponse.json({ error: 'Failed to save recipe.', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
});

export const GET = withOnboardingGuard(async (req: NextRequest) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');

    const whereClause = {
      userId,
      ...(category && { category })
    };

    const recipes = await prisma.recipe.findMany({
      where: whereClause,
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(recipes, { status: 200 });
  } catch (error: unknown) {
    console.error('Error fetching recipes:', error instanceof Error ? error.message : String(error));
    return NextResponse.json({ error: 'Failed to fetch recipes.', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
});

export const DELETE = withOnboardingGuard(async (req: NextRequest) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const recipeId = searchParams.get('id');

    if (!recipeId) {
      return NextResponse.json({ error: 'Recipe ID is required for deletion.' }, { status: 400 });
    }

    // Check if the recipe exists and belongs to the user
    const existingRecipe = await prisma.recipe.findFirst({
      where: { 
        id: recipeId,
        userId: userId
      },
    });

    if (!existingRecipe) {
      return NextResponse.json({ error: 'Recipe not found or access denied.' }, { status: 404 });
    }

    await prisma.recipe.delete({
      where: { id: recipeId },
    });

    return NextResponse.json({ message: 'Recipe deleted successfully.' }, { status: 200 });
  } catch (error: unknown) {
    console.error('Error deleting recipe:', error instanceof Error ? error.message : String(error));
    return NextResponse.json({ error: 'Failed to delete recipe.', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
});

export const PUT = withOnboardingGuard(async (req: NextRequest) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validatedData = updateRecipeSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json({ error: "Invalid recipe data provided for update.", details: validatedData.error.format() }, { status: 400 });
    }

    const { id, ...updatePayload } = validatedData.data;

    // Check if there's anything to update
    if (Object.keys(updatePayload).length === 0) {
      return NextResponse.json({ error: "No update data provided.", details: "Please provide fields to update, e.g., title." }, { status: 400 });
    }

    // Check if the recipe exists and belongs to the user
    const existingRecipe = await prisma.recipe.findFirst({
      where: { 
        id,
        userId: userId
      },
    });

    if (!existingRecipe) {
      return NextResponse.json({ error: 'Recipe not found or access denied.' }, { status: 404 });
    }

    // If updating title, check for title uniqueness within user's recipes
    if (updatePayload.title && updatePayload.title !== existingRecipe.title) {
      const recipeWithSameTitle = await prisma.recipe.findFirst({
        where: { 
          title: updatePayload.title,
          userId: userId,
          NOT: { id: id }
        },
      });
      if (recipeWithSameTitle) {
        return NextResponse.json({ error: 'Another recipe with this title already exists in your collection.' }, { status: 409 });
      }
    }

    const updatedRecipe = await prisma.recipe.update({
      where: { id },
      data: updatePayload,
    });

    return NextResponse.json(updatedRecipe, { status: 200 });
  } catch (error: unknown) {
    console.error('Error updating recipe:', error instanceof Error ? error.message : String(error));
    return NextResponse.json({ error: 'Failed to update recipe.', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}); 