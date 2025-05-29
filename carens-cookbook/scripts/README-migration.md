# Migration and Data Recovery Tools

This directory contains tools for migrating orphaned recipes and providing data recovery capabilities for Caren's Cookbook.

## Overview

The migration system helps identify and fix recipes that have missing, invalid, or inappropriate category assignments. This is essential for maintaining data quality and ensuring users can find their recipes easily.

## Tools Available

### 1. Simple Migration Script (`migrate-orphaned-recipes-simple.ts`)

A straightforward migration tool for basic orphaned recipe recovery.

**Usage:**
```bash
# Dry run (preview changes)
npx tsx scripts/migrate-orphaned-recipes-simple.ts

# Execute migration
npx tsx scripts/migrate-orphaned-recipes-simple.ts --live

# Migrate specific user's recipes
npx tsx scripts/migrate-orphaned-recipes-simple.ts --user-id="user_123" --live

# Assign to specific category
npx tsx scripts/migrate-orphaned-recipes-simple.ts --category="Main Dishes" --live
```

**Features:**
- Identifies orphaned recipes (empty, 'undefined', 'null', 'Uncategorized' categories)
- Uses AI to suggest better categories based on recipe titles
- Dry run mode for safe testing
- Simple console output with progress tracking

### 2. Backup Utility (`backup-recipes.ts`)

Creates comprehensive backups before performing migrations.

**Usage:**
```bash
# Basic backup
npx tsx scripts/backup-recipes.ts

# Include user information
npx tsx scripts/backup-recipes.ts --include-users

# Backup specific user
npx tsx scripts/backup-recipes.ts --user-id="user_123"

# Custom output directory
npx tsx scripts/backup-recipes.ts --output="./my-backups"
```

**Features:**
- Creates timestamped backups of recipe data
- Generates backup summaries with statistics
- Supports user-specific backups
- Tracks orphaned vs categorized recipes

### 3. Admin Web Interface

Access via `/admin/data-recovery` (requires authentication).

**Features:**
- Visual interface for viewing orphaned recipes
- Bulk selection and migration tools
- AI-powered auto-assignment
- Real-time progress tracking
- Search and filtering capabilities

## API Endpoints

### GET `/api/admin/orphaned-recipes`
Fetches all orphaned recipes with user information.

### POST `/api/admin/migrate-recipes`
Performs bulk migration of selected recipes to a target category.

**Request Body:**
```json
{
  "recipeIds": ["recipe1", "recipe2"],
  "targetCategory": "Main Dishes",
  "dryRun": true
}
```

### POST `/api/admin/auto-assign-categories`
Uses AI to automatically assign categories to orphaned recipes.

**Request Body:**
```json
{
  "recipeIds": ["recipe1", "recipe2"], // optional, if not provided processes all orphaned
  "dryRun": true
}
```

## Migration Process

### 1. Pre-Migration
1. **Create Backup**: Always run backup script before migration
2. **Analyze Data**: Review orphaned recipe count and patterns
3. **Test Migration**: Use dry-run mode to preview changes

### 2. Migration Execution
1. **Small Batches**: Process recipes in small batches for safety
2. **Monitor Progress**: Watch for errors and unexpected results
3. **Verify Results**: Check that categories make sense contextually

### 3. Post-Migration
1. **Validate Data**: Ensure no recipes were lost or corrupted
2. **User Testing**: Verify that users can find their recipes
3. **Monitor Performance**: Check that search and filtering work correctly

## Orphaned Recipe Detection

Recipes are considered "orphaned" if their category field is:
- Empty string (`""`)
- `"undefined"`
- `"null"`
- `"Uncategorized"`
- Actually null (though this shouldn't happen with current schema)

## AI Category Assignment

The system uses the CategoryService to analyze recipe titles and suggest appropriate categories:

1. **Confidence Scoring**: AI suggestions include confidence scores (0-1)
2. **Threshold Filtering**: Only suggestions above 60% confidence are used
3. **Fallback Strategy**: If no good match found, assigns to "Uncategorized"
4. **User Preferences**: Prefers categories the user has already created

## Safety Features

### Dry Run Mode
All migration tools support dry-run mode that:
- Shows what changes would be made
- Doesn't modify any data
- Provides detailed preview of results

### Backup Integration
- Automatic backup creation before major migrations
- Timestamped backup files for easy identification
- Backup verification and integrity checks

### Error Handling
- Graceful error handling with detailed logging
- Transaction rollback on critical failures
- Individual recipe error tracking

## Monitoring and Logging

### Console Output
All tools provide detailed console output including:
- Progress indicators
- Success/failure counts
- Error details
- Performance metrics

### Backup Reports
Backup utility generates summary reports with:
- Total recipe counts
- Orphaned recipe statistics
- Backup file locations
- Timestamp information

## Best Practices

### Before Migration
1. **Always create a backup** using the backup utility
2. **Test with dry-run** to preview changes
3. **Start with small batches** for large datasets
4. **Review AI suggestions** for accuracy

### During Migration
1. **Monitor console output** for errors
2. **Stop if unexpected results** occur
3. **Verify sample results** manually
4. **Keep backup files safe**

### After Migration
1. **Test user workflows** to ensure recipes are findable
2. **Monitor for user complaints** about missing recipes
3. **Validate category assignments** make sense
4. **Update documentation** if needed

## Troubleshooting

### Common Issues

**"No orphaned recipes found"**
- Check if recipes actually have invalid categories
- Verify database connection
- Ensure proper user permissions

**"Migration failed"**
- Check database connectivity
- Verify CategoryService is working
- Review error logs for specific issues

**"AI assignment not working"**
- Ensure AI service is configured
- Check API keys and rate limits
- Verify CategoryService integration

### Recovery Procedures

**If migration goes wrong:**
1. Stop the migration process immediately
2. Restore from the most recent backup
3. Investigate the root cause
4. Fix the issue and retry with dry-run

**If backup is corrupted:**
1. Check for multiple backup files
2. Use database-level backups if available
3. Contact system administrator
4. Consider manual data recovery

## File Structure

```
scripts/
├── migrate-orphaned-recipes-simple.ts    # Simple migration tool
├── migrate-orphaned-recipes.ts           # Advanced migration tool (has linter issues)
├── backup-recipes.ts                     # Backup utility
├── backups/                              # Backup storage directory
│   ├── recipes-backup-YYYY-MM-DD.json
│   └── backup-summary-YYYY-MM-DD.json
└── README-migration.md                   # This file
```

## Support

For issues with migration tools:
1. Check this documentation first
2. Review console error messages
3. Verify backup files exist
4. Test with dry-run mode
5. Contact development team if needed

---

**⚠️ Important**: Always create backups before running migrations in production! 