import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { UserRepositoryV1 } from './user.repository';
import { FindUserByEmailDto } from './dto/find-user-by-email.dto';

@Injectable()
export class UsersFindByEmailServiceV1 {
  constructor(
    @InjectRepository(UserRepositoryV1)
    private userRepository: UserRepositoryV1
  ) {
  }

  async execute(findUserByEmailDto: FindUserByEmailDto): Promise<User> {
    return this.userRepository.findUserByEmail(findUserByEmailDto);
  }
}
