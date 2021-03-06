import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches
} from 'class-validator';
import {
  EMAIL_VALIDATION_REGEX,
  EMAIL_VALIDATION_MESSAGE
} from '../../../core/validations/email';
import {
  PASSWORD_VALIDATION_REGEX,
  PASSWORD_VALIDATION_MESSAGE
} from '../../../core/validations/password';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Matches(
    EMAIL_VALIDATION_REGEX,
    { message: EMAIL_VALIDATION_MESSAGE }
  )
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(
    PASSWORD_VALIDATION_REGEX,
    { message: PASSWORD_VALIDATION_MESSAGE }
  )
  password: string;
}
