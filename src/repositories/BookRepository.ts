import { DataSource, Repository } from 'typeorm';
import { Book } from '../entities/Book';
import { CustomError } from '../exceptions/errorException';

export class BookRepository extends Repository<Book> {
  constructor(dataSource: DataSource) {
    super(Book, dataSource.manager);
  }

  async findBookById(id: number): Promise<Book | null> {
    return this.createQueryBuilder('book')
      .select(['book.id', 'book.name', 'book.average_rating'])
      .where('book.id = :id', { id })
      .getOne();
  }

  async findAllBooks(): Promise<Book[]> {
    return this.createQueryBuilder('book')
      .select(['book.id', 'book.name'])
      .getMany();
  }

  async createBook(name: string): Promise<String> {
    const book = this.create({ name });
    await this.save(book);
    return 'The book was created successfully!';
  }

  async handleRatingBookById(id: number, rating: number) {
    let book = await this.findBookById(id);
    if (book) {
      book.average_rating = rating;
      await this.save(book);
    } else {
      throw new CustomError(
        'You cannot return a book that you did not borrow!',
        400
      );
    }
  }
}
