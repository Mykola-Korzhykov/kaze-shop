import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsUUID, Matches } from 'class-validator';
import {
  EMAIL_VALIDATION,
  PASSWORD_VALIDATION,
  PHONENUMBER_VALIDATION,
  OWNERNAME_VALIDATION,
} from '../constants/owner.constants';

export class CreateOwnerDto {
  @ApiProperty({ example: 'Alex', description: 'owner`s name' })
  @IsString()
  @Matches(/[a-zA-Z0-9_-]{2,20}/, {
    message: OWNERNAME_VALIDATION,
  })
  readonly name: string;

  @ApiProperty({ example: 'Casler', description: 'owner`s name' })
  @IsString()
  @Matches(/[a-zA-Z0-9_-]{2,20}/, {
    message: OWNERNAME_VALIDATION,
  })
  readonly surname: string;

  @ApiProperty({
    example: '+251912345678',
    description: 'owner`s phone number',
  })
  @IsString()
  @Matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, {
    message: PHONENUMBER_VALIDATION,
  })
  readonly phoneNumber: string;

  @ApiProperty({ example: 'user@gmail.com', description: 'owner`s email' })
  @IsString()
  @IsEmail()
  @Matches(/^[a-z0-9]+@[a-z]+\.[a-z]{2,64}$/, {
    message: EMAIL_VALIDATION,
  })
  readonly email: string;

  @ApiProperty({
    example: 'etrhg45ty5yeewt4t4665y',
    description: 'owner`s password',
  })
  @IsString()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{6,64}$/gm, {
    message: PASSWORD_VALIDATION,
  })
  readonly password: string;

  @ApiProperty({
    example: 'etrhg45ty5yeewt4t4665yупвіяпвкірніп',
    description: 'owner`s activation link',
  })
  @IsUUID(4)
  readonly activationLink: string;

  @ApiProperty({
    example:
      // tslint:disable-next-line: max-line-length
      'Mozilla/5.0 (Windows NT 7.0; Win32; x32) AppleWebKit/523.34 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/523.34',
    description: 'owner`s agent',
  })
  @IsString()
  readonly ownerAgent: string;
}
