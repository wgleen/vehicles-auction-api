import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import {
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { AuthSigninServiceV1 } from './auth-signin.service';
import { AuthSignupServiceV1 } from './auth-signup.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtResponse } from './interfaces/jwt-response.interface';

@ApiTags('Auth v1')
@Controller('v1/auth')
export class AuthControllerV1 {
  constructor(
    private authSignupServiceV1: AuthSignupServiceV1,
    private authSigninServiceV1: AuthSigninServiceV1
  ) {}

  @Post('signup')
  @ApiOperation({ summary: 'Create a User' })
  @UsePipes(ValidationPipe)
  async signUp(@Body() createUserDto: CreateUserDto): Promise<JwtResponse> {
    return this.authSignupServiceV1.execute(createUserDto);
  }

  @Post('signin')
  @ApiOperation({ summary: 'SignIn a User' })
  @UsePipes(ValidationPipe)
  async signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<JwtResponse> {
    return this.authSigninServiceV1.execute(authCredentialsDto);
  }
}
