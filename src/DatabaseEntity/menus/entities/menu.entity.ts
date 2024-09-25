import { OrderMenu } from 'src/DatabaseEntity/ordermenu/entities/ordermenu.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

export enum MenuCategory {
  VEG = 'Veg',
  NON_VEG = 'Non-Veg',
}

@Entity('menu')
export class Menu {
  @PrimaryGeneratedColumn('increment')
  menuid: number;

  @Column()
  menuname: string;

  @Column({
    type: 'enum',
    enum: MenuCategory,
  })
  menucategory: MenuCategory;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @OneToMany(() => OrderMenu, orderMenu => orderMenu.menu)
  orderMenus: OrderMenu[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date;
}
