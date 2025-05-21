# Console Log Statements to Review and Remove

This file lists console logging statements found in the `carens-cookbook/src` directory. These were added for debugging and should be reviewed. Consider removing them before creating a production build or when they are no longer needed for active development.

## `carens-cookbook/src/app/page.tsx`

- Line 189: `console.log("Progress: 10%", "Okay, let's go find that recipe! 🧑‍🍳");`
- Line 193: `console.log("Progress: 25%", "Visiting the recipe page for you... 📄");`
- Line 205: `console.error("Error fetching from API:", errorData);`
- Line 209: `console.log("Progress: 75%", "Asking the chef (AI) to read the recipe... 🧐");`
- Line 214: `console.log("Progress: 90%", "Getting it all plated up for you... ✨");`
- Line 218: `console.log("Recipe data fetched successfully:", recipeData);`
- Line 221: `console.log("Progress: 100%");`
- Line 227: `console.error("Error in handleSubmit:", err);`
- Line 231: `console.log("Finally block: Resetting loading state.");`
- Line 239: `console.log("Recipe saved (simulated):", recipeToSave.title);`

## `carens-cookbook/src/app/api/fetch-recipe/route.ts`

- Line 44: `console.error('OPENAI_API_KEY is not set.');`
- Line 47: `console.log(\`Fetching recipe for URL: ${url} using OpenAI direct mode\`);`
- Line 54: `console.log(\`Original HTML length: ${htmlContent.length}\`); // Log original length`
- Line 59: `console.log(\`Sanitized HTML length: ${sanitizedHtml.length}\`); // Log sanitized length`
- Line 79: `console.error(\`Error in /api/fetch-recipe (OpenAI mode):\`, error);`
- Line 110: `console.error('Error Details:', errorDetails);`

## `carens-cookbook/src/components/GreetingScreen.tsx`

- Line 179: `console.error("Failed to load images", error);` 