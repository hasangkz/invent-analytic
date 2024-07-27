import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../exceptions/errorException';

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err.statusCode);
  console.log(err.message);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({ error: message });

  console.error(`[${new Date().toISOString()}] Error: ${message}`);
};
