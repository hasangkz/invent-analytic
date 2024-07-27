import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  JoinColumn,
} from 'typeorm';
import { User } from './User';
import { Book } from './Book';

@Entity()
export class Borrow extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  user_id!: number;
  @ManyToOne(() => User, {
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ nullable: false })
  book_id!: number;
  @ManyToOne(() => Book, {
    nullable: false,
  })
  @JoinColumn({ name: 'book_id' })
  book!: Book;

  @Column({ type: 'date', nullable: false })
  borrow_date!: Date;

  @Column({ type: 'date', nullable: true })
  return_date?: Date;

  @Column({ type: 'float', nullable: true })
  rating?: number;
}
