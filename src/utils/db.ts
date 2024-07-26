import { AppDataSource } from '../config/ data-source';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed', error);
    process.exit(1);
  }
};
