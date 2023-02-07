import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class BanUserDto {
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @IsNumber()
  readonly userId: number;

  @ApiProperty({ example: 'User is not valid!', description: 'some reason' })
  @IsString()
  readonly banReason: string;
}
