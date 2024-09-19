import { MigrationInterface, QueryRunner } from "typeorm";

export class Newadded1726679336237 implements MigrationInterface {

   
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`employee\` ADD COLUMN \`role\` VARCHAR(255) NOT NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
