import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const userValidation = [
  body('name')
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors: any = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMessage = errors.array().map((error: any) => error.msg);
      return res.status(400).json({ error: errorMessage[0] });
    }
    next();
  },
];
