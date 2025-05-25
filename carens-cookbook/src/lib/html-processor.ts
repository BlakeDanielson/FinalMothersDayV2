import * as cheerio from 'cheerio';

export function getSanitizedHtml(rawHtml: string): string {
  // First pass: aggressive regex-based cleanup for speed
  let optimizedHtml = rawHtml
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<nav\b[^<]*(?:(?!<\/nav>)<[^<]*)*<\/nav>/gi, '')
    .replace(/<footer\b[^<]*(?:(?!<\/footer>)<[^<]*)*<\/footer>/gi, '')
    .replace(/<aside\b[^<]*(?:(?!<\/aside>)<[^<]*)*<\/aside>/gi, '')
    .replace(/<head\b[^<]*(?:(?!<\/head>)<[^<]*)*<\/head>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  // If still too large, use cheerio for more precise extraction
  if (optimizedHtml.length > 400000) { // ~80K tokens limit
    try {
      const $ = cheerio.load(optimizedHtml);

      // More aggressive element removal
      $('script, style, nav, footer, header, aside').remove();
      $('[role="banner"], [role="contentinfo"], [role="navigation"], [role="complementary"]').remove();
      $('.ad, .advertisement, .ads, .social-share, .comments, .newsletter').remove();
      $('#comments, #social, #sidebar, #ads').remove();

      // Try to isolate recipe content
      let recipeContent = '';
      
      // Look for structured data first
      const jsonLd = $('script[type="application/ld+json"]').text();
      if (jsonLd && jsonLd.includes('Recipe')) {
        recipeContent += jsonLd;
      }

      // Look for common recipe selectors
      const recipeSelectors = [
        '[class*="recipe"]',
        '[id*="recipe"]',
        '.ingredients',
        '.instructions',
        '.directions',
        '[itemtype*="Recipe"]',
        '.recipe-card',
        '.entry-content'
      ];

      for (const selector of recipeSelectors) {
        const elements = $(selector);
        if (elements.length > 0) {
          recipeContent += elements.html() || '';
        }
      }

      // If we found recipe-specific content, use that
      if (recipeContent.length > 500) {
        optimizedHtml = recipeContent;
      } else {
        // Fall back to body content
        optimizedHtml = $('body').html() || $('main').html() || optimizedHtml;
      }

      // Final whitespace cleanup
      optimizedHtml = optimizedHtml
        .replace(/\s+/g, ' ')
        .replace(/>\s+</g, '><')
        .trim();

    } catch (cheerioError) {
      console.warn('Cheerio processing failed, using regex-cleaned HTML:', cheerioError);
    }
  }

  // Hard limit to prevent context overflow
  const maxLength = 350000; // ~70K tokens safety margin
  if (optimizedHtml.length > maxLength) {
    // Smart truncation: try to keep recipe content
    const recipeKeywords = ['recipe', 'ingredient', 'instruction', 'direction', 'step'];
    let bestStart = 0;
    
    for (const keyword of recipeKeywords) {
      const index = optimizedHtml.toLowerCase().indexOf(keyword);
      if (index !== -1) {
        bestStart = Math.max(0, index - 2000); // Include context
        break;
      }
    }
    
    optimizedHtml = optimizedHtml.substring(bestStart, bestStart + maxLength);
  }

  return optimizedHtml || rawHtml;
} 