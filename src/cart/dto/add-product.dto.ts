import { IsNumber, IsString } from 'class-validator';

export class AddProductDto {
  @IsString()
  imageUrl: string;
  @IsString()
  size: string;
  @IsNumber()
  colorId: number;
}
