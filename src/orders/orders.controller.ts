import { Controller, UseFilters } from '@nestjs/common';
import { ApiExceptionFilter } from '../common/filters/api-exception.filter';
import { ApiErrorExceptionFilter } from '../common/filters/error-handler.filter';
@UseFilters(ApiErrorExceptionFilter, ApiExceptionFilter)
@Controller('orders')
export class OrdersController {}
