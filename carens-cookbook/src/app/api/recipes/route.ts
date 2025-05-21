import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';

// Define a Zod schema for incoming recipe data for creation
// This should match the structure expected from the client when saving a recipe.
// It's similar to the schema in fetch-recipe, but this is for *saving*
// so all fields are expected to be present from the already parsed/generated recipe.
const createRecipeSchema = z.object({
  title: z.string().min(1, "Title is required"),
  ingredients: z.array(z.string()).min(1, "Ingredients are required"),
  steps: z.array(z.string()).min(1, "Steps are required"),
  image: z.string().url("Image must be a valid URL if present.").nullable(),
  description: z.string().min(1, "Description is required"),
  cuisine: z.string().min(1, "Cuisine is required"),
  category: z.string().min(1, "Category is required"),
  prepTime: z.string().min(1, "Prep time is required"),
  cleanupTime: z.string().min(1, "Cleanup time is required"),
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const recipeData = createRecipeSchema.parse(body);

    // Check if a recipe with the same title already exists (optional, but good for preventing exact duplicates)
    const existingRecipe = await prisma.recipe.findFirst({
      where: { title: recipeData.title },
    });

    if (existingRecipe) {
      // Optionally, you could update the existing recipe or return a specific message/status
      // For now, let's just return a conflict error if title is exactly the same
      return NextResponse.json({ error: 'A recipe with this title already exists.' }, { status: 409 });
    }

    const newRecipe = await prisma.recipe.create({
      data: recipeData,
    });

    return NextResponse.json(newRecipe, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid recipe data provided.", details: error.format() }, { status: 400 });
    }
    console.error('Error creating recipe:', error instanceof Error ? error.message : String(error));
    return NextResponse.json({ error: 'Failed to save recipe.', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');

    let whereClause = {};
    if (category) {
      whereClause = { category };
    }

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
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const recipeId = searchParams.get('id');

    if (!recipeId) {
      return NextResponse.json({ error: 'Recipe ID is required for deletion.' }, { status: 400 });
    }

    // Check if the recipe exists before attempting to delete
    const existingRecipe = await prisma.recipe.findUnique({
      where: { id: recipeId },
    });

    if (!existingRecipe) {
      return NextResponse.json({ error: 'Recipe not found.' }, { status: 404 });
    }

    await prisma.recipe.delete({
      where: { id: recipeId },
    });

    return NextResponse.json({ message: 'Recipe deleted successfully.' }, { status: 200 });
  } catch (error: unknown) {
    console.error('Error deleting recipe:', error instanceof Error ? error.message : String(error));
    return NextResponse.json({ error: 'Failed to delete recipe.', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    // Validate only the parts of the schema that are present in the body
    // For partial updates, you might use .partial() on your main schema if all fields were optional
    // or a specific update schema like we have defined.
    const validatedData = updateRecipeSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json({ error: "Invalid recipe data provided for update.", details: validatedData.error.format() }, { status: 400 });
    }

    const { id, ...updatePayload } = validatedData.data;

    // Check if there's anything to update
    if (Object.keys(updatePayload).length === 0) {
      return NextResponse.json({ error: "No update data provided.", details: "Please provide fields to update, e.g., title." }, { status: 400 });
    }

    // Check if the recipe exists
    const existingRecipe = await prisma.recipe.findUnique({
      where: { id },
    });

    if (!existingRecipe) {
      return NextResponse.json({ error: 'Recipe not found for update.' }, { status: 404 });
    }

    // If updating title, optionally check for title uniqueness again if it's a strict requirement
    if (updatePayload.title && updatePayload.title !== existingRecipe.title) {
      const recipeWithSameTitle = await prisma.recipe.findFirst({
        where: { 
          title: updatePayload.title,
          NOT: { id: id } // Exclude the current recipe from the check
        },
      });
      if (recipeWithSameTitle) {
        return NextResponse.json({ error: 'Another recipe with this title already exists.' }, { status: 409 });
      }
    }

    const updatedRecipe = await prisma.recipe.update({
      where: { id },
      data: updatePayload, // Prisma will only update fields present in updatePayload
    });

    return NextResponse.json(updatedRecipe, { status: 200 });
  } catch (error: unknown) {
    // ZodError was handled by safeParse, but other errors might occur
    console.error('Error updating recipe:', error instanceof Error ? error.message : String(error));
    return NextResponse.json({ error: 'Failed to update recipe.', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
} 