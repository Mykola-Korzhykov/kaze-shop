import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
type TParseFormDataJsonOptions = {
    except?: string[];
};
export declare class ParseFormDataJsonPipe implements PipeTransform {
    private options?;
    constructor(options?: TParseFormDataJsonOptions);
    transform(value: any, _metadata: ArgumentMetadata): any;
}
export {};
