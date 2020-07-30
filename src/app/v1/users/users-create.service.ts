import {
  Injectable,
  ConflictException,
  InternalServerErrorException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../entities/user.entity';
import { UserRepositoryV1 } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';

export const UNIQUE_CONSTRAINT_ERROR_CODE = 23505

@Injectable()
export class UsersCreateServiceV1 {
  constructor(
    @InjectRepository(UserRepositoryV1)
    private userRepository: UserRepositoryV1
  ) {
  }

  async execute(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.userRepository.createUser(createUserDto);

      return user;
    } catch (error) {
      if (parseInt(error.code) === UNIQUE_CONSTRAINT_ERROR_CODE) {
        throw new ConflictException();
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
