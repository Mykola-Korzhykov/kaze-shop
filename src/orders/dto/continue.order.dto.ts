import {
  IsString,
  MinLength,
  MaxLength,
  IsDate,
  IsOptional,
  IsDefined,
  IsBoolean,
} from 'class-validator';

export class ContinueOrderDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  readonly city: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  readonly country: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  readonly postOffice: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(250)
  readonly comment?: string;

  @IsOptional()
  @IsDate()
  @MinLength(2)
  @MaxLength(250)
  readonly sendDate?: Date;

  @IsDefined()
  @IsBoolean()
  readonly payByCard: boolean;

  @IsDefined()
  @IsBoolean()
  readonly payInCash: boolean;
}
