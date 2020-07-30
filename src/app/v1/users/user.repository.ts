import * as bcrypt from 'bcrypt';
import { Repository, EntityRepository } from 'typeorm';
import { User } from '../../../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserByEmailDto } from './dto/find-user-by-email.dto';

@EntityRepository(User)
export class UserRepositoryV1 extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const {
      email,
      username,
      password
    } = createUserDto;

    const user = new User();

    user.username = username;
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    await user.save();

    return user;
  }

  async findUserByEmail(findUserByEmailDto: FindUserByEmailDto): Promise<User> {
    const { email } = findUserByEmailDto;

    const user = await this.findOne({ email });

    return user;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
