const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

async function initializeAICosts() {
  try {
    console.log('🤖 Initializing AI provider cost data...');

    // Current pricing as of June 2024 (per 1000 tokens)
    const providers = [
      {
        provider: 'openai',
        model: 'gpt-4o-mini',
        inputTokenCost: 0.000015,   // $0.15/1M tokens
        outputTokenCost: 0.0006,    // $0.60/1M tokens
      },
      {
        provider: 'openai', 
        model: 'gpt-4o',
        inputTokenCost: 0.005,      // $5.00/1M tokens
        outputTokenCost: 0.015,     // $15.00/1M tokens
      },
      {
        provider: 'google',
        model: 'gemini-1.5-pro',
        inputTokenCost: 0.00125,    // $1.25/1M tokens
        outputTokenCost: 0.005,     // $5.00/1M tokens
      },
      {
        provider: 'google',
        model: 'gemini-1.5-flash',
        inputTokenCost: 0.000075,   // $0.075/1M tokens
        outputTokenCost: 0.0003,    // $0.30/1M tokens
      }
    ];

    for (const cost of providers) {
      const existing = await prisma.aIProviderCosts.findFirst({
        where: {
          provider: cost.provider,
          model: cost.model
        }
      });

      if (!existing) {
        await prisma.aIProviderCosts.create({
          data: {
            ...cost,
            effectiveDate: new Date(),
          }
        });
        console.log(`✅ Added costs for ${cost.provider}/${cost.model}`);
      } else {
        console.log(`⏭️  Costs already exist for ${cost.provider}/${cost.model}`);
      }
    }

    console.log('🎉 AI cost initialization complete!');
  } catch (error) {
    console.error('❌ Error initializing AI costs:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run if called directly
if (require.main === module) {
  initializeAICosts();
}

module.exports = { initializeAICosts }; 