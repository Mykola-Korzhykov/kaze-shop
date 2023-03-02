import { Transform, Type } from 'class-transformer';
import { IsString, IsNumber, IsDefined, Matches } from 'class-validator';
class Nested {
  @IsDefined()
  @IsString()
  @Matches(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-яzžitisšte_-]/gi)
  ua: string;

  @IsDefined()
  @IsString()
  @Matches(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-яzžitisšte_-]/gi)
  ru: string;

  @IsDefined()
  @IsString()
  @Matches(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-яzžitisšte_-]/gi)
  rs: string;

  @IsDefined()
  @IsString()
  @Matches(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-яzžitisšte_-]/gi)
  en: string;
}

class Image {
  @IsDefined()
  @Type(() => Array<string>)
  fileNames: string[];

  @IsDefined()
  colourId: number;

  @IsDefined()
  @Type(() => Array<string>)
  sizes: string[];
}

export class CreateProductDto {
  @IsDefined()
  @Type(() => Nested)
  readonly title: Nested;

  @IsDefined()
  @Type(() => Nested)
  readonly description: Nested;

  @IsDefined()
  @Type(() => Number)
  @IsNumber()
  readonly price: number;

  @IsDefined()
  @Type(() => Array<string>)
  // @Transform((value) => ParseJsonPipe.transform(value.value, value.obj))
  // @IsArray()
  // @ArrayNotEmpty()
  // @IsString({ each: true })
  // @MaxLength(15, { each: true })
  readonly sizes: string[];

  @IsDefined()
  @Type(() => Array<number>)
  // @Transform((value) => JSON.parse(value.value))
  // @IsArray()
  // @ArrayNotEmpty()
  // @IsString({ each: true })
  // @MaxLength(15, { each: true })
  readonly colours: number[];

  @IsDefined()
  @Transform((value: any) => Number(value.value))
  @Type(() => Number)
  @IsNumber()
  readonly quantity: number;

  @IsDefined()
  @Type(() => Array<number>)
  // @Transform((value) => JSON.parse(value.value))
  // @IsArray()
  // @ArrayNotEmpty()
  readonly categories: number[];

  @IsDefined()
  @Type(() => Array<any>)
  readonly selectedImages: Image[];
}
