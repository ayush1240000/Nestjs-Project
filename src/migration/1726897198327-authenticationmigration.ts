import { MigrationInterface, QueryRunner } from "typeorm";

export class Authenticationmigration1726897198327 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`users\` ADD COLUMN \`password\` VARCHAR(255) NOT NULL;
          ALTER TABLE \`users\` ADD COLUMN \`email\` VARCHAR(255)  NOT NULL UNIQUE;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
