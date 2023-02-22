import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @Matches(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/)
  ua: string;

  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @Matches(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/)
  ru: string;

  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @Matches(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/)
  rs: string;

  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @Matches(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/)
  en: string;
}
