  import { Entity, Column, OneToMany,PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
  import { Customer } from '../../customers/entities/customer.entity';
  import { Employee } from 'src/employee/entities/employee.entity';

  @Entity('users') // The table name in the database
  export class user {
    
    @PrimaryGeneratedColumn('uuid')
    userId: string; 
    
    @Column({ type: 'varchar', length: 255 })
    fname: string; // First Name
    
    @Column({ type: 'varchar', length: 255 })
    lname: string; // Last Name
    
    @Column({ type: 'varchar', length: 15 })
    contactNumber: string; // Contact number with a limit of 15 characters

    @DeleteDateColumn({ nullable: true })
    deletedAt?: Date; // Soft delete column, auto-handled by TypeORM

    @CreateDateColumn()
    createdAt: Date; // Auto-generated creation timestamp

    @UpdateDateColumn()
    updatedAt: Date; // Auto-generated update timestamp

    @OneToMany(() => Customer, (customer) => customer.user)
    customers: Customer[];

    @OneToMany(() => Employee, (employee) => employee.user)
    employees: Employee[];

  }
