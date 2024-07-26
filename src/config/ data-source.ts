import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { Book } from '../entities/Book';
import { Borrow } from '../entities/Borrow';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  //   @ts-ignore
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Book, Borrow],
  synchronize: true,
  logging: false,
});
