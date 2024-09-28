import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Customer } from '../../customers/entities/customer.entity'; // Adjust the path to your Customer entity
import { IsNotEmpty, IsNumber } from 'class-validator';

@Entity('order') // The table name in the database
export class CreateOrderDto {
  @PrimaryGeneratedColumn()
  orderId: number;

  @IsNotEmpty()
  @IsNumber()
  customerId: number; 

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;
}
