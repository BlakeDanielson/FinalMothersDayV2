import * as cheerio from 'cheerio';

export function getSanitizedHtml(rawHtml: string): string {
  const $ = cheerio.load(rawHtml);

  // Remove common unwanted elements
  $('script').remove();
  $('style').remove();
  $('nav').remove();
  $('footer').remove();
  $('header').remove(); // Be slightly cautious with generic header, might remove main recipe title if poorly structured site
  $('aside').remove();
  $('[role="banner"]').remove(); // Common role for site headers
  $('[role="contentinfo"]').remove(); // Common role for site footers
  $('[role="navigation"]').remove(); // Common role for navigation
  $('[role="complementary"]').remove(); // Common role for asides/sidebars

  // Remove comments
  $('*').contents().each(function(this: cheerio.Element) {
    if (this.type === 'comment') {
      $(this).remove();
    }
  });

  // Optional: Remove elements known to be ads or social media, if common patterns are identified
  // Example: $('.ad-container').remove();
  // Example: $('#social-share-buttons').remove();

  // Get the processed HTML
  let cleanedHtml = $('body').html() || $('html').html(); // Try to get body content, fallback to full html if body isn't found

  if (!cleanedHtml) {
    return rawHtml; // Fallback to raw HTML if cleaning results in empty content
  }
  
  // Optional: Further condense whitespace (can be aggressive)
  // cleanedHtml = cleanedHtml.replace(/\s{2,}/g, ' ');
  // cleanedHtml = cleanedHtml.replace(/\n\s*\n/g, '\n');

  return cleanedHtml;
} 