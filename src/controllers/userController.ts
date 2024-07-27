import { Request, Response } from 'express';
import { Borrow } from '../entities/Borrow';
import { User } from '../entities/User';
import { IUserBook } from '../types/user';

export const getUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    const user = await User.createQueryBuilder('user')
      .select(['user.id', 'user.name'])
      .where('user.id = :id', { id })
      .getOne();

    if (!user) return res.status(400).json({ error: 'User not found!' });

    const borrows = await Borrow.createQueryBuilder('borrow')
      .leftJoinAndSelect('borrow.book', 'book')
      .select([
        'borrow.borrow_date',
        'borrow.return_date',
        'book.name',
        'book.average_rating',
      ])
      .where('borrow.user_id = :userId', { userId: user.id })
      .getMany();

    let pastBooks: IUserBook[] = [];
    let presentBooks: IUserBook[] = [];

    for (const borrowedBook of borrows) {
      if (borrowedBook?.return_date) {
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

    res.status(200).json({
      id,
      name: user.name,
      books: { past: pastBooks, present: presentBooks },
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
    console.log('Error in getUser: ', err.message);
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.createQueryBuilder('user')
      .select(['user.id', 'user.name'])
      .getMany();

    if (!users) return res.status(400).json({ error: 'User not found!' });

    res.status(200).json(users);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
    console.log('Error in getUser: ', err.message);
  }
};

export const createUser = async (req: any, res: any) => {
  try {
    let { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name field is required!' });
    }

    const user = await User.findOne({ where: { name } });

    if (user) {
      return res.status(404).json({ error: 'User already exist' });
    }

    const newUser = User.create({ name });
    await User.save(newUser);

    res.status(200).json({ user: newUser });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
    console.log('Error in getUser: ', err.message);
  }
};
