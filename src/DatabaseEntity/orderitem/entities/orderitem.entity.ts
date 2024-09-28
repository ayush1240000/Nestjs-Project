import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, DeleteDateColumn } from 'typeorm';
import { Order } from '../../order/entities/order.entity';
import { Menu } from '../../menus/entities/menu.entity';

@Entity('orderitem')
export class orderitem {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Order, Order => Order.orderId, {  eager: false , onDelete: 'CASCADE' })
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @ManyToOne(() => Menu, menu => menu.itemId, {  onDelete: 'CASCADE' })
  @JoinColumn({ name: 'itemId' })
  menu: Menu;

  @Column()
  orderId: number;
  T
  @Column()
  itemId: number;

  @Column()
  quantity: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date; // Soft delete column, auto-handled by TypeORM

}
