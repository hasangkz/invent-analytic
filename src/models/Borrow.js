import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from './User';
import { Book } from './Book';

@Entity()
export class Borrow {
  @PrimaryGeneratedColumn()
  id;

  @ManyToOne(() => User, (user) => user.borrows)
  user;

  @ManyToOne(() => Book, (book) => book.borrows)
  book;

  @Column({ type: 'date' })
  borrowDate;

  @Column({ type: 'date', nullable: true })
  returnDate;

  @Column({ type: 'float', nullable: true })
  rating;
}
