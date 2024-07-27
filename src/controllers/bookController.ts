import { Request, Response } from 'express';
import { Book } from '../entities/Book';

export const getBook = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    const book = await Book.createQueryBuilder('book')
      .select(['book.id', 'book.name', 'book.average_rating'])
      .where('book.id = :id', { id })
      .getOne();

    if (!book) return res.status(400).json({ error: 'Book not found!' });

    res
      .status(200)
      .json({ id, name: book.name, score: String(book.average_rating || -1) });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
    console.log('Error in getBook: ', err.message);
  }
};

export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.createQueryBuilder('book')
      .select(['book.id', 'book.name'])
      .getMany();

    if (!books) return res.status(400).json({ error: 'Book not found!' });

    res.status(200).json(books);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
    console.log('Error in getBooks: ', err.message);
  }
};

export const createBook = async (req: Request, res: Response) => {
  try {
    let { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name field is required!' });
    }

    const book = await Book.findOne({ where: { name } });

    if (book) {
      return res.status(404).json({ error: 'Book already exist' });
    }

    const newBook = Book.create({ name });
    await Book.save(newBook);

    res.status(200).json({ book: newBook });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
    console.log('Error in create Book: ', err.message);
  }
};
