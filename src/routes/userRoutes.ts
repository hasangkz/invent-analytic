import express from 'express';
import { getUser, getUsers, createUser } from '../controllers/userController';
import { borrowBook, returnBook } from '../controllers/borrowController';
const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:id', getUser);
router.post('/:userId/borrow/:bookId', borrowBook);
router.post('/:userId/return/:bookId', returnBook);

export { router as userRoutes };
