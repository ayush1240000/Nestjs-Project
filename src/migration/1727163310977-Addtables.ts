

import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTables1727163310977 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`users\` (
                \`userId\` INT AUTO_INCREMENT PRIMARY KEY,
                \`fname\` VARCHAR(255) NOT NULL,
                \`lname\` VARCHAR(255) NOT NULL,
                \`contactNumber\` VARCHAR(15) NOT NULL,
                \`email\` VARCHAR(255) NOT NULL UNIQUE,
                \`password\` VARCHAR(255) NOT NULL,
                \`role\` ENUM('admin', 'employee', 'customer') DEFAULT 'customer',
                \`deletedAt\` TIMESTAMP NULL,
                \`createdAt\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                \`updatedAt\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
            );
        `);

        await queryRunner.query(`
            CREATE TABLE \`customers\` (
                \`customerId\` INT AUTO_INCREMENT PRIMARY KEY,
                \`userId\` INT NOT NULL,
                \`deletedAt\` TIMESTAMP NULL,
                \`createdAt\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                \`updatedAt\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
                FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`userId\`) ON DELETE CASCADE
            );
        `);

        await queryRunner.query(`
            CREATE TABLE \`employee\` (
                \`employeeId\` INT AUTO_INCREMENT PRIMARY KEY,
                \`userId\` INT NOT NULL,
                \`role\` VARCHAR(255) NOT NULL,
                \`salaryAmount\` DECIMAL(10, 2) NOT NULL,
                \`deletedAt\` TIMESTAMP NULL,
                \`createdAt\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                \`updatedAt\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
                FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`userId\`) ON DELETE CASCADE
            );
        `);

        await queryRunner.query(`
            CREATE TABLE \`menu\` (
                \`menuId\` INT AUTO_INCREMENT PRIMARY KEY,
                \`menuName\` VARCHAR(255) NOT NULL,
                \`menuCategory\` ENUM('Veg', 'Non-Veg') NOT NULL,
                \`price\` DECIMAL(10, 2) NOT NULL,
                \`createdAt\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                \`updatedAt\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
                \`deletedAt\` TIMESTAMP NULL
            );
        `);

        await queryRunner.query(`
            CREATE TABLE \`userOrder\` (
                \`orderId\` INT AUTO_INCREMENT PRIMARY KEY,
                \`customerId\` INT NOT NULL,
                \`createdAt\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                \`updatedAt\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
                \`deletedAt\` TIMESTAMP NULL,
                FOREIGN KEY (\`customerId\`) REFERENCES \`customers\`(\`customerId\`) ON DELETE CASCADE
            );
        `);

        await queryRunner.query(`
            CREATE TABLE \`orderMenu\` (
                \`id\` INT AUTO_INCREMENT PRIMARY KEY,
                \`orderId\` INT NOT NULL,
                \`menuId\` INT NOT NULL,
                \`quantity\` INT NOT NULL,
                \`createdAt\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                \`updatedAt\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
                \`deletedAt\` TIMESTAMP NULL,
                FOREIGN KEY (\`orderId\`) REFERENCES \`userOrder\`(\`orderId\`) ON DELETE CASCADE,
                FOREIGN KEY (\`menuId\`) REFERENCES \`menu\`(\`menuId\`) ON DELETE CASCADE
            );
        `);

        await queryRunner.query(`
            CREATE TABLE \`dinnerTable\` (
                \`tableNo\` INT AUTO_INCREMENT PRIMARY KEY,
                \`status\` ENUM('Occupied', 'Vacant') NOT NULL DEFAULT 'Vacant',
                \`customerId\` INT NULL,
                \`employeeId\` INT NULL,
                \`createdAt\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                \`updatedAt\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
                \`deletedAt\` TIMESTAMP NULL,
                FOREIGN KEY (\`customerId\`) REFERENCES \`customers\`(\`customerId\`) ON DELETE SET NULL,
                FOREIGN KEY (\`employeeId\`) REFERENCES \`employee\`(\`employeeId\`) ON DELETE SET NULL
            );
        `);

        await queryRunner.query(`
            CREATE TABLE \`bill\` (
                \`billId\` INT AUTO_INCREMENT PRIMARY KEY,
                \`customerId\` INT NULL,
                \`employeeId\` INT NULL,
                \`tableNo\` INT NULL,
                \`amount\` DECIMAL(10, 2) NOT NULL,
                \`payment\` ENUM('Cash', 'OnlinePayment') NOT NULL,
                \`createdAt\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                \`updatedAt\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
                \`deletedAt\` TIMESTAMP NULL,
                FOREIGN KEY (\`customerId\`) REFERENCES \`customers\`(\`customerId\`) ON DELETE SET NULL,
                FOREIGN KEY (\`employeeId\`) REFERENCES \`employee\`(\`employeeId\`) ON DELETE SET NULL,
                FOREIGN KEY (\`tableNo\`) REFERENCES \`dinnerTable\`(\`tableNo\`) ON DELETE SET NULL
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`bill\`;`);
        await queryRunner.query(`DROP TABLE \`dinnerTable\`;`);
        await queryRunner.query(`DROP TABLE \`orderMenu\`;`);
        await queryRunner.query(`DROP TABLE \`userOrder\`;`);
        await queryRunner.query(`DROP TABLE \`menu\`;`);
        await queryRunner.query(`DROP TABLE \`employee\`;`);
        await queryRunner.query(`DROP TABLE \`customers\`;`);
        await queryRunner.query(`DROP TABLE \`users\`;`);
    }
}
