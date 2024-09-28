
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, DeleteDateColumn, OneToMany, OneToOne } from 'typeorm';
import { Customer } from '../../customers/entities/customer.entity';
import { orderitem } from 'src/DatabaseEntity/orderitem/entities/orderitem.entity';
import { Bill } from 'src/DatabaseEntity/bills/entities/bill.entity';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn('increment')
  orderId: number;

  @ManyToOne(() => Customer, customer => customer.orders, {  eager : false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'customerId' })
  customer: Customer;
  
  @OneToOne(() => Bill, (bill) => bill.order)
  bill: Bill[];

  @OneToMany(() => orderitem, orderitem => orderitem.order,{   onDelete: 'CASCADE' })
  orderitem: orderitem[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  @Column()
  customerId : number;

}
