import { IsString, MinLength, MaxLength } from 'class-validator';

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

  @IsString()
  @MinLength(2)
  @MaxLength(250)
  readonly comment?: string;
}
