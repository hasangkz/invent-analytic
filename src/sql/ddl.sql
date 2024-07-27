-- Book table
CREATE TABLE "Book" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR NOT NULL UNIQUE,
  "average_rating" FLOAT DEFAULT 0,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User table
CREATE TABLE "User" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR NOT NULL UNIQUE,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Borrow table
CREATE TABLE "Borrow" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INT NOT NULL,
  "book_id" INT NOT NULL,
  "borrow_date" DATE NOT NULL,
  "return_date" DATE,
  "rating" FLOAT,
  FOREIGN KEY ("user_id") REFERENCES "User"("id"),
  FOREIGN KEY ("book_id") REFERENCES "Book"("id")
);
