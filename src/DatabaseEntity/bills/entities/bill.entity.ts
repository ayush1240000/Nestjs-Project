import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, DeleteDateColumn } from 'typeorm';
import { Customer } from '../../customers/entities/customer.entity';
import { Employee } from '../../employee/entities/employee.entity';
import { DinnerTable } from '../../dinnertables/entities/dinnertable.entity';

export enum PaymentMethod {
  CASH = 'Cash',
  ONLINE_PAYMENT = 'OnlinePayment',
}

@Entity('bill')
export class Bill {
  @PrimaryGeneratedColumn('increment')
  billid: number;

  @ManyToOne(() => Customer, customer => customer.customerId, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'customerid' })
  customer: Customer;

  @ManyToOne(() => Employee, employee => employee.employeeId, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'employeeid' })
  employee: Employee;

  @ManyToOne(() => DinnerTable, dinnerTable => dinnerTable.tableno, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'tableno' })
  dinnerTable: DinnerTable;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
  })
  payment: PaymentMethod;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
  
  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date; // Soft delete column, auto-handled by TypeORM
}
