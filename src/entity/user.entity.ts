import {
  Entity,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';


@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;


  @Column({ type: 'varchar', length: 100, nullable: false })
  email: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    default: ''
  })
  password: string;

  @Column({
    type: 'varchar',
    default: 'user',
    nullable: false,
  })
  type: string

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
