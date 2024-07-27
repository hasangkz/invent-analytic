import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/User';

export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.manager);
  }

  async findUserById(id: number): Promise<User | null> {
    return this.createQueryBuilder('user')
      .select(['user.id', 'user.name'])
      .where('user.id = :id', { id })
      .getOne();
  }

  async findAllUsers(): Promise<User[]> {
    return this.createQueryBuilder('book')
      .select(['book.id', 'book.name'])
      .getMany();
  }

  async createUser(name: string): Promise<String> {
    const user = this.create({ name });
    await this.save(user);
    return 'The user was created successfully!';
  }
}
