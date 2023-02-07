import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class AddRoleDto {
  @ApiProperty({ example: 'User role', description: 'some value' })
  @IsString()
  readonly value: string;

  @ApiProperty({ example: '1', description: 'unique identifier' })
  @IsNumber()
  readonly userId: number;
}
