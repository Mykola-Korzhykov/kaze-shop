import { ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
export declare class AllExceptionsFilter implements ExceptionFilter {
    private readonly httpAdapterHost;
    constructor(httpAdapterHost: HttpAdapterHost);
    catch(exception: HttpException, host: ArgumentsHost): void;
}
