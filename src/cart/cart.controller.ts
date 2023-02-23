import {
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UseFilters,
} from '@nestjs/common';
import { ApiExceptionFilter } from '../common/filters/api-exception.filter';
import { ApiErrorExceptionFilter } from '../common/filters/error-handler.filter';
@UseFilters(ApiErrorExceptionFilter, ApiExceptionFilter)
@Controller('card')
export class CardController {
  @Post('add/:productId')
  addProduct(@Param('productId', ParseIntPipe) productId: number) {
    console.log(productId);
  }
}
