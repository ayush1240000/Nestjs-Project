import { Entity, Column, PrimaryGeneratedColumn, ManyToOne,JoinColumn,OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne } from 'typeorm';
import { user } from '../../users/entities/user.entity';

import { DinnerTable } from 'src/DatabaseEntity/dinnertables/entities/dinnertable.entity';
import { Bill } from 'src/DatabaseEntity/bills/entities/bill.entity';

@Entity('employee')
export class Employee {
  @PrimaryGeneratedColumn({})
  employeeId: number;

  @Column() 
  userId: number;

  @Column()
  role: string;

  @Column()
  Salaryamount: number;


  @OneToOne(() => user, (user) => user.employees, { nullable: false }) 
  @JoinColumn({ name: 'userId' })
  user: user;


  @OneToMany(() => DinnerTable, dinnerTable => dinnerTable.employee, {eager : true}) // One Employee can manage many DinnerTables
  dinnerTables: DinnerTable[];


  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Bill, bill => bill.employee)
  bills: Bill[];
}
