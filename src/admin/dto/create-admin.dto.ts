import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsString, IsUUID, Matches } from 'class-validator';
import {
  EMAIL_VALIDATION,
  PHONENUMBER_VALIDATION,
  ADMINNAME_VALIDATION,
} from '../constants/admin.constants';

export class CreateAdminDto {
  @ApiProperty({ example: 'Alex', description: 'admin`s name' })
  @IsString()
  @Matches(/[a-zA-Z0-9_-]{2,20}/, {
    message: ADMINNAME_VALIDATION,
  })
  readonly name: string;

  @ApiProperty({ example: 'Casler', description: 'admin`s name' })
  @IsString()
  @Matches(/[a-zA-Z0-9_-]{2,20}/, {
    message: ADMINNAME_VALIDATION,
  })
  readonly surname: string;

  @ApiProperty({
    example: '+251912345678',
    description: 'admin`s phone number',
  })
  @IsString()
  @Matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, {
    message: PHONENUMBER_VALIDATION,
  })
  readonly phoneNumber: string;

  @ApiProperty({ example: 'user@gmail.com', description: 'admin`s email' })
  @IsString()
  @IsEmail()
  @Matches(/^[a-z0-9]+@[a-z]+\.[a-z]{2,64}$/, {
    message: EMAIL_VALIDATION,
  })
  readonly email: string;

  @ApiProperty({
    example: 'etrhg45ty5yeewt4t4665y',
    description: 'admin`s password',
  })
  @IsString()
  readonly password: string;

  @ApiProperty({
    example: 'etrhg45ty5yeewt4t4665yупвіяпвкірніп',
    description: 'admin`s activation link',
  })
  @IsUUID(4)
  readonly activationLink: string;

  @ApiProperty({
    example: 'False',
    description: 'Right to edit website',
  })
  @IsBoolean()
  readonly editWebSite: boolean;

  @ApiProperty({
    example: 'False',
    description: 'Right to add content',
  })
  @IsBoolean()
  readonly addContent: boolean;

  @ApiProperty({
    example: 'False',
    description: 'Right to edit content',
  })
  @IsBoolean()
  readonly editContent: boolean;

  @ApiProperty({
    example: 'False',
    description: 'is user Admin',
  })
  @IsBoolean()
  readonly isAdmin: boolean;
}
