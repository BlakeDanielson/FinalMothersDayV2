const { testAllPngPhotos } = require('./test-png-photos');
const { testAllJpegPhotos } = require('./test-jpeg-photos');
const fs = require('fs');
const path = require('path');

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

async function compareFormatPerformance() {
  try {
    log('🚀 Starting Format Performance Comparison...', 'bright');
    log('📋 This test compares AI processing times between PNG and JPEG formats', 'blue');
    log('🎯 Goal: Measure pure AI processing time without HEIC conversion overhead\n', 'blue');
    
    const overallStartTime = Date.now();
    
    // Run PNG tests
    log('🖼️  Phase 1: Testing PNG format...', 'magenta');
    await testAllPngPhotos();
    
    log('\n⏸️  Waiting 2 seconds between test phases...\n', 'yellow');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Run JPEG tests
    log('📷 Phase 2: Testing JPEG format...', 'magenta');
    await testAllJpegPhotos();
    
    // Load and compare results
    log('\n📊 Analyzing results...', 'blue');
    
    // Find the most recent result files
    const files = fs.readdirSync(__dirname);
    const pngResultFile = files
      .filter(f => f.startsWith('png-test-results-'))
      .sort()
      .pop();
    const jpegResultFile = files
      .filter(f => f.startsWith('jpeg-test-results-'))
      .sort()
      .pop();
    
    if (!pngResultFile || !jpegResultFile) {
      log('❌ Could not find result files for comparison!', 'red');
      return;
    }
    
    const pngResults = JSON.parse(fs.readFileSync(path.join(__dirname, pngResultFile), 'utf8'));
    const jpegResults = JSON.parse(fs.readFileSync(path.join(__dirname, jpegResultFile), 'utf8'));
    
    // Compare results
    const comparison = {
      timestamp: new Date().toISOString(),
      totalTestDuration: Date.now() - overallStartTime,
      png: pngResults.summary,
      jpeg: jpegResults.summary,
      comparison: {
        openaiTimeDiff: jpegResults.summary.openaiAvgTime - pngResults.summary.openaiAvgTime,
        geminiTimeDiff: jpegResults.summary.geminiAvgTime - pngResults.summary.geminiAvgTime,
        pngFaster: {
          openai: pngResults.summary.openaiAvgTime < jpegResults.summary.openaiAvgTime,
          gemini: pngResults.summary.geminiAvgTime < jpegResults.summary.geminiAvgTime
        }
      }
    };
    
    // Display comparison results
    log('\n🎯 FORMAT PERFORMANCE COMPARISON', 'bright');
    log('═══════════════════════════════════════', 'bright');
    
    log('\n📊 Processing Times (AI only, no HEIC conversion):', 'cyan');
    log(`🖼️  PNG Format:`, 'yellow');
    log(`   • OpenAI: ${pngResults.summary.openaiAvgTime}ms average`, 'green');
    log(`   • Gemini: ${pngResults.summary.geminiAvgTime}ms average`, 'green');
    
    log(`📷 JPEG Format:`, 'yellow');
    log(`   • OpenAI: ${jpegResults.summary.openaiAvgTime}ms average`, 'green');
    log(`   • Gemini: ${jpegResults.summary.geminiAvgTime}ms average`, 'green');
    
    log('\n⚡ Performance Differences:', 'magenta');
    
    // OpenAI comparison
    const openaiDiff = Math.abs(comparison.comparison.openaiTimeDiff);
    const openaiPct = ((openaiDiff / Math.max(pngResults.summary.openaiAvgTime, jpegResults.summary.openaiAvgTime)) * 100).toFixed(1);
    if (comparison.comparison.pngFaster.openai) {
      log(`🏆 OpenAI: PNG is ${openaiDiff}ms (${openaiPct}%) faster than JPEG`, 'green');
    } else if (openaiDiff > 0) {
      log(`🏆 OpenAI: JPEG is ${openaiDiff}ms (${openaiPct}%) faster than PNG`, 'green');
    } else {
      log(`🤝 OpenAI: PNG and JPEG have similar performance`, 'cyan');
    }
    
    // Gemini comparison
    const geminiDiff = Math.abs(comparison.comparison.geminiTimeDiff);
    const geminiPct = ((geminiDiff / Math.max(pngResults.summary.geminiAvgTime, jpegResults.summary.geminiAvgTime)) * 100).toFixed(1);
    if (comparison.comparison.pngFaster.gemini) {
      log(`🏆 Gemini: PNG is ${geminiDiff}ms (${geminiPct}%) faster than JPEG`, 'green');
    } else if (geminiDiff > 0) {
      log(`🏆 Gemini: JPEG is ${geminiDiff}ms (${geminiPct}%) faster than PNG`, 'green');
    } else {
      log(`🤝 Gemini: PNG and JPEG have similar performance`, 'cyan');
    }
    
    log('\n📈 Success Rates:', 'cyan');
    log(`🖼️  PNG: OpenAI ${pngResults.summary.openaiSuccessRate}%, Gemini ${pngResults.summary.geminiSuccessRate}%`, 'yellow');
    log(`📷 JPEG: OpenAI ${jpegResults.summary.openaiSuccessRate}%, Gemini ${jpegResults.summary.geminiSuccessRate}%`, 'yellow');
    
    log('\n💡 Key Insights:', 'blue');
    log('• These times represent pure AI processing without HEIC conversion overhead', 'cyan');
    log('• Format choice may have minimal impact on AI processing speed', 'cyan');
    log('• Success rates show model reliability across formats', 'cyan');
    
    // Save comparison results
    const comparisonPath = path.join(__dirname, `format-performance-comparison-${new Date().toISOString().replace(/[:.]/g, '-')}.json`);
    fs.writeFileSync(comparisonPath, JSON.stringify(comparison, null, 2));
    
    log(`\n📝 Comparison report saved: ${path.basename(comparisonPath)}`, 'cyan');
    log(`⏱️  Total comparison duration: ${Math.round(comparison.totalTestDuration / 1000)}s`, 'yellow');
    log('\n🎉 Format performance comparison completed!', 'green');
    
    return comparison;
    
  } catch (error) {
    log(`❌ Error during format performance comparison: ${error.message}`, 'red');
    throw error;
  }
}

// Run the comparison
if (require.main === module) {
  compareFormatPerformance().catch(console.error);
}

module.exports = { compareFormatPerformance }; 