import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Borrow } from './Borrow';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id;

  @Column()
  name;

  @Column({ type: 'float', default: 0 })
  averageRating;

  @OneToMany(() => Borrow, (borrow) => borrow.book)
  borrows;
}
