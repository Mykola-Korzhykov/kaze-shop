import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  IsBoolean,
  IsNumber,
  IsUUID,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';
import { Role } from '../../roles/models/roles.model';
import { EMAIL_VALIDATION } from '../auth.constants';

export class CreateAccessTokenDto {
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @IsNumber()
  readonly userId: number;

  @ApiProperty({
    example: 'True',
    description: 'Is user activated',
  })
  @IsBoolean()
  readonly isUserActivated?: boolean;

  @ApiProperty({
    example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    description: 'user`s activation link',
  })
  @IsUUID(4)
  readonly userActivationLink?: string;

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

  @ApiProperty({ example: 'USER', description: 'user`s roles' })
  @IsArray()
  @ArrayNotEmpty()
  readonly roles?: Role[];
}
