import express from 'express';
import { getBook, getBooks, createBook } from '../controllers/bookController';
import { bookValidation } from '../middlewares/bookValidation';

const router = express.Router();

router.get('/', getBooks);
router.post('/', bookValidation, createBook);
router.get('/:id', getBook);

export { router as bookRoutes };
