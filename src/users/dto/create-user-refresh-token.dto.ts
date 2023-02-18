import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  IsBoolean,
  IsNumber,
  IsArray,
} from 'class-validator';
import { Role } from '../../roles/models/roles.model';
import { EMAIL_VALIDATION } from '../constants/user.constants';

export class CreateUserRefreshTokenDto {
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @IsNumber()
  readonly userId: number;

  @ApiProperty({
    example: 'True',
    description: 'Is user activated',
  })
  @IsBoolean()
  readonly isActivated: boolean;

  @ApiProperty({
    example: '[User, Admin]',
    description: 'roles of User',
  })
  @IsArray()
  readonly roles: Role[];

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
}
