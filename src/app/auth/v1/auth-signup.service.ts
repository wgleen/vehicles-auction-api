import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersFindByEmailServiceV1 } from '../../users/v1/users-find-by-email.service';
import { AuthServiceV1 } from './auth.service';
import { UsersCreateServiceV1 } from '../../users/v1/users-create.service';
import { CreateUserDto } from '../../users/v1/dto/create-user.dto';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { JwtResponse } from '../interfaces/jwt-response.interface';

@Injectable()
export class AuthSignupServiceV1 extends AuthServiceV1 {
  constructor(
    public usersFindByEmailServiceV1: UsersFindByEmailServiceV1,
    public jwtSertive: JwtService,
    private usersCreateService: UsersCreateServiceV1,
  ) {
    super(
      usersFindByEmailServiceV1,
      jwtSertive
    )
  }

  async execute(createUserDto: CreateUserDto): Promise<JwtResponse> {
    const user = await this.usersCreateService.execute(createUserDto);

    const payload: JwtPayload = {
      id: user.id,
      email: user.email
    };

    return this.createAccessToken(payload);
  }
}
