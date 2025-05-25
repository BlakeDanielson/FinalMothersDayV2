#!/usr/bin/env node

/**
 * Simple Gemini API Test
 * Tests if the Gemini API key and model are working
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config({ path: '.env.local' });

async function testGemini() {
  try {
    console.log('Testing Gemini API...');
    
    if (!process.env.GOOGLE_API_KEY) {
      console.error('❌ GOOGLE_API_KEY not found in environment');
      return;
    }
    
    console.log('✅ GOOGLE_API_KEY found');
    
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-05-20" });
    
    console.log('📡 Sending test request to Gemini...');
    
    const result = await model.generateContent("Say hello in JSON format like: {\"message\": \"hello\"}");
    const response = await result.response;
    const content = response.text();
    
    console.log('✅ Gemini response received:', content);
    
    try {
      const parsed = JSON.parse(content);
      console.log('✅ JSON parsing successful:', parsed);
    } catch (e) {
      console.log('⚠️  Response is not valid JSON, but API is working');
    }
    
  } catch (error) {
    console.error('❌ Gemini test failed:', error.message);
    if (error.message.includes('API_KEY_INVALID')) {
      console.error('The Google API key appears to be invalid');
    }
  }
}

testGemini(); 