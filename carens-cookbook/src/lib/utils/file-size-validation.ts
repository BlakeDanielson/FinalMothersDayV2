/**
 * File size validation utilities that account for automatic format conversion
 */

/**
 * Determines if a file is a PNG that would be converted to JPEG
 */
export function isPngThatWillBeConverted(file: File): boolean {
  const PNG_SIZE_THRESHOLD = 2 * 1024 * 1024; // 2MB
  
  const isPng = file.type === 'image/png' || file.name.toLowerCase().endsWith('.png');
  const isLarge = file.size > PNG_SIZE_THRESHOLD;
  
  return isPng && isLarge;
}

/**
 * Determines if a file is a HEIC that will be converted to JPEG
 */
export function isHeicThatWillBeConverted(file: File): boolean {
  return file.type === 'image/heic' || 
         file.type === 'image/heif' || 
         file.name.toLowerCase().endsWith('.heic') || 
         file.name.toLowerCase().endsWith('.heif');
}

/**
 * Gets the effective file size limit for a file, accounting for automatic conversion
 */
export function getEffectiveFileSizeLimit(file: File, baseLimit: number): number {
  // For large PNGs that will be converted, allow much larger files
  // since they'll be compressed by ~80%
  if (isPngThatWillBeConverted(file)) {
    // Allow up to 50MB for large PNGs since they'll become ~10MB after conversion
    return Math.max(baseLimit, 50 * 1024 * 1024); // 50MB
  }
  
  // For HEIC files that will be converted, also allow larger sizes
  if (isHeicThatWillBeConverted(file)) {
    // HEIC files are already compressed, but allow some extra headroom
    return Math.max(baseLimit, 25 * 1024 * 1024); // 25MB
  }
  
  // For other formats (JPEG, WebP, etc.), use the base limit
  return baseLimit;
}

/**
 * Validates file size with conversion awareness
 */
export function validateFileSize(file: File, baseLimit: number): {
  isValid: boolean;
  effectiveLimit: number;
  willBeConverted: boolean;
  conversionType?: string;
} {
  const effectiveLimit = getEffectiveFileSizeLimit(file, baseLimit);
  const isValid = file.size <= effectiveLimit;
  
  let willBeConverted = false;
  let conversionType: string | undefined;
  
  if (isPngThatWillBeConverted(file)) {
    willBeConverted = true;
    conversionType = 'PNG to JPEG';
  } else if (isHeicThatWillBeConverted(file)) {
    willBeConverted = true;
    conversionType = 'HEIC to JPEG';
  }
  
  return {
    isValid,
    effectiveLimit,
    willBeConverted,
    conversionType
  };
}

/**
 * Gets a user-friendly error message for file size validation failures
 */
export function getFileSizeErrorMessage(file: File, baseLimit: number): string {
  const validation = validateFileSize(file, baseLimit);
  const baseLimitMB = Math.round(baseLimit / (1024 * 1024));
  const effectiveLimitMB = Math.round(validation.effectiveLimit / (1024 * 1024));
  
  if (validation.willBeConverted) {
    return `The ${validation.conversionType?.split(' to ')[0]} file "${file.name}" is too large. Please use files smaller than ${effectiveLimitMB}MB (they will be automatically converted to JPEG).`;
  } else {
    return `The image "${file.name}" is too large. Please use files smaller than ${baseLimitMB}MB.`;
  }
} 