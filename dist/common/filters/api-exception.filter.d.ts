import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { ApiException } from '../exceptions/api.exception';
export declare class ApiExceptionFilter implements ExceptionFilter {
    catch(exception: ApiException, host: ArgumentsHost): void;
}
