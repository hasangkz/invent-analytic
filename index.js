const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/utils/db');
const userRoutes = require('./src/routes/userRoutes');
const bookRoutes = require('./src/routes/bookRoutes');

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
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

//routes
app.use('/users', userRoutes);
app.use('/books', bookRoutes);

app.get('/', (req, res) => {
  res.redirect('https://hasangkz.vercel.app/');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
