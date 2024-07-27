import { AppDataSource } from '../config/ data-source';
import { Borrow } from '../entities/Borrow';
import { BookRepository } from '../repositories/BookRepository';
import { IUserBook } from '../types/user';

export class BorrowService {
  static async handleBorrowBook(
    borrows: Borrow[]
  ): Promise<{ past: IUserBook[]; present: IUserBook[] }> {
    const pastBooks: IUserBook[] = [];
    const presentBooks: IUserBook[] = [];

    for (const borrowedBook of borrows) {
      if (borrowedBook.return_date) {
        pastBooks.push({
          name: borrowedBook.book.name,
          userScore: borrowedBook.book.average_rating,
        });
      } else {
        presentBooks.push({
          name: borrowedBook.book.name,
          userScore: borrowedBook.book.average_rating,
        });
      }
    }

    return { past: pastBooks, present: presentBooks };
  }

  static async handleCommentedBorrowRating(
    borrows: Borrow[],
    bookId: number,
    count: number,
    userScore: number
  ): Promise<boolean> {
    const bookRepository = new BookRepository(AppDataSource);

    const ratings = borrows.map((item) => item.rating);
    let sumOfRating: number = ratings?.reduce(
      (accumulator: any, currentValue: any) => accumulator + currentValue,
      0
    );
    sumOfRating += userScore;
    let resultRating = sumOfRating / (count + 1);

    await bookRepository.handleRatingBookById(bookId, resultRating);
    return true;
  }
  static async handleUnCommentedBorrowRating(
    bookId: number,
    userScore: number
  ): Promise<boolean> {
    const bookRepository = new BookRepository(AppDataSource);
    await bookRepository.handleRatingBookById(bookId, userScore);

    return true;
  }
}
