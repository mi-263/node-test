import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class userlogs1639490201040 implements MigrationInterface {
    name = 'userlogs1639490201040'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'reviewlogs',
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
                        name: 'userId',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'fileId',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'reviewedAt',
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
        await queryRunner.dropTable('reviewlogs');
    }


}
