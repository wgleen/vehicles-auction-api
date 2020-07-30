import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import {
  ConfigService,
  ConfigModule
} from '@nestjs/config';
import { UsersModuleV1 } from '../users/users.module';
import { AuthServiceV1 } from './auth.service';
import { AuthSignupServiceV1 } from './auth-signup.service';
import { AuthSigninServiceV1 } from './auth-signin.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthControllerV1 } from './auth.controller';

@Module({
  imports: [
    ConfigModule,
    UsersModuleV1,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => (
        configService.get('jwt')
      ),
      inject: [ConfigService],
      imports: [ConfigModule]
    }),
  ],
  controllers: [AuthControllerV1],
  providers: [
    AuthServiceV1,
    AuthSignupServiceV1,
    AuthSigninServiceV1,
    JwtStrategy
  ]
})
export class AuthModuleV1 {}
