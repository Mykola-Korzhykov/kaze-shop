import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Matches, IsString } from 'class-validator';
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from '../auth.constants';

export class LoginDto {
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
    // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    /(?=.*[0-9])(?=.*[a-z])[0-9a-zA-Z!@#.$%^&*]{8,}/g,
    {
      message: PASSWORD_VALIDATION,
    },
  )
  readonly password: string;
}
