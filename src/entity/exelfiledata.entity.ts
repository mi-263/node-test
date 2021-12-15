import {
    Entity,
    Column,
    UpdateDateColumn,
    CreateDateColumn,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';


@Entity({ name: 'excelfiledata' })
export class ExcelFileDataEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'int',  nullable: false })
    excelFileId: number;

    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Column({ type: 'varchar', nullable: false })
    email: string;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        nullable: false,
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        nullable: false,
    })
    updatedAt: Date;
}
