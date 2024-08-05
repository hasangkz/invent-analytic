import express from 'express';
import { getUser, getUsers, createUser } from '../controllers/userController';
import { borrowBook, returnBook } from '../controllers/borrowController';
import { userValidation } from '../middlewares/userValidation';

const router = express.Router();

router.get('/', getUsers);
router.post('/', userValidation, createUser);
router.get('/:id', getUser);
router.post('/:userId/borrow/:bookId', borrowBook);
router.post('/:userId/return/:bookId', returnBook);

export { router as userRoutes };
