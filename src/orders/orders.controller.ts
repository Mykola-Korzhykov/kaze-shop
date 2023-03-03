import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  Next,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { NextFunction, Request, Response } from 'express';
import { ThrottlerBehindProxyGuard } from '../common/guards/throttler-behind-proxy.guard';
import { ApiExceptionFilter } from '../common/filters/api-exception.filter';
import { ApiErrorExceptionFilter } from '../common/filters/error-handler.filter';
import { CreateOrderDto } from './dto/create.order.dto';
import { ContinueOrderDto } from './dto/continue.order.dto';
@UseGuards(ThrottlerBehindProxyGuard)
@UseFilters(ApiErrorExceptionFilter, ApiExceptionFilter)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('orders')
export class OrdersController {
  @Throttle(20, 500)
  @Post('create_order')
  @HttpCode(200)
  createOrder(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
    @Query('catdId', ParseIntPipe) cartId: number,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    (async () => {
      return console.log(request, response, next, cartId, createOrderDto);
    })();
  }

  @Throttle(20, 500)
  @HttpCode(201)
  @Put('continue_order')
  continueOrder(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
    @Body() continueOrderDto: ContinueOrderDto,
  ) {
    (async () => {
      return console.log(request, response, next, continueOrderDto);
    })();
  }

  @Throttle(20, 500)
  @HttpCode(201)
  @Post('verify_order')
  verifyOrder(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ) {
    (async () => {
      return console.log(request, response, next);
    })();
  }
}
