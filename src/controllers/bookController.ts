import { NextFunction, Request, Response } from 'express';
import { Book } from '../entities/Book';
import { AppDataSource } from '../config/ data-source';
import { BookRepository } from '../repositories/BookRepository';
import { BookDTO } from '../dtos/BookDTO';
import { CustomError } from '../exceptions/errorException';

// [GET]
export const getBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);

    const bookRepository = new BookRepository(AppDataSource);

    const book = await bookRepository.findBookById(id);

    if (!book) throw new CustomError('Book not found!', 400);

    const bookDTO = new BookDTO(book.id, book.name, book.average_rating);

    res.status(200).json(bookDTO);
  } catch (err: any) {
    next(err);
  }
};

// [GET]
export const getBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookRepository = new BookRepository(AppDataSource);

    const books = await bookRepository.findAllBooks();

    if (!books) throw new CustomError('There is no books!', 400);

    res.status(200).json(books);
  } catch (err: any) {
    next(err);
  }
};

// [POST]
export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { name } = req.body;

    if (!name) throw new CustomError('Name field is required!', 400);

    const book = await Book.findOne({ where: { name } });

    if (book) {
      throw new CustomError('Book already exist', 404);
    }

    const bookRepository = new BookRepository(AppDataSource);

    const successCreate = await bookRepository.createBook(name);

    res.status(200).json({ message: successCreate });
  } catch (err: any) {
    next(err);
  }
};
