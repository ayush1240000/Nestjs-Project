  import { Entity, Column,PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn,DeleteDateColumn, OneToOne } from 'typeorm';
  import { Customer } from '../../customers/entities/customer.entity';
  import { Employee } from '../../employee/entities/employee.entity';
  import { Roles } from 'src/authroization/roles.enum';

  @Entity('users') 
  export class user {
  
    @PrimaryGeneratedColumn({})
    userId: number; // 
    
    @Column({ type: 'varchar', length: 255 })
    fname: string; // First Name
    
    @Column({ type: 'varchar', length: 255 })
    lname: string; // Last Name
    
    @Column({ type: 'varchar', length: 15 })
    contactNumber: string; // Contact number with a limit of 15 characters

    @Column({ type: 'varchar', length: 255, unique: true })
    email: string; // Email address, unique in the system
  
    @Column({ type: 'varchar', length: 255 })
    password: string; // Hashed password for the user

     @Column({ type: 'enum', enum: Roles, default: Roles.Customer })
    role: Roles;

    @DeleteDateColumn({ nullable: true })
    deletedAt?: Date; // Soft delete column, auto-handled by TypeORM

    @CreateDateColumn()
    createdAt: Date; // Auto-generated creation timestamp

    @UpdateDateColumn()
    updatedAt: Date; // Auto-generated update timestamp

    @OneToOne(() => Customer, (customer) => customer.user)
    customers: Customer[];

    @OneToOne(() => Employee, (employee) => employee.user)
    employees: Employee[];  

  }
