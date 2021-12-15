import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class fileUpload1639480816714 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'excelfile',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isNullable: false,
                        generationStrategy: 'increment',
                        isGenerated: true,
                    },
                    {
                        name: 'filename',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'lastAccessAt',
                        type: 'varchar',
                        default: Date.now(),
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                ],
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('excelfile');
    }
}
