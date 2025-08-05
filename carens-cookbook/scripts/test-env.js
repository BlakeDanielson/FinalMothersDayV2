require('dotenv').config({ path: '../.env' });

console.log('🔍 Environment Variable Test');
console.log('='.repeat(50));

const requiredVars = ['OPENAI_API_KEY', 'GOOGLE_API_KEY'];

requiredVars.forEach(varName => {
    const value = process.env[varName];
    if (value) {
        console.log(`✅ ${varName}: Found (${value.substring(0, 8)}...)`);
    } else {
        console.log(`❌ ${varName}: Missing`);
    }
});

console.log('\n📁 Working Directory:', process.cwd());
console.log('📄 Looking for .env at:', require('path').resolve('../.env'));

// Test if .env file exists
const fs = require('fs');
const envPath = require('path').resolve('../.env');
if (fs.existsSync(envPath)) {
    console.log('✅ .env file exists');
    console.log('📝 .env file size:', fs.statSync(envPath).size, 'bytes');
} else {
    console.log('❌ .env file not found');
} 