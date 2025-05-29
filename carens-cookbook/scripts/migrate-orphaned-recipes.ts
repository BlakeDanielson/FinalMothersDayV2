#!/usr/bin/env tsx

import { PrismaClient } from '../src/generated/prisma';
import { CategoryService } from '../src/lib/categories';
import { CategoryValidator } from '../src/lib/validation/CategoryValidator';
import { z } from 'zod';

// Configuration schema
const MigrationConfigSchema = z.object({
  dryRun: z.boolean().default(true),
  batchSize: z.number().min(1).max(1000).default(100),
  userId: z.string().optional(),
  targetCategory: z.string().optional(),
  autoAssign: z.boolean().default(true),
  createBackup: z.boolean().default(true),
  logLevel: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  rollbackOnError: z.boolean().default(true)
});

type MigrationConfig = z.infer<typeof MigrationConfigSchema>;

interface OrphanedRecipe {
  id: string;
  title: string;
  category: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface MigrationResult {
  totalProcessed: number;
  successful: number;
  failed: number;
  skipped: number;
  errors: Array<{
    recipeId: string;
    error: string;
    timestamp: Date;
  }>;
  categoryAssignments: Map<string, string>;
  rollbackData?: Array<{
    recipeId: string;
    originalCategory: string | null;
    newCategory: string;
  }>;
}

class OrphanedRecipeMigrator {
  private prisma: PrismaClient;
  private categoryService: CategoryService;
  private categoryValidator: CategoryValidator;
  private config: MigrationConfig;

  constructor(config: Partial<MigrationConfig> = {}) {
    this.config = MigrationConfigSchema.parse(config);
    this.prisma = new PrismaClient();
    this.categoryService = new CategoryService(this.prisma);
    this.categoryValidator = new CategoryValidator(this.prisma);
  }

  private log(level: string, message: string, data?: any) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${level.toUpperCase()}] ${message}`, data ? JSON.stringify(data, null, 2) : '');
  }

  /**
   * Main migration method
   */
  async migrate(): Promise<MigrationResult> {
    const result: MigrationResult = {
      totalProcessed: 0,
      successful: 0,
      failed: 0,
      skipped: 0,
      errors: [],
      categoryAssignments: new Map(),
      rollbackData: []
    };

    try {
      this.log('info', 'Starting orphaned recipe migration', {
        config: this.config,
        timestamp: new Date().toISOString()
      });

      // Create backup if requested
      if (this.config.createBackup) {
        await this.createBackup();
      }

      // Find orphaned recipes
      const orphanedRecipes = await this.findOrphanedRecipes();
      this.log('info', `Found ${orphanedRecipes.length} orphaned recipes`);

      if (orphanedRecipes.length === 0) {
        this.log('info', 'No orphaned recipes found. Migration complete.');
        return result;
      }

      // Process in batches
      const batches = this.createBatches(orphanedRecipes, this.config.batchSize);
      
      for (let i = 0; i < batches.length; i++) {
        const batch = batches[i];
        this.log('info', `Processing batch ${i + 1}/${batches.length} (${batch.length} recipes)`);

        try {
          const batchResult = await this.processBatch(batch);
          this.mergeBatchResult(result, batchResult);
        } catch (error) {
          this.log('error', `Batch ${i + 1} failed:`, error);
          
          if (this.config.rollbackOnError) {
            this.log('info', 'Rolling back due to batch failure...');
            await this.rollback(result.rollbackData || []);
            throw error;
          }
        }
      }

      this.log('info', 'Migration completed successfully', {
        totalProcessed: result.totalProcessed,
        successful: result.successful,
        failed: result.failed,
        skipped: result.skipped
      });

      return result;

    } catch (error) {
      this.log('error', 'Migration failed:', error);
      throw error;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  /**
   * Find all orphaned recipes (recipes with null/empty categories or invalid categories)
   */
  private async findOrphanedRecipes(): Promise<OrphanedRecipe[]> {
    const whereClause = this.config.userId 
      ? { userId: this.config.userId }
      : {};

    const recipes = await this.prisma.recipe.findMany({
      where: {
        ...whereClause,
        OR: [
          { category: { isSet: false } },
          { category: '' },
          { category: 'undefined' },
          { category: 'null' }
        ]
      },
      select: {
        id: true,
        title: true,
        category: true,
        userId: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: { createdAt: 'asc' }
    });

    return recipes;
  }

  /**
   * Process a batch of orphaned recipes
   */
  private async processBatch(recipes: OrphanedRecipe[]): Promise<MigrationResult> {
    const result: MigrationResult = {
      totalProcessed: 0,
      successful: 0,
      failed: 0,
      skipped: 0,
      errors: [],
      categoryAssignments: new Map(),
      rollbackData: []
    };

    if (this.config.dryRun) {
      this.logger.info('DRY RUN MODE - No actual changes will be made');
    }

    for (const recipe of recipes) {
      result.totalProcessed++;

      try {
        const newCategory = await this.determineCategory(recipe);
        
        if (!newCategory) {
          result.skipped++;
          this.logger.warn(`Skipping recipe ${recipe.id}: No suitable category found`);
          continue;
        }

        // Validate the new category
        const validation = await this.categoryValidator.validateCategoryName(newCategory, {
          userId: recipe.userId,
          operation: 'create',
          skipDuplicateCheck: true
        });

        if (!validation.isValid) {
          result.failed++;
          const error = `Category validation failed: ${validation.errors.join(', ')}`;
          result.errors.push({
            recipeId: recipe.id,
            error,
            timestamp: new Date()
          });
          this.logger.error(`Recipe ${recipe.id} failed validation:`, error);
          continue;
        }

        // Store rollback data
        result.rollbackData?.push({
          recipeId: recipe.id,
          originalCategory: recipe.category,
          newCategory
        });

        // Update the recipe (unless dry run)
        if (!this.config.dryRun) {
          await this.prisma.recipe.update({
            where: { id: recipe.id },
            data: { category: newCategory }
          });
        }

        result.successful++;
        result.categoryAssignments.set(recipe.id, newCategory);
        
        this.logger.debug(`Recipe ${recipe.id} assigned to category: ${newCategory}`);

      } catch (error) {
        result.failed++;
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        result.errors.push({
          recipeId: recipe.id,
          error: errorMessage,
          timestamp: new Date()
        });
        this.logger.error(`Failed to process recipe ${recipe.id}:`, error);
      }
    }

    return result;
  }

  /**
   * Determine the best category for an orphaned recipe
   */
  private async determineCategory(recipe: OrphanedRecipe): Promise<string | null> {
    // If a target category is specified, use it
    if (this.config.targetCategory) {
      return this.config.targetCategory;
    }

    // If auto-assignment is disabled, return null
    if (!this.config.autoAssign) {
      return null;
    }

    try {
      // Use CategoryService to find the best category based on recipe title
      const analysis = await this.categoryService.findBestCategory(
        recipe.title,
        recipe.userId,
        {
          allowNewCategories: false,
          preferUserCategories: true,
          strictMatching: false
        }
      );

      if (analysis.bestMatch && analysis.bestMatch.confidence > 0.5) {
        return analysis.bestMatch.category;
      }

      // Fallback to a default category
      return this.categoryService.getFallbackCategory();

    } catch (error) {
      this.logger.error(`Error determining category for recipe ${recipe.id}:`, error);
      return 'Uncategorized';
    }
  }

  /**
   * Create backup of current recipe data
   */
  private async createBackup(): Promise<void> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFile = `backup-recipes-${timestamp}.json`;

    try {
      const recipes = await this.prisma.recipe.findMany({
        select: {
          id: true,
          title: true,
          category: true,
          userId: true,
          createdAt: true,
          updatedAt: true
        }
      });

      const fs = await import('fs/promises');
      await fs.writeFile(
        `./scripts/backups/${backupFile}`,
        JSON.stringify(recipes, null, 2)
      );

      this.logger.info(`Backup created: ${backupFile}`);
    } catch (error) {
      this.logger.error('Failed to create backup:', error);
      throw new Error('Backup creation failed');
    }
  }

  /**
   * Rollback changes
   */
  private async rollback(rollbackData: Array<{
    recipeId: string;
    originalCategory: string | null;
    newCategory: string;
  }>): Promise<void> {
    this.logger.info(`Rolling back ${rollbackData.length} changes...`);

    for (const item of rollbackData) {
      try {
        await this.prisma.recipe.update({
          where: { id: item.recipeId },
          data: { category: item.originalCategory }
        });
      } catch (error) {
        this.logger.error(`Failed to rollback recipe ${item.recipeId}:`, error);
      }
    }

    this.logger.info('Rollback completed');
  }

  /**
   * Create batches from array
   */
  private createBatches<T>(items: T[], batchSize: number): T[][] {
    const batches: T[][] = [];
    for (let i = 0; i < items.length; i += batchSize) {
      batches.push(items.slice(i, i + batchSize));
    }
    return batches;
  }

  /**
   * Merge batch result into main result
   */
  private mergeBatchResult(main: MigrationResult, batch: MigrationResult): void {
    main.totalProcessed += batch.totalProcessed;
    main.successful += batch.successful;
    main.failed += batch.failed;
    main.skipped += batch.skipped;
    main.errors.push(...batch.errors);
    
    for (const [key, value] of batch.categoryAssignments) {
      main.categoryAssignments.set(key, value);
    }
    
    if (batch.rollbackData) {
      main.rollbackData?.push(...batch.rollbackData);
    }
  }

  /**
   * Generate migration report
   */
  async generateReport(result: MigrationResult): Promise<string> {
    const timestamp = new Date().toISOString();
    const report = {
      timestamp,
      config: this.config,
      summary: {
        totalProcessed: result.totalProcessed,
        successful: result.successful,
        failed: result.failed,
        skipped: result.skipped,
        successRate: result.totalProcessed > 0 
          ? (result.successful / result.totalProcessed * 100).toFixed(2) + '%'
          : '0%'
      },
      categoryAssignments: Object.fromEntries(result.categoryAssignments),
      errors: result.errors,
      rollbackData: result.rollbackData
    };

    const reportJson = JSON.stringify(report, null, 2);
    
    // Save report to file
    const fs = await import('fs/promises');
    const reportFile = `migration-report-${timestamp.replace(/[:.]/g, '-')}.json`;
    await fs.writeFile(`./scripts/reports/${reportFile}`, reportJson);
    
    this.logger.info(`Migration report saved: ${reportFile}`);
    return reportJson;
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  const config: Partial<MigrationConfig> = {};

  // Parse command line arguments
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i]?.replace('--', '');
    const value = args[i + 1];

    switch (key) {
      case 'dry-run':
        config.dryRun = value === 'true';
        break;
      case 'batch-size':
        config.batchSize = parseInt(value);
        break;
      case 'user-id':
        config.userId = value;
        break;
      case 'target-category':
        config.targetCategory = value;
        break;
      case 'auto-assign':
        config.autoAssign = value === 'true';
        break;
      case 'log-level':
        config.logLevel = value as any;
        break;
      case 'rollback-on-error':
        config.rollbackOnError = value === 'true';
        break;
    }
  }

  try {
    const migrator = new OrphanedRecipeMigrator(config);
    const result = await migrator.migrate();
    const report = await migrator.generateReport(result);
    
    console.log('\n=== Migration Complete ===');
    console.log(`Total Processed: ${result.totalProcessed}`);
    console.log(`Successful: ${result.successful}`);
    console.log(`Failed: ${result.failed}`);
    console.log(`Skipped: ${result.skipped}`);
    
    if (result.errors.length > 0) {
      console.log('\nErrors:');
      result.errors.forEach(error => {
        console.log(`- Recipe ${error.recipeId}: ${error.error}`);
      });
    }

  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

export { OrphanedRecipeMigrator, MigrationConfig, MigrationResult }; 