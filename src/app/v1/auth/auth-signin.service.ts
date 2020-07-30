import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersFindByEmailServiceV1 } from '../users/users-find-by-email.service';
import { AuthServiceV1 } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtResponse } from './interfaces/jwt-response.interface';

@Injectable()
export class AuthSigninServiceV1 extends AuthServiceV1 {
  constructor(
    public usersFindByEmailServiceV1: UsersFindByEmailServiceV1,
    public jwtSertive: JwtService
  ) {
    super(usersFindByEmailServiceV1, jwtSertive)
  }

  async execute(authCredentials: AuthCredentialsDto): Promise<JwtResponse> {
    const user = await this.validateUserCredentials(authCredentials);

    const payload: JwtPayload = {
      id: user.id,
      email: user.email
    };

    return this.createAccessToken(payload);
  }
}
