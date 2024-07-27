import express from 'express';
import { getBook, getBooks, createBook } from '../controllers/bookController';
const router = express.Router();

router.get('/', getBooks);
router.post('/', createBook);
router.get('/:id', getBook);

export { router as bookRoutes };
