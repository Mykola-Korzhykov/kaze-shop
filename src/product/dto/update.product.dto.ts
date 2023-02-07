import { IsArray, IsNumber, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsNumber()
  price: number;
  @IsArray()
  sizes: string[];
  @IsArray()
  colours: string[];
  @IsNumber()
  quantity: number;
  @IsArray()
  categories: string[];
}
