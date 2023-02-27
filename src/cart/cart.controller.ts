import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Next,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  Res,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { NextFunction, Request, Response } from 'express';
import { Roles } from '../common/decorators/roles-auth.decorator';
import { CartGuard } from '../common/guards/cart.guard';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { ThrottlerBehindProxyGuard } from '../common/guards/throttler-behind-proxy.guard';
import { ApiExceptionFilter } from '../common/filters/api-exception.filter';
import { ApiErrorExceptionFilter } from '../common/filters/error-handler.filter';
import { CartService } from './cart.service';
import { AddProductDto } from './dto/add-product.dto';
@UseGuards(ThrottlerBehindProxyGuard)
@UseFilters(ApiErrorExceptionFilter, ApiExceptionFilter)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('cart')
export class CartController {
  constructor(private readonly cardService: CartService) {}

  @Throttle(20, 500)
  @Get('set-cart')
  @HttpCode(201)
  setCart(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ) {
    (async () => {
      return this.cardService.setCart(request, response, next);
    })();
  }

  @Throttle(55, 550)
  @Get('/')
  @Roles('ADMIN', 'USER', 'OWNER')
  @UseGuards(CartGuard)
  getCart(
    @Res() response: Response,
    @Req() request: Request,
    @Next() next: NextFunction,
  ) {
    (async () => {
      return this.cardService.getCart(response, request, next);
    })();
  }

  @Throttle(55, 550)
  @Roles('ADMIN', 'USER', 'OWNER')
  @UseGuards(CartGuard)
  @Post('addProduct/:productId')
  addProduct(
    @Res() response: Response,
    @Req() request: Request,
    @Next() next: NextFunction,
    @Param('productId', ParseIntPipe) productId: number,
    @Body() addProdcut: AddProductDto,
  ) {
    (async () => {
      return this.cardService.addProductToCart(
        request,
        response,
        next,
        productId,
        addProdcut,
      );
    })();
  }

  @Throttle(55, 550)
  @Roles('ADMIN', 'USER', 'OWNER')
  @UseGuards(CartGuard)
  @Put('clear')
  clearCart(
    @Res() response: Response,
    @Req() request: Request,
    @Next() next: NextFunction,
  ) {
    (async () => {
      return this.cardService.clearCart(request, response, next);
    })();
  }

  @Throttle(55, 550)
  @Roles('ADMIN', 'USER', 'OWNER')
  @UseGuards(CartGuard)
  @Delete('deleteProduct/:cartProductId')
  deleteProduct(
    @Res() response: Response,
    @Req() request: Request,
    @Next() next: NextFunction,
    @Param('cartProductId', ParseIntPipe) cartProductId: number,
  ) {
    (async () => {
      return this.cardService.deleteProductFromCart(
        request,
        response,
        next,
        cartProductId,
      );
    })();
  }

  @Throttle(55, 550)
  @Roles('ADMIN', 'USER', 'OWNER')
  @UseGuards(JwtAuthGuard, RolesGuard, CartGuard)
  @Get('/leftCarts')
  getLeftCarts(
    @Res() response: Response,
    @Req() request: Request,
    @Next() next: NextFunction,
  ) {
    (async () => {
      return this.cardService.getLeftCarts(response, request, next);
    })();
  }
}
