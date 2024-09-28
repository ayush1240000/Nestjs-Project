// // import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, DeleteDateColumn } from 'typeorm';
// // import { Customer } from '../../customers/entities/customer.entity';
// // import { Employee } from '../../employee/entities/employee.entity';
// // import { DinnerTable } from '../../dinnertables/entities/dinnertable.entity';

// // export enum PaymentMethod {
// //   CASH = 'Cash',
// //   ONLINE_PAYMENT = 'OnlinePayment',
// // }
// // @Entity('bills')
// // export class Bill {
// //   @PrimaryGeneratedColumn()
// //   billid: number;

// //   @ManyToOne(() => Customer, (customer) => customer.bills)
// //   customer: Customer;

// //   @ManyToOne(() => Employee, { nullable: true })
// //   employee: Employee;

// //   @ManyToOne(() => DinnerTable, { nullable: true })
// //   dinnerTable: DinnerTable;

// //   @Column('decimal', { default: 0 })  // Default amount to 0, will be calculated later
// //   amount: number;

// //   @Column({ type: 'enum', enum: PaymentMethod })
// //   payment: PaymentMethod;



// // // @Entity('bill')
// // // export class Bill {
// // //   @PrimaryGeneratedColumn('increment')
// // //   billid: number;

// // //   @Column()
// // //   customerId :number;
  
// // //   @Column()
// // //   employeeId :number;
  
// // //   @Column()
// // //   tableno :number;
  

// // //   @ManyToOne(() => Customer, customer => customer.customerId )
// // //   @JoinColumn({ name: 'customerId' })
// // //   customer: Customer;

// // //   @ManyToOne(() => Employee, employee => employee.employeeId )
// // //   @JoinColumn({ name: 'employeeId' })
// // //   employee: Employee;

// // //   @ManyToOne(() => DinnerTable, dinnerTable => dinnerTable.tableno)
// // //   @JoinColumn({ name: 'tableno' })
// // //   dinnerTable: DinnerTable;

// // //   @Column('decimal', { precision: 10, scale: 2 })
// // //   amount: number;

// // //   @Column({
// // //     type: 'enum',
// // //     enum: PaymentMethod,
// // //   })
// // //   payment: PaymentMethod;

// //   @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
// //   createdAt: Date;

// //   @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
// //   updatedAt: Date;
  
// //   @DeleteDateColumn({ nullable: true })
// //   deletedAt?: Date; // Soft delete column, auto-handled by TypeORM
// // }



// // import {
// //   Entity,
// //   Column,
// //   PrimaryGeneratedColumn,
// //   ManyToOne,
// //   JoinColumn,
// //   CreateDateColumn,
// //   UpdateDateColumn,
// // } from 'typeorm';
// // import { Customer } from '../../customers/entities/customer.entity';  // Assuming you have a Customer entity
// // import { Employee } from '../../employee/entities/employee.entity';  // Assuming you have an Employee entity
// // import { DinnerTable } from '../../dinnertables/entities/dinnertable.entity';  // Assuming you have a DinnerTable entity

// // @Entity('bill')
// // export class Bill {
// //   @PrimaryGeneratedColumn()
// //   billid: number;

// //   @ManyToOne(() => Customer, { nullable: true, onDelete: 'SET NULL' })
// //   @JoinColumn({ name: 'customerId' })
// //   customer: Customer;

// //   @ManyToOne(() => Employee, { nullable: true, onDelete: 'SET NULL' })
// //   @JoinColumn({ name: 'employeeId' })
// //   employee: Employee;

// //   @ManyToOne(() => DinnerTable, { nullable: true, onDelete: 'SET NULL' })
// //   @JoinColumn({ name: 'tableno' })
// //   table: DinnerTable;

// //   @Column({ type: 'decimal', precision: 10, scale: 2 })
// //   amount: number;

// //   @Column({ type: 'enum', enum: ['Cash', 'OnlinePayment'], default: 'Cash' })
// //   payment: string;

// //   @CreateDateColumn({ type: 'timestamp' })
// //   createdAt: Date;

// //   @UpdateDateColumn({ type: 'timestamp' })
// //   updatedAt: Date;

// //   @Column({ type: 'timestamp', nullable: true })
// //   deletedAt: Date;
// // }


// // src/DatabaseEntity/bills/entities/bill.entity.ts
// import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
// import { Customer } from '../../customers/entities/customer.entity';
// import { DinnerTable } from '../../dinnerTables/entities/dinnertable.entity';
// import { Employee } from 'src/DatabaseEntity/employee/entities/employee.entity';

// @Entity('bill')
// export class Bill {
//   @PrimaryGeneratedColumn()
//   billid: number;

//   // @ManyToOne(() => Customer, customer => customer.bills)
//   // customer: Customer;

//   // @ManyToOne(() => Employee, employee => employee.bills, { nullable: true })
//   // employee: Employee;

//   // @ManyToOne(() => DinnerTable, table => table.bills, { nullable: true })
//   // table: DinnerTable;
//   @ManyToOne(() => Customer,customer => customer.bills)
//   @JoinColumn({ name: 'customerId' })
//   customer: Customer;

//   @ManyToOne(() => Employee ,employee => employee.bills, { nullable: true })
//   @JoinColumn({ name: 'employeeId' })
//   employee: Employee;

//   @ManyToOne(() => DinnerTable , table => table.bills, { nullable: true })
//   @JoinColumn({ name: 'tableno' })
//   table: DinnerTable;


//   @Column('decimal', { precision: 10, scale: 2 })
//   amount: number;

//   @Column({ type: 'enum', enum: ['cash', 'onlinepayment'] })
//   payment: string;

//   @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
//   createdAt: Date;

//   @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
//   updatedAt: Date;
// }

import { Customer } from 'src/DatabaseEntity/customers/entities/customer.entity';
import { DinnerTable } from 'src/DatabaseEntity/dinnertables/entities/dinnertable.entity';
import { Employee } from 'src/DatabaseEntity/employee/entities/employee.entity';
import { Order } from 'src/DatabaseEntity/order/entities/order.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';


@Entity('bill')
export class Bill {
  @PrimaryGeneratedColumn()
  billId: number;
 

  @ManyToOne(() => Customer, (customer) => customer.bills, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'customerId' }) // Joins the `customerId` column
  customer: Customer;

  @ManyToOne(() => Employee, (employee) => employee.bills, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'employeeId' }) // Joins the `employeeId` column
  employee: Employee;

  @ManyToOne(() => DinnerTable, (dinnerTable) => dinnerTable.bills, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'tableNo' }) // Joins the `tableNo` column
  tableno: DinnerTable;

  @OneToOne(() => Order, (order) => order.bill, { nullable: false }) 
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({
    type: 'enum',
    enum: ['Cash', 'OnlinePayment'],
  })
  payment: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
