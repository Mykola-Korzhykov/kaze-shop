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
import { EMAIL_VALIDATION } from '../constants/owner.constants';

export class CreateOwnerRefreshTokenDto {
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @IsNumber()
  readonly ownerId: number;

  @ApiProperty({
    example: 'True',
    description: 'Is owner activated',
  })
  @IsBoolean()
  readonly isActivated: boolean;

  @ApiProperty({ example: 'owner@gmail.com', description: 'owner`s email' })
  @IsString()
  @IsEmail()
  @Matches(/^[a-z0-9]+@[a-z]+\.[a-z]{2,64}$/, {
    message: EMAIL_VALIDATION,
  })
  readonly email: string;

  @ApiProperty({
    example:
      // tslint:disable-next-line: max-line-length
      'Mozilla/5.0 (Windows NT 7.0; Win32; x32) AppleWebKit/523.34 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/523.34',
    description: 'owner`s agent',
  })
  @IsString()
  readonly ownerAgent: string;

  @ApiProperty({
    example: '[User, Admin]',
    description: 'roles of User',
  })
  @IsArray()
  readonly roles: Role[];
}
