import { Borrow } from '../entities/Borrow';
import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../config/ data-source';
import { CustomError } from '../exceptions/errorException';
import { UserRepository } from '../repositories/UserRepository';
import { BorrowRepository } from '../repositories/BorrowRepository';
import { BookRepository } from '../repositories/BookRepository';
import { BorrowService } from '../services/borrowService';

// [POST]
export const borrowBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = parseInt(req.params.userId);
    const bookId = parseInt(req.params.bookId);

    const userRepository = new UserRepository(AppDataSource);
    const borrowRepository = new BorrowRepository(AppDataSource);
    const bookRepository = new BookRepository(AppDataSource);

    const user = await userRepository.findUserById(userId);

    if (!user) throw new CustomError('User not found!', 400);

    const book = await bookRepository.findBookById(bookId);

    if (!book) throw new CustomError('Book not found!', 400);

    const borrowByUser = await borrowRepository.findUnreturnedBorrowBookByUser(
      userId,
      bookId
    );

    if (borrowByUser)
      throw new CustomError('The book has been already borrowed by you!', 404);

    const borrow = await borrowRepository.findUnreturnedBorrowBook(bookId);

    if (borrow)
      throw new CustomError(
        'The book has been already borrowed by someone!',
        404
      );

    const successCreate = await borrowRepository.borrowTheBook(userId, bookId);

    res.status(200).json({ message: successCreate });
  } catch (err: any) {
    next(err);
  }
};

// [POST]
export const returnBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { score } = req.body;
    const userId = parseInt(req.params.userId);
    const bookId = parseInt(req.params.bookId);

    const userRepository = new UserRepository(AppDataSource);
    const borrowRepository = new BorrowRepository(AppDataSource);
    const bookRepository = new BookRepository(AppDataSource);

    const user = await userRepository.findUserById(userId);

    if (!user) throw new CustomError('User not found!', 400);

    const book = await bookRepository.findBookById(bookId);

    if (!book) throw new CustomError('Book not found!', 400);

    let borrow = await borrowRepository.findUnreturnedBorrowBookByUser(
      userId,
      bookId
    );

    if (!borrow)
      throw new CustomError(
        'You cannot return a book that you did not borrow!',
        400
      );

    if (score) {
      borrow.rating = score;

      const [borrows, count] = await borrowRepository.findBorrowsByBookId(
        bookId
      );

      if (borrows && borrows?.length && count > 0) {
        await BorrowService.handleCommentedBorrowRating(
          borrows,
          bookId,
          count,
          score
        );
      } else {
        await BorrowService.handleUnCommentedBorrowRating(bookId, score);
      }
    }
    borrow.return_date = new Date();
    await Borrow.save(borrow);

    res.status(200).json({ message: 'The book was returned successfully!' });
  } catch (err: any) {
    next(err);
  }
};
