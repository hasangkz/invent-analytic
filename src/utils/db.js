const pg = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const postgresClient = new pg.Pool({
  connectionString: process.env.DB_CONNECTION_KEY,
});

const connectDB = async () => {
  await postgresClient.connect((err) => {
    if (err) {
      console.error('Database connection failed', err);
      process.exit(1);
    } else {
      console.log('Database connected successfully');
    }
  });
};

module.exports = connectDB;
