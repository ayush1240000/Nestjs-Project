import { DataSource } from 'typeorm';


export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Ayush@1240',
  database: 'new_schema',
  "entities": ["src/**/**/*.entity.ts"],
  migrations: ['src/migration/*.ts'],
  synchronize: true,
});