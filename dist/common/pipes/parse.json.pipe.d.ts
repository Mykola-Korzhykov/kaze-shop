import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class ParseJsonPipe implements PipeTransform<string, Record<string, any>> {
    transform(value: string, metadata: ArgumentMetadata): Record<string, any>;
    static transform(value: string, metadata: ArgumentMetadata): Record<string, any>;
}
