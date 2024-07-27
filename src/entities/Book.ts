import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', nullable: false, unique: true })
  name!: string;

  @Column({ type: 'float', default: 0 })
  average_rating!: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;
}
