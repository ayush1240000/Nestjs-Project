import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne, OneToMany, DeleteDateColumn } from 'typeorm';
import { Customer } from '../../customers/entities/customer.entity';
import { Employee } from '../../employee/entities/employee.entity';
import { Bill } from 'src/DatabaseEntity/bills/entities/bill.entity';

export enum TableStatus {
  OCCUPIED = 'Occupied',
  VACANT = 'Vacant',
}

@Entity('dinnertable')
export class DinnerTable {
  @PrimaryGeneratedColumn('increment')
  tableno: number;

  @Column({
    type: 'enum',
    enum: TableStatus,
    default: TableStatus.VACANT,
  })
  status: TableStatus;

  @OneToOne(() => Customer, customer => customer.customerId, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @ManyToOne(() => Employee, employee => employee.dinnerTables, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'employeeId' })
  employee: Employee

  @OneToMany(() => Bill, bill => bill.dinnerTable)
  bills: Bill[]

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  
  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date; // Soft delete column, auto-handled by TypeORM
}
