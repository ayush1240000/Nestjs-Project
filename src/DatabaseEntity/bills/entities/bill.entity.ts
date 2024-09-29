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
 

  @Column()
  customerId :number;
  
  @Column()
  employeeId :number;

  @Column()
  tableNo :number;


  @ManyToOne(() => Customer, (customer) => customer.bills, { nullable: true, })
  @JoinColumn({ name: 'customerId' }) // Joins the `customerId` column
  customer: Customer;

  @ManyToOne(() => Employee, (employee) => employee.bills, { nullable: true,})
  @JoinColumn({ name: 'employeeId' }) // Joins the `employeeId` column
  employee: Employee;

  @ManyToOne(() => DinnerTable, (dinnerTable) => dinnerTable.bills, { nullable: true,  })
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
