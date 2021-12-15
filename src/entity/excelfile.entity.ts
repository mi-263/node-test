import {
    Entity,
    Column,
    UpdateDateColumn,
    CreateDateColumn,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';


@Entity({ name: 'excelfile' })
export class ExcelFileEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'varchar', length: 100, nullable: false })
    filename: string;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        nullable: false,
    })
    lastAccessAt: Date;

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
