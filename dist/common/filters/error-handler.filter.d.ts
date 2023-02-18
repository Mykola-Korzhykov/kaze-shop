import { BadRequestError } from '../exceptions/validate-dto.exception.error';
import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
export declare class ApiErrorExceptionFilter implements ExceptionFilter {
    catch(exception: BadRequestError, host: ArgumentsHost): void;
}
