import { IsString, IsDefined, Matches, } from 'class-validator';

export class CreateReviewDto {
  @IsDefined()
  @Matches(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-яzžitisšte_-]/gi)
  @IsString()
  readonly name: string;

  @IsDefined()
  @Matches(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-яzžitisšte_-]/gi)
  @IsString()
  readonly surname: string;

  @IsDefined()
  @Matches(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-яzžitisšte_-]/gi)
  @IsString()
  readonly review: string;
}