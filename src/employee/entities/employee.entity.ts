import { Entity, Column, PrimaryGeneratedColumn, ManyToOne,JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { user } from '../../users/entities/user.entity';

@Entity('employee')
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  employeeId: string;

  @Column() 
  userId: string;

  @Column()
  role: string;

  @ManyToOne(() => user, (user) => user.employees, { nullable: false }) 
  @JoinColumn({ name: 'userId' })
  user: user;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
