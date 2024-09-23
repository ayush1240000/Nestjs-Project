import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddRoleColumnToUser1645123456789 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('users', new TableColumn({
            name: 'role',
            type: 'enum',
            enum: ['admin', 'employee', 'customer'],
            default: `'customer'`, // Ensure the default is set correctly
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'role');
    }
}
