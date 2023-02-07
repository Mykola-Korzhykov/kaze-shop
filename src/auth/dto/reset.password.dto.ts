import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  IsNumber,
  MinLength,
} from 'class-validator';
import { Match } from '../../common/decorators/match.decorator';
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from '../auth.constants';

export class ResetDto {
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

  @ApiProperty({ example: '46756868', description: 'user`s code' })
  @MinLength(8)
  @IsString()
  readonly code: string;

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

  @ApiProperty({
    example: 'etrhg45ty5yeewt4t4665y',
    description: 'user`s confirm password',
  })
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message: PASSWORD_VALIDATION,
    },
  )
  @Match('password')
  readonly confirmPassword: string;
}
