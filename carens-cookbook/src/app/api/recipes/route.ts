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

export async function GET() {
  try {
    const recipes = await prisma.recipe.findMany({
      orderBy: {
        createdAt: 'desc', // Order by newest first
      },
    });
    return NextResponse.json(recipes, { status: 200 });
  } catch (error: unknown) {
    console.error('Error fetching recipes:', error instanceof Error ? error.message : String(error));
    return NextResponse.json({ error: 'Failed to fetch recipes.', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
} 