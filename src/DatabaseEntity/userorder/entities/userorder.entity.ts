
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import { Customer } from '../../customers/entities/customer.entity';
import { OrderMenu } from 'src/DatabaseEntity/ordermenu/entities/ordermenu.entity';

@Entity('userorder')
export class UserOrder {
  @PrimaryGeneratedColumn('increment')
  orderid: number;

  @ManyToOne(() => Customer, customer => customer.orders, {  eager : false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'customerId' })
  customer: Customer;
  
  @OneToMany(() => OrderMenu, orderMenu => orderMenu.order,{  eager : true, onDelete: 'CASCADE' })
  orderMenus: OrderMenu[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  @Column()
  customerId : number;

}
