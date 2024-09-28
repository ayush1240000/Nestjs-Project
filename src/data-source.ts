import { DataSource } from 'typeorm';

// import { Bill } from './DatabaseEntity/bills/entities/bill.entity';


export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Ayush@1240',
  database: 'newdb',
  "entities": ["src/**/**/*.entity.ts"],
  migrations: ['src/migration/*.ts'],
  synchronize: true,
});