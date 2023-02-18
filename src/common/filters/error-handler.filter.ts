import { BadRequestError } from '../exceptions/validate-dto.exception.error';
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(BadRequestError)
export class ApiErrorExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.statusCode || 500;
    response.status(status).send({
      success: false,
      message: exception.message,
      rawErrors: exception.rawErrors ?? [],
      stack:
        exception.stack.toString().split(' ')[0] +
        exception.stack.toString().split(' ')[1],
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
