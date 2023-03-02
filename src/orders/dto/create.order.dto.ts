import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsEmail,
} from 'class-validator';
import {
  EMAIL_VALIDATION,
  PHONE_NUMRER_VALIDATION,
  SURNAME_VALIDATION,
  USERNAME_VALIDATION,
} from '../../auth/auth.constants';

export class CreateOrderDto {
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @Matches(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/, {
    message: USERNAME_VALIDATION,
  })
  readonly userName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @Matches(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/, {
    message: SURNAME_VALIDATION,
  })
  readonly userSurname: string;

  @IsString()
  @IsEmail()
  @Matches(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    {
      message: EMAIL_VALIDATION,
    },
  )
  readonly userEmail: string;

  @IsString()
  @Matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, {
    message: PHONE_NUMRER_VALIDATION,
  })
  readonly userPhoneNumber: string;
}
