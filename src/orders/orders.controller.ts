import {
  ClassSerializerInterceptor,
  Controller,
  Next,
  Post,
  Req,
  Res,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { NextFunction } from 'express';
import { ThrottlerBehindProxyGuard } from '../common/guards/throttler-behind-proxy.guard';
import { ApiExceptionFilter } from '../common/filters/api-exception.filter';
import { ApiErrorExceptionFilter } from '../common/filters/error-handler.filter';
@UseGuards(ThrottlerBehindProxyGuard)
@UseFilters(ApiErrorExceptionFilter, ApiExceptionFilter)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('orders')
export class OrdersController {
  @Throttle(20, 500)
  @Post('create/checkout')
  createCheckout(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ) {
    (async () => {
      return console.log(request, response, next);
    })();
  }
}
