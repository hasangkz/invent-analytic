import { Book } from '../entities/Book';
import { User } from '../entities/User';
import { Borrow } from '../entities/Borrow';
import { IsNull } from 'typeorm';
import { Request, Response } from 'express';

export const borrowBook = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const bookId = parseInt(req.params.bookId);

    const user = await User.findOne({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const book = await Book.findOne({
      where: { id: bookId },
    });

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const borrow = await Borrow.findOne({
      where: {
        book_id: book.id,
        return_date: IsNull(),
      },
    });

    if (borrow) {
      return res
        .status(404)
        .json({ message: 'Book has been already borrowed!' });
    }

    const newBorrow = await Borrow.create({
      user_id: userId,
      book_id: bookId,
      borrow_date: new Date(),
    });
    await Borrow.save(newBorrow);

    res.status(200).json({ message: 'The book was borrowed successfully.' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
    console.log('Error in borrow: ', err.message);
  }
};

export const returnBook = async (req: Request, res: Response) => {
  try {
    const { score } = req.body;
    const userId = parseInt(req.params.userId);
    const bookId = parseInt(req.params.bookId);

    const user = await User.findOne({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const book = await Book.findOne({
      where: { id: bookId },
    });

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const borrow = await Borrow.findOne({
      where: {
        user_id: user.id,
        book_id: book.id,
        return_date: IsNull(),
      },
    });

    if (!borrow) {
      return res
        .status(404)
        .json({ message: 'User have not borrow this book!' });
    }

    const returnDate = new Date();

    borrow.return_date = returnDate;
    if (score) {
      borrow.rating = score;

      const [borrows, count] = await Borrow.createQueryBuilder('borrow')
        .select(['borrow.rating'])
        .where(
          'borrow.book_id = :bookId AND borrow.return_date IS NOT NULL AND borrow.rating IS NOT NULL',
          { bookId }
        )
        .getManyAndCount();

      if (borrows && borrows?.length && count > 0) {
        const ratings = borrows.map((item) => item.rating);
        let sumOfRating: number = ratings?.reduce(
          (accumulator: any, currentValue: any) => accumulator + currentValue,
          0
        );
        sumOfRating += score;
        let resultRating = sumOfRating / (count + 1);

        book.average_rating = resultRating;
        await Book.save(book);
      }
    }
    await Borrow.save(borrow);

    res.status(200).json({ message: 'The book was returned successfully.' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
    console.log('Error in returnBook: ', err.message);
  }
};
