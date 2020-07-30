import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersFindByEmailServiceV1 } from '../users/users-find-by-email.service';
import { User } from '../../../entities/user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtResponse } from './interfaces/jwt-response.interface';

export class AuthServiceV1 {
  constructor(
    protected usersFindByEmailServiceV1: UsersFindByEmailServiceV1,
    protected jwtSertive: JwtService
  ) {
  }

  async validateUserCredentials(authCredentials: AuthCredentialsDto): Promise<User> {
    const {
      email,
      password
    } = authCredentials

    const user = await this.usersFindByEmailServiceV1.execute({ email });

    if (!user) throw new UnauthorizedException();

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) throw new UnauthorizedException();

    return user;
  }

  async createAccessToken(payload: JwtPayload): Promise<JwtResponse> {
    const accessToken: string = await this.jwtSertive.sign(payload);

    return { accessToken };
  }
}
