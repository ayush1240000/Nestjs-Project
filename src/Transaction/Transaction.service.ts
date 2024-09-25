
import { Injectable } from '@nestjs/common';
import { EntityManager, Connection } from 'typeorm';

@Injectable()
export class TransactionService {
  constructor(private readonly connection: Connection) {}

  async executeTransaction(callback: (manager: EntityManager) => Promise<any>): Promise<any> {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Pass the EntityManager to the callback
      const result = await callback(queryRunner.manager);
      // Commit the transaction if everything is successful
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
 
      await queryRunner.rollbackTransaction();
      console.error('Transaction failed:', error.message);
      throw error;
    } finally {
      // Release the query runner
      await queryRunner.release();
    }
  }
}
