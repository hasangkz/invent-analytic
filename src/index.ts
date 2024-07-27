import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { connectDB } from './utils/db';
import { bookRoutes } from './routes/bookRoutes';
import { userRoutes } from './routes/userRoutes';
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
connectDB();

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

app.get('/', (req: any, res: any) => {
  res.redirect('https://hasangkz.vercel.app/');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
