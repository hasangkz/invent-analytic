import { IUserBook } from '../types/user';

export class UserDTO {
  id: number;
  name: string;
  books: {
    past: IUserBook[];
    present: IUserBook[];
  };

  constructor(
    id: number,
    name: string,
    pastBooks: IUserBook[],
    presentBooks: IUserBook[]
  ) {
    this.id = id;
    this.name = name;
    this.books = {
      past: pastBooks,
      present: presentBooks,
    };
  }
}
