import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  EMAIL_VALIDATION,
  PASSWORD_VALIDATION,
  PHONE_NUMRER_VALIDATION,
  SURNAME_VALIDATION,
  USERNAME_VALIDATION,
} from '../constants/user.constants';

export class CreateUserDto {
  @ApiProperty({ example: 'Alex', description: 'user`s name' })
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @Matches(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/, {
    message: USERNAME_VALIDATION,
  })
  readonly name: string;

  @ApiProperty({ example: 'Cusler', description: 'user`s surname' })
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @Matches(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/, {
    message: SURNAME_VALIDATION,
  })
  readonly surname: string;

  @ApiProperty({ example: '+381056733', description: 'user phone number' })
  @IsString()
  @IsEmail()
  @Matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, {
    message: PHONE_NUMRER_VALIDATION,
  })
  readonly phoneNumber: string;

  @ApiProperty({ example: 'user@gmail.com', description: 'user`s email' })
  @IsString()
  @IsEmail()
  @Matches(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    {
      message: EMAIL_VALIDATION,
    },
  )
  readonly email: string;

  @ApiProperty({
    example: 'etrhg45ty5yeewt4t4665y',
    description: 'user`s password',
  })
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message: PASSWORD_VALIDATION,
    },
  )
  readonly password: string;
}
