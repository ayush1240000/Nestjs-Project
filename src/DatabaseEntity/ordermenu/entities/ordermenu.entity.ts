import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, DeleteDateColumn } from 'typeorm';
import { UserOrder } from '../../userorder/entities/userorder.entity';
import { Menu } from '../../menus/entities/menu.entity';

@Entity('ordermenu')
export class OrderMenu {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => UserOrder, userOrder => userOrder.orderid, {  eager: false , onDelete: 'CASCADE' })
  @JoinColumn({ name: 'orderid' })
  order: UserOrder;

  @ManyToOne(() => Menu, menu => menu.menuid, {  eager: true,onDelete: 'CASCADE' })
  @JoinColumn({ name: 'menuid' })
  menu: Menu;

  @Column()
  orderid: number;

  @Column()
  quantity: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date; // Soft delete column, auto-handled by TypeORM

}
