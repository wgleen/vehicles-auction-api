import {
  Strategy,
  ExtractJwt
} from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable
} from '@nestjs/common';
import { User } from '../../../entities/user.entity'
import { UsersFindByEmailServiceV1 } from '../users/users-find-by-email.service'
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersFindByEmailService: UsersFindByEmailServiceV1
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt').secret
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { email } = payload

    const user = await this.usersFindByEmailService.execute({ email });

    return user;
  }
}
