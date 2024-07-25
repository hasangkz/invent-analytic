const {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} = require('typeorm');
const { Borrow } = require('./Borrow');

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id;

  @Column()
  name;

  @OneToMany(() => Borrow, (borrow) => borrow.user)
  borrows;
}

module.exports = { User };
