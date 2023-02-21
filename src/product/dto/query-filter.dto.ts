import { Type } from 'class-transformer';
import { IsDefined, IsNumber, IsOptional, IsString } from 'class-validator';

export class QueryFilterDto {
    @IsDefined()
    @Type(() => Number)
    readonly page: number = 1;

    @IsDefined()
    @Type(() => Number)
    @IsNumber()
    readonly pageSize: number = 5;

    @IsOptional()
    @IsString()
    readonly order?: 'ASC' | 'DESC' | undefined;

    @IsOptional()
    @Type(() => Array<string>)
    @IsString({ each: true })
    readonly sizes?: string[] | undefined;

    @IsOptional()
    @Type(() => Array<string>)
    @IsString({ each: true })
    readonly colours?: string[] | undefined;

    @IsOptional()
    @Type(() => Array<number>)
    readonly categories?: number[] | undefined;
}
