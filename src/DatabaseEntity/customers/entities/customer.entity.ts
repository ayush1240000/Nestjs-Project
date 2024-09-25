import { Entity, PrimaryGeneratedColumn, JoinColumn,OneToMany, ManyToOne, Column,UpdateDateColumn,CreateDateColumn,DeleteDateColumn, OneToOne } from 'typeorm';
import { user } from '../../users/entities/user.entity';
import { UserOrder } from 'src/DatabaseEntity/userorder/entities/userorder.entity';
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

  @OneToMany(() => UserOrder, userOrder => userOrder.customer)
  orders: UserOrder[];

  @OneToMany(() => Bill, bill => bill.customer)
  bills: Bill[]
}
