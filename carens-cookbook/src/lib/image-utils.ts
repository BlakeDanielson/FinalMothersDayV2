import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';
import { finished } from 'stream/promises';

// Helper to create a URL-friendly slug
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .substring(0, 75); // Truncate
}

export async function saveImageLocally(
  imageUrl: string,
  recipeTitle: string
): Promise<string | null> {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
    }

    if (!response.body) {
      throw new Error('Image response body is null');
    }

    // Determine file extension (default to .png if not obvious)
    const contentType = response.headers.get('content-type');
    let extension = '.png'; // Default
    if (contentType) {
      if (contentType.includes('jpeg') || contentType.includes('jpg')) {
        extension = '.jpg';
      } else if (contentType.includes('webp')) {
        extension = '.webp';
      } // Add more types if GPT might return them
    }

    const filename = `${slugify(recipeTitle)}-${Date.now()}${extension}`;
    const imagePath = path.join(process.cwd(), 'public', 'generated_recipes_images', filename);
    
    // Ensure the directory exists (though we created it, good for robustness)
    const dirname = path.dirname(imagePath);
    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname, { recursive: true });
    }

    const fileStream = fs.createWriteStream(imagePath);
    // @ts-expect-error Node.js Readable.fromWeb expects a Web ReadableStream, and Readable.fromWeb might not be recognized in all TS configs for Node built-ins without specific lib settings.
    await finished(Readable.fromWeb(response.body as ReadableStream<Uint8Array>).pipe(fileStream));

    const publicUrl = `/generated_recipes_images/${filename}`;
    console.log(`Image saved locally: ${publicUrl}`);
    return publicUrl;

  } catch (error) {
    console.error('Error saving image locally:', error);
    return null;
  }
} 