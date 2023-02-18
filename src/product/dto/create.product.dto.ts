import { Transform, Type } from 'class-transformer';
import { IsString, IsNumber, IsDefined, Matches, ArrayNotEmpty, IsArray, MaxLength} from 'class-validator';
import { ParseFormDataJsonPipe } from '../../common/pipes/formdata.pipe';
import { ParseJsonPipe } from '../../common/pipes/parse.json.pipe';
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
export class CreateProductDto {
  @IsDefined()
  @Type(() => Nested)
  readonly title: {
    ua: string;
    ru: string;
    rs: string;
    en: string;
  };

  @IsDefined()
  @Type(() => Nested)
  readonly description: {
    ua: string;
    ru: string;
    rs: string;
    en: string;
  };

  @IsDefined()
  @Type(()=> Number)
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
  @Type(() => Array<string>)
  // @Transform((value) => JSON.parse(value.value))
  // @IsArray()
  // @ArrayNotEmpty()
  // @IsString({ each: true }) 
  // @MaxLength(15, { each: true })
  readonly colours: string[];

  @IsDefined()
  @Transform((value: any) => Number(value.value))
  @Type(()=> Number)
  @IsNumber()
  readonly quantity: number;

  @IsDefined()
  @Type(() => Array<number>)
  // @Transform((value) => JSON.parse(value.value))
  // @IsArray()
  // @ArrayNotEmpty()
  readonly categories: number[];
}
