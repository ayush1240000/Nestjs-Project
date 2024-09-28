import { orderitem } from 'src/DatabaseEntity/orderitem/entities/orderitem.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

export enum MenuCategory {
  VEG = 'Veg',
  NON_VEG = 'Non-Veg',
}

@Entity('menu')
export class Menu {
  @PrimaryGeneratedColumn('increment')
  itemId: number;

  @Column()
  itemname: string;

  @Column({
    type: 'enum',
    enum: MenuCategory,
  })
  itemcategory: MenuCategory;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @OneToMany(() => orderitem, orderitem => orderitem.menu)
  orderMenus: orderitem[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date;
}
