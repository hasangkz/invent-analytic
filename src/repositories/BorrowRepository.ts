import { DataSource, Repository } from 'typeorm';
import { Borrow } from '../entities/Borrow';

export class BorrowRepository extends Repository<Borrow> {
  constructor(dataSource: DataSource) {
    super(Borrow, dataSource.manager);
  }

  async findBorrowsByUserId(userId: number): Promise<Borrow[]> {
    return this.createQueryBuilder('borrow')
      .leftJoinAndSelect('borrow.book', 'book')
      .select([
        'borrow.borrow_date',
        'borrow.return_date',
        'book.name',
        'book.average_rating',
      ])
      .where('borrow.user_id = :userId', { userId })
      .getMany();
  }

  async findBorrowsByBookId(bookId: number): Promise<[Borrow[], number]> {
    return this.createQueryBuilder('borrow')
      .select(['borrow.rating'])
      .where(
        'borrow.book_id = :bookId AND borrow.return_date IS NOT NULL AND borrow.rating IS NOT NULL',
        { bookId }
      )
      .getManyAndCount();
  }

  async findUnreturnedBorrowBook(bookId: number): Promise<Borrow | null> {
    return this.createQueryBuilder('borrow')
      .where('borrow.book_id = :bookId AND borrow.return_date IS NULL', {
        bookId,
      })
      .getOne();
  }

  async findUnreturnedBorrowBookByUser(
    userId: number,
    bookId: number
  ): Promise<Borrow | null> {
    return this.createQueryBuilder('borrow')
      .where(
        'borrow.user_id = :userId AND borrow.book_id = :bookId AND borrow.return_date IS NULL',
        {
          userId,
          bookId,
        }
      )
      .getOne();
  }

  async borrowTheBook(userId: number, bookId: number): Promise<String> {
    const borrow = this.create({
      user_id: userId,
      book_id: bookId,
      borrow_date: new Date(),
    });
    await this.save(borrow);
    return 'The book was borrowed successfully!';
  }
}
