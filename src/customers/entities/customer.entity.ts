import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, Column,UpdateDateColumn,CreateDateColumn,DeleteDateColumn } from 'typeorm';
import { user } from '../../users/entities/user.entity';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  customerId: string;

  @ManyToOne(() => user, (user) => user.customers, { nullable: false }) 
  @JoinColumn({ name: 'userId' })
  user: user;

  
  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date; // Soft delete column, auto-handled by TypeORM

  @CreateDateColumn()
  createdAt: Date; // Auto-generated creation timestamp

  @UpdateDateColumn()
  updatedAt: Date; // Auto-generated update timestamp

  @Column() 
  userId: string;
}
