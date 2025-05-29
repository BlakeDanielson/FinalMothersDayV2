// Category Error Handler and Recovery Service
// Provides comprehensive error handling, rollback mechanisms, and recovery for category operations

import { prisma } from '@/lib/db';
import { UserCategoryManager } from './user-category-manager';
import type { CategoryBackup } from './user-category-manager';

export interface CategoryOperation {
  id: string;
  userId: string;
  operation: 'initialize' | 'update' | 'add' | 'remove' | 'reorder';
  timestamp: Date;
  data: Record<string, unknown>;
  status: 'pending' | 'completed' | 'failed' | 'rolled_back';
  error?: string;
}

export interface RecoveryResult {
  success: boolean;
  message: string;
  recoveredOperations: number;
  failedOperations: number;
  details: string[];
}

export interface RollbackResult {
  success: boolean;
  message: string;
  rolledBackOperations: number;
  errors: string[];
}

export class CategoryErrorHandler {
  private static operations: Map<string, CategoryOperation> = new Map();
  private static backups: Map<string, CategoryBackup> = new Map();

  /**
   * Start tracking a category operation
   */
  static startOperation(
    userId: string,
    operation: CategoryOperation['operation'],
    data: Record<string, unknown>
  ): string {
    const operationId = `${userId}_${operation}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const categoryOperation: CategoryOperation = {
      id: operationId,
      userId,
      operation,
      timestamp: new Date(),
      data,
      status: 'pending'
    };

    this.operations.set(operationId, categoryOperation);
    
    // Log operation start
    console.log(`🔄 Started category operation: ${operationId} (${operation}) for user: ${userId}`);
    
    return operationId;
  }

  /**
   * Create backup before operation
   */
  static async createBackup(userId: string, operationId: string): Promise<void> {
    try {
      const backup = await UserCategoryManager.createBackup(userId);
      this.backups.set(operationId, backup);
      
      console.log(`💾 Created backup for operation: ${operationId}`);
    } catch (error) {
      console.error(`❌ Failed to create backup for operation ${operationId}:`, error);
      throw new Error(`Backup creation failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Mark operation as completed
   */
  static completeOperation(operationId: string): void {
    const operation = this.operations.get(operationId);
    if (operation) {
      operation.status = 'completed';
      this.operations.set(operationId, operation);
      
      console.log(`✅ Completed category operation: ${operationId}`);
      
      // Clean up backup after successful completion (optional)
      // this.backups.delete(operationId);
    }
  }

  /**
   * Mark operation as failed and handle error
   */
  static async failOperation(
    operationId: string, 
    error: Error | string,
    attemptRollback: boolean = true
  ): Promise<void> {
    const operation = this.operations.get(operationId);
    if (operation) {
      operation.status = 'failed';
      operation.error = error instanceof Error ? error.message : String(error);
      this.operations.set(operationId, operation);
      
      console.error(`❌ Failed category operation: ${operationId} - ${operation.error}`);
      
      if (attemptRollback) {
        await this.rollbackOperation(operationId);
      }
    }
  }

  /**
   * Rollback a failed operation
   */
  static async rollbackOperation(operationId: string): Promise<boolean> {
    try {
      const operation = this.operations.get(operationId);
      const backup = this.backups.get(operationId);
      
      if (!operation) {
        console.error(`❌ Operation ${operationId} not found for rollback`);
        return false;
      }

      if (!backup) {
        console.error(`❌ No backup found for operation ${operationId}`);
        return false;
      }

      console.log(`🔄 Rolling back operation: ${operationId}`);
      
      // Restore from backup
      const result = await UserCategoryManager.restoreFromBackup(operation.userId, backup);
      
      if (result.success) {
        operation.status = 'rolled_back';
        this.operations.set(operationId, operation);
        
        console.log(`✅ Successfully rolled back operation: ${operationId}`);
        return true;
      } else {
        console.error(`❌ Failed to rollback operation ${operationId}: ${result.error}`);
        return false;
      }

    } catch (error) {
      console.error(`❌ Error during rollback of operation ${operationId}:`, error);
      return false;
    }
  }

  /**
   * Rollback multiple operations for a user
   */
  static async rollbackUserOperations(userId: string): Promise<RollbackResult> {
    const userOperations = Array.from(this.operations.values())
      .filter(op => op.userId === userId && op.status === 'failed');

    let rolledBackOperations = 0;
    const errors: string[] = [];

    for (const operation of userOperations) {
      try {
        const success = await this.rollbackOperation(operation.id);
        if (success) {
          rolledBackOperations++;
        } else {
          errors.push(`Failed to rollback operation ${operation.id}`);
        }
      } catch (error) {
        errors.push(`Error rolling back operation ${operation.id}: ${error instanceof Error ? error.message : String(error)}`);
      }
    }

    return {
      success: errors.length === 0,
      message: `Rolled back ${rolledBackOperations} of ${userOperations.length} failed operations`,
      rolledBackOperations,
      errors
    };
  }

  /**
   * Repair incomplete category setups for all users
   */
  static async repairAllIncompleteSetups(): Promise<RecoveryResult> {
    console.log('🔧 Starting repair of incomplete category setups...');
    
    let recoveredOperations = 0;
    let failedOperations = 0;
    const details: string[] = [];

    try {
      // Find users without categories
      const usersWithoutCategories = await prisma.user.findMany({
        where: {
          OR: [
            { preferredCategories: { equals: [] } },
            { preferredCategories: { equals: null } }
          ]
        },
        select: { id: true, email: true }
      });

      console.log(`Found ${usersWithoutCategories.length} users without categories`);

      for (const user of usersWithoutCategories) {
        try {
          const result = await UserCategoryManager.repairCategorySetup(user.id);
          
          if (result.success) {
            recoveredOperations++;
            details.push(`✅ Repaired categories for user: ${user.email || user.id}`);
          } else {
            failedOperations++;
            details.push(`❌ Failed to repair categories for user: ${user.email || user.id} - ${result.error}`);
          }
        } catch (error) {
          failedOperations++;
          details.push(`❌ Error repairing user ${user.id}: ${error instanceof Error ? error.message : String(error)}`);
        }
      }

      return {
        success: failedOperations === 0,
        message: `Repaired ${recoveredOperations} users, ${failedOperations} failures`,
        recoveredOperations,
        failedOperations,
        details
      };

    } catch (error) {
      console.error('❌ Error during repair process:', error);
      return {
        success: false,
        message: `Repair process failed: ${error instanceof Error ? error.message : String(error)}`,
        recoveredOperations,
        failedOperations,
        details
      };
    }
  }

  /**
   * Handle concurrent initialization attempts
   */
  static async handleConcurrentInitialization<T>(
    userId: string,
    operation: () => Promise<T>
  ): Promise<T> {
    const existingOperation = Array.from(this.operations.values())
      .find(op => op.userId === userId && op.status === 'pending');

    if (existingOperation) {
      throw new Error(`Category initialization already in progress for user ${userId}. Operation ID: ${existingOperation.id}`);
    }

    // Create a simple lock mechanism
    const operationId = this.startOperation(userId, 'initialize', { concurrent: true });
    
    try {
      await this.createBackup(userId, operationId);
      const result = await operation();
      this.completeOperation(operationId);
      return result;
    } catch (error) {
      await this.failOperation(operationId, error instanceof Error ? error : new Error(String(error)));
      throw error;
    }
  }

  /**
   * Get operation history for a user
   */
  static getUserOperationHistory(userId: string): CategoryOperation[] {
    return Array.from(this.operations.values())
      .filter(op => op.userId === userId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  /**
   * Get failed operations that need attention
   */
  static getFailedOperations(): CategoryOperation[] {
    return Array.from(this.operations.values())
      .filter(op => op.status === 'failed')
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  /**
   * Clean up old operations and backups
   */
  static cleanupOldOperations(maxAgeHours: number = 24): void {
    const cutoffTime = new Date(Date.now() - maxAgeHours * 60 * 60 * 1000);
    
    let cleanedOperations = 0;
    let cleanedBackups = 0;

    // Clean up operations
    for (const [id, operation] of this.operations.entries()) {
      if (operation.timestamp < cutoffTime && operation.status !== 'pending') {
        this.operations.delete(id);
        cleanedOperations++;
      }
    }

    // Clean up backups for cleaned operations
    for (const [id] of this.backups.entries()) {
      if (!this.operations.has(id)) {
        this.backups.delete(id);
        cleanedBackups++;
      }
    }

    console.log(`🧹 Cleaned up ${cleanedOperations} operations and ${cleanedBackups} backups older than ${maxAgeHours} hours`);
  }

  /**
   * Get system health status
   */
  static getSystemHealth(): {
    totalOperations: number;
    pendingOperations: number;
    failedOperations: number;
    completedOperations: number;
    totalBackups: number;
    oldestPendingOperation?: Date;
  } {
    const operations = Array.from(this.operations.values());
    const pendingOps = operations.filter(op => op.status === 'pending');
    
    return {
      totalOperations: operations.length,
      pendingOperations: pendingOps.length,
      failedOperations: operations.filter(op => op.status === 'failed').length,
      completedOperations: operations.filter(op => op.status === 'completed').length,
      totalBackups: this.backups.size,
      oldestPendingOperation: pendingOps.length > 0 
        ? new Date(Math.min(...pendingOps.map(op => op.timestamp.getTime())))
        : undefined
    };
  }
} 