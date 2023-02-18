import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import {
  USERNAME_VALIDATION,
  SURNAME_VALIDATION,
} from '../constants/user.constants';

export class UpdateUserDto {
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

  @ApiProperty({
    example: 'Lviv',
    description: 'city',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  readonly city: string;

  @ApiProperty({
    example: 'Ukraine',
    description: 'country',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  readonly country: string;

  @ApiProperty({
    example: 'Lviv',
    description: 'postOffice',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  readonly postOffice: string;
}
