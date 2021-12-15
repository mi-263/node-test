import {
    Entity,
    Column,
    UpdateDateColumn,
    CreateDateColumn,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';


@Entity({ name: 'reviewlogs' })
export class ReviewLogsEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'int', nullable: false })
    userId: number;


    @Column({ type: 'int', nullable: false })
    fileId: number;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        nullable: false,
    })
    reviewedAt: Date;
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
