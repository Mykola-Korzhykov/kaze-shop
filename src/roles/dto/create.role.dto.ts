import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'user`s role' })
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @Matches(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/)
  readonly value: string;
  @ApiProperty({ example: 'Admin', description: 'Role`s description' })
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @Matches(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/)
  readonly description: string;
}
