import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1726657694792 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create the 'users' table
        await queryRunner.query(`
            CREATE TABLE \`users\` (
                \`userId\` CHAR(36) PRIMARY KEY,
                \`fname\` VARCHAR(255) NOT NULL,
                \`lname\` VARCHAR(255) NOT NULL,
                \`contactNumber\` VARCHAR(15) NOT NULL,
                \`deletedAt\` TIMESTAMP NULL,
                \`createdAt\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                \`updatedAt\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
            );
        `);

        // Create the 'customers' table
        await queryRunner.query(`
            CREATE TABLE \`customers\` (
                \`customerId\` CHAR(36) PRIMARY KEY,
                \`userId\` CHAR(36) NOT NULL,
                \`deletedAt\` TIMESTAMP NULL,
                \`createdAt\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                \`updatedAt\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
                CONSTRAINT \`FK_user_customers\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION
            );
        `);

        // Create the 'employee' table
        await queryRunner.query(`
            CREATE TABLE \`employee\` (
                \`employeeId\` CHAR(36) PRIMARY KEY,
                \`userId\` CHAR(36) NOT NULL,
                \`deletedAt\` TIMESTAMP NULL,
                \`createdAt\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                \`updatedAt\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
                CONSTRAINT \`FK_user_employee\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop the 'employee' table
        await queryRunner.query(`DROP TABLE \`employee\`;`);

        // Drop the 'customers' table
        await queryRunner.query(`DROP TABLE \`customers\`;`);

        // Drop the 'users' table
        await queryRunner.query(`DROP TABLE \`users\`;`);
    }
}
