import { Book } from '../entities/Book';

export const getBook = async (req: any, res: any) => {
  const { id } = req.params;

  try {
    const book = await Book.findOne(id);

    if (!book) return res.status(400).json({ error: 'Book not found!' });

    res.status(200).json({ book });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
    console.log('Error in getBook: ', err.message);
  }
};
