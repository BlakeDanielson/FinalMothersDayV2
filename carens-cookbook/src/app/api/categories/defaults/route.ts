import { NextRequest, NextResponse } from 'next/server';
import { PREDEFINED_CATEGORIES, CATEGORY_METADATA } from '@/lib/constants/categories';

export async function GET(request: NextRequest) {
  try {
    // Get query parameters for filtering
    const { searchParams } = new URL(request.url);
    const includeMetadata = searchParams.get('includeMetadata') === 'true';
    const format = searchParams.get('format') || 'detailed'; // 'simple' | 'detailed'

    if (format === 'simple') {
      // Return just the category names
      return NextResponse.json({
        success: true,
        categories: PREDEFINED_CATEGORIES,
        count: PREDEFINED_CATEGORIES.length
      });
    }

    // Return detailed format with metadata
    const categoriesWithMetadata = PREDEFINED_CATEGORIES.map(categoryName => {
      const metadata = CATEGORY_METADATA[categoryName];
      
      const categoryInfo: any = {
        name: categoryName,
        isPredefined: true,
        isDefault: true
      };

      if (includeMetadata && metadata) {
        categoryInfo.description = metadata.description;
        categoryInfo.aliases = metadata.aliases;
        categoryInfo.icon = metadata.icon;
        categoryInfo.color = metadata.color;
        categoryInfo.isCore = metadata.isCore;
      }

      return categoryInfo;
    });

    // Sort by name if metadata is included
    if (includeMetadata) {
      categoriesWithMetadata.sort((a, b) => {
        // Core categories first, then alphabetical
        if (a.isCore !== b.isCore) {
          return a.isCore ? -1 : 1;
        }
        return a.name.localeCompare(b.name);
      });
    }

    return NextResponse.json({
      success: true,
      categories: categoriesWithMetadata,
      count: categoriesWithMetadata.length,
      metadata: {
        totalPredefined: PREDEFINED_CATEGORIES.length,
        withMetadata: categoriesWithMetadata.filter(c => c.description).length,
        format,
        includeMetadata
      }
    });

  } catch (error: unknown) {
    console.error('Error fetching default categories:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch default categories',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // This endpoint could be used to update default categories (admin only)
    // For now, return method not allowed
    return NextResponse.json(
      { 
        error: 'Method not implemented',
        message: 'Default category updates are not currently supported via API'
      },
      { status: 501 }
    );

  } catch (error: unknown) {
    console.error('Error in default categories POST:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process request',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
} 