import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import { Book } from './Book';

@Entity()
export class Borrow {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.borrows)
  user!: User;

  @ManyToOne(() => Book, (book) => book.borrows)
  book!: Book;

  @Column({ type: 'date', nullable: false })
  borrow_date!: Date;

  @Column({ type: 'date', nullable: true })
  return_date?: Date;

  @Column({ type: 'float', nullable: true })
  rating?: number;
}
