import { NextFunction, Request, Response } from 'express';
import { User } from '../entities/User';
import { CustomError } from '../exceptions/errorException';
import { UserDTO } from '../dtos/UserDTO';
import { UserRepository } from '../repositories/UserRepository';
import { BorrowRepository } from '../repositories/BorrowRepository';
import { AppDataSource } from '../config/data-source';
import { BorrowService } from '../services/borrowService';

// [GET]
export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);

    const userRepository = new UserRepository(AppDataSource);
    const borrowRepository = new BorrowRepository(AppDataSource);

    const user = await userRepository.findUserById(id);

    if (!user) throw new CustomError('User not found!', 400);

    const borrows = await borrowRepository.findBorrowsByUserId(id);

    const { past, present } = await BorrowService.handleBorrowBook(borrows);

    const userDTO = new UserDTO(user.id, user.name, past, present);

    res.status(200).json(userDTO);
  } catch (err: any) {
    next(err);
  }
};

// [GET]
export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userRepository = new UserRepository(AppDataSource);
    const users = await userRepository.findAllUsers();

    if (!users) throw new CustomError('There are no users!', 400);

    res.status(200).json(users);
  } catch (err: any) {
    next(err);
  }
};

// [POST]
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { name } = req.body;

    if (!name) throw new CustomError('Name field is required!', 400);

    const user = await User.findOne({ where: { name } });

    if (user) throw new CustomError('User already exist!', 404);

    const userRepository = new UserRepository(AppDataSource);

    const successCreate = await userRepository.createUser(name);

    res.status(200).json({ message: successCreate });
  } catch (err: any) {
    next(err);
  }
};
