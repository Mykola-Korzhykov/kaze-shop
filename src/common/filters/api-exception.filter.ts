
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiException } from '../exceptions/api.exception';

@Catch(ApiException)
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception: ApiException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.status || 500;
    response.status(status).send({
        success: false,
        message: exception.message,
        rawErrors: exception.errors,
        stack:
            exception.stack.toString().split(' ')[0] +
            exception.stack.toString().split(' ')[1],
        timestamp: new Date().toISOString(),
        path: request.url,
    });
  }
}