const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const heicConvert = require('heic-convert');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Convert HEIC to JPEG buffer using heic-convert
async function convertHeicToBuffer(heicPath) {
  try {
    const heicBuffer = fs.readFileSync(heicPath);
    const jpegBuffer = await heicConvert({
      buffer: heicBuffer,
      format: 'JPEG',
      quality: 0.92
    });
    return jpegBuffer;
  } catch (error) {
    throw new Error(`HEIC conversion failed: ${error.message}`);
  }
}

async function convertPhotosForTesting() {
  try {
    log('🔄 Starting photo conversion for testing...', 'blue');
    
    // Source directory with existing photos
    const sourceDir = path.resolve(__dirname, '..', 'recipe_photos');
    
    // Create subdirectories for converted formats
    const pngDir = path.join(sourceDir, 'pngRecipes');
    const jpegDir = path.join(sourceDir, 'jpegRecipes');
    
    // Create directories if they don't exist
    [pngDir, jpegDir].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        log(`📁 Created directory: ${path.relative(process.cwd(), dir)}`, 'green');
      } else {
        // Clear existing files
        const existingFiles = fs.readdirSync(dir);
        existingFiles.forEach(file => {
          fs.unlinkSync(path.join(dir, file));
        });
        log(`🗑️  Cleared existing files from: ${path.relative(process.cwd(), dir)}`, 'yellow');
      }
    });
    
    // Get all image files from recipe_photos directory
    const files = fs.readdirSync(sourceDir)
      .filter(file => {
        const ext = file.toLowerCase();
        return ext.match(/\.(jpe?g|png|heic|heif|webp)$/) && 
               fs.statSync(path.join(sourceDir, file)).isFile();
      })
      .sort();
    
    if (files.length === 0) {
      log('❌ No image files found in recipe_photos directory!', 'red');
      return;
    }
    
    log(`📸 Found ${files.length} image files to convert`, 'cyan');
    
    let convertedCount = 0;
    const results = {
      png: [],
      jpeg: [],
      errors: []
    };
    
    for (const file of files) {
      const sourcePath = path.join(sourceDir, file);
      const baseName = path.parse(file).name;
      const isHeic = file.toLowerCase().match(/\.heic?$/);
      
      try {
        log(`🔄 Converting ${file}...`, 'yellow');
        
        let sourceBuffer;
        
        if (isHeic) {
          // Convert HEIC to JPEG buffer first
          log(`   🔄 Converting HEIC to JPEG buffer...`, 'cyan');
          sourceBuffer = await convertHeicToBuffer(sourcePath);
        } else {
          // Read regular image file
          sourceBuffer = fs.readFileSync(sourcePath);
        }
        
        // Convert to PNG (high quality, lossless)
        const pngPath = path.join(pngDir, `${baseName}.png`);
        await sharp(sourceBuffer)
          .png({ quality: 100, compressionLevel: 6 })
          .toFile(pngPath);
        
        // Convert to JPEG (optimized quality)
        const jpegPath = path.join(jpegDir, `${baseName}.jpeg`);
        await sharp(sourceBuffer)
          .jpeg({ quality: 90, progressive: true, mozjpeg: true })
          .toFile(jpegPath);
        
        const sourceStats = fs.statSync(sourcePath);
        const pngStats = fs.statSync(pngPath);
        const jpegStats = fs.statSync(jpegPath);
        
        results.png.push({
          filename: `${baseName}.png`,
          size: pngStats.size,
          path: pngPath,
          originalFile: file,
          originalSize: sourceStats.size
        });
        
        results.jpeg.push({
          filename: `${baseName}.jpeg`,
          size: jpegStats.size,
          path: jpegPath,
          originalFile: file,
          originalSize: sourceStats.size
        });
        
        log(`✅ Converted ${file}:`, 'green');
        log(`   📊 Original: ${(sourceStats.size / 1024).toFixed(1)}KB`, 'cyan');
        log(`   🖼️  PNG: ${(pngStats.size / 1024).toFixed(1)}KB`, 'cyan');
        log(`   📷 JPEG: ${(jpegStats.size / 1024).toFixed(1)}KB`, 'cyan');
        
        convertedCount++;
        
      } catch (error) {
        log(`❌ Error converting ${file}: ${error.message}`, 'red');
        results.errors.push({
          file,
          error: error.message
        });
      }
    }
    
    // Summary
    log('\n📋 Conversion Summary:', 'bright');
    log(`✅ Successfully converted: ${convertedCount}/${files.length} files`, 'green');
    if (results.errors.length > 0) {
      log(`❌ Failed conversions: ${results.errors.length}`, 'red');
    }
    log(`📁 PNG files saved to: ${path.relative(process.cwd(), pngDir)}`, 'cyan');
    log(`📁 JPEG files saved to: ${path.relative(process.cwd(), jpegDir)}`, 'cyan');
    
    // Calculate total sizes
    const totalPngSize = results.png.reduce((sum, file) => sum + file.size, 0);
    const totalJpegSize = results.jpeg.reduce((sum, file) => sum + file.size, 0);
    const totalOriginalSize = results.png.reduce((sum, file) => sum + file.originalSize, 0);
    
    log(`\n📊 Size Analysis:`, 'bright');
    log(`📱 Original size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)}MB`, 'magenta');
    log(`🖼️  Total PNG size: ${(totalPngSize / 1024 / 1024).toFixed(2)}MB`, 'yellow');
    log(`📷 Total JPEG size: ${(totalJpegSize / 1024 / 1024).toFixed(2)}MB`, 'yellow');
    log(`💾 PNG vs JPEG difference: ${((totalPngSize - totalJpegSize) / 1024 / 1024).toFixed(2)}MB`, 'cyan');
    
    // Save conversion report
    const reportPath = path.join(sourceDir, 'conversion-report.json');
    const report = {
      timestamp: new Date().toISOString(),
      sourceDirectory: sourceDir,
      summary: {
        totalConverted: convertedCount,
        totalFiles: files.length,
        pngCount: results.png.length,
        jpegCount: results.jpeg.length,
        errorCount: results.errors.length,
        totalOriginalSize,
        totalPngSize,
        totalJpegSize
      },
      files: {
        png: results.png,
        jpeg: results.jpeg
      },
      errors: results.errors
    };
    
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    log(`📝 Conversion report saved: ${path.relative(process.cwd(), reportPath)}`, 'cyan');
    
    log('\n🎉 Photo conversion completed! Ready for testing.', 'green');
    log('💡 Now you can run the photo tests on both PNG and JPEG formats to compare AI processing times.', 'blue');
    log('📂 Test directories created:', 'bright');
    log(`   • PNG: ${path.relative(process.cwd(), pngDir)} (${results.png.length} files)`, 'cyan');
    log(`   • JPEG: ${path.relative(process.cwd(), jpegDir)} (${results.jpeg.length} files)`, 'cyan');
    
    return {
      success: true,
      convertedCount,
      totalFiles: files.length,
      pngDir,
      jpegDir,
      results
    };
    
  } catch (error) {
    log(`❌ Error during photo conversion: ${error.message}`, 'red');
    throw error;
  }
}

// Run the conversion
if (require.main === module) {
  convertPhotosForTesting().catch(console.error);
}

module.exports = { convertPhotosForTesting }; 