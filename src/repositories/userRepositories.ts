import { Repository, DataSource } from 'typeorm';
import { User } from '../entities/User';

export class UserRepository extends Repository<User> {
  async findUserById(id: number): Promise<User | null> {
    return this.findOne({
      where: { id },
    });
  }
}

// Repository'yi almak için bir fonksiyon tanımlayabilirsiniz
export const getUserRepository = (dataSource: DataSource): UserRepository => {
  return dataSource.getRepository(User) as UserRepository;
};
