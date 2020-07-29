import {
  IsNotEmpty,
  IsString,
  Matches
} from 'class-validator';
import {
  EMAIL_VALIDATION_REGEX,
  EMAIL_VALIDATION_MESSAGE
} from '../../../core/validations/email';

export class FindUserByEmailDto {
  @IsNotEmpty()
  @IsString()
  @Matches(
    EMAIL_VALIDATION_REGEX,
    { message: EMAIL_VALIDATION_MESSAGE }
  )
  email: string;
}
