import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { bookRoutes } from './routes/bookRoutes';
import { userRoutes } from './routes/userRoutes';
import { errorHandler } from './middlewares/errorHandler';
import { AppDataSource } from './config/data-source';

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();

AppDataSource.initialize()
  .then(() => {
    //middlewares
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
      );
      next();
    });
    app.use(bodyParser.json());
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ limit: '50mb', extended: true }));

    // routes
    app.use('/users', userRoutes);
    app.use('/books', bookRoutes);
    app.use(errorHandler);

    app.get('/', (req: any, res: any) => {
      res.redirect('https://hasangkz.vercel.app/');
    });

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));
