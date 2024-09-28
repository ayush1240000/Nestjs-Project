import { Entity, PrimaryGeneratedColumn, JoinColumn,OneToMany, ManyToOne, Column,UpdateDateColumn,CreateDateColumn,DeleteDateColumn, OneToOne } from 'typeorm';
import { user } from '../../users/entities/user.entity';
import { Order } from 'src/DatabaseEntity/order/entities/order.entity';
import { DinnerTable } from 'src/DatabaseEntity/dinnertables/entities/dinnertable.entity';
import { Bill } from 'src/DatabaseEntity/bills/entities/bill.entity';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn({})
  customerId: number;

  @OneToOne(() => user, (user) => user.customers, { nullable: false }) 
  @JoinColumn({ name: 'userId' })
  user: user;

  @OneToOne(() => DinnerTable, dinnerTable => dinnerTable.customer)
  dinnerTable: DinnerTable;
  
  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date; // Soft delete column, auto-handled by TypeORM

  @CreateDateColumn()
  createdAt: Date; // Auto-generated creation timestamp

  @UpdateDateColumn()
  updatedAt: Date; // Auto-generated update timestamp

  @Column() 
  userId: number;

  @OneToMany(() => Order, Order => Order.customer)
  orders: Order[];

  @OneToMany(() => Bill, bill => bill.customer)
  bills: Bill[]
}
