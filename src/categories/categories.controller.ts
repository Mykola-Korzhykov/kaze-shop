import {
  Body,
  CacheInterceptor,
  CacheTTL,
  CACHE_MANAGER,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Put,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { Roles } from '../common/decorators/roles-auth.decorator';
import { AddContentGuard } from '../common/guards/add-content.guard';
import { AuthFerfershGuard } from '../common/guards/jw-refresh.guard';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { OwnerAdminGuard } from '../common/guards/owner-admin.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { ThrottlerBehindProxyGuard } from '../common/guards/throttler-behind-proxy.guard';
import { ApiErrorExceptionFilter } from '../common/filters/error-handler.filter';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create.category.dto';
import { Category } from './models/category.model';
import { ApiExceptionFilter } from '../common/filters/api-exception.filter';
import { ReturnedCategory } from '../core/interfaces/product.interfaces';
@UseGuards(ThrottlerBehindProxyGuard)
@UseFilters(ApiErrorExceptionFilter, ApiExceptionFilter)
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(CacheInterceptor)
@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
  ) {}

  @Throttle(700, 7000)
  @CacheTTL(200)
  @Get('get_categoties')
  getCategories(): Promise<ReturnedCategory[]> {
    return this.categoriesService.getCategories();
  }

  @Throttle(70, 700)
  @ApiOperation({ summary: 'Creating Categories' })
  @ApiResponse({ status: 201, type: Category })
  @HttpCode(201)
  @Roles('OWNER', 'ADMIN')
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
    OwnerAdminGuard,
    AuthFerfershGuard,
    AddContentGuard,
  )
  @Put('create_category')
  createCategory(
    @Body() categoryDto: CreateCategoryDto
  ): Promise<ReturnedCategory>{
    return this.categoriesService.createCategory(categoryDto);
  }


  @Throttle(70, 700)
  @ApiOperation({ summary: 'Creating Categories' })
  @ApiResponse({ status: 201, type: Category })
  @HttpCode(201)
  @Roles('OWNER', 'ADMIN')
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
    OwnerAdminGuard,
    AuthFerfershGuard,
    AddContentGuard,
  )
  @Patch('update_category/:categoryId')
  updateCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Body() categoryDto: CreateCategoryDto
  ): Promise<ReturnedCategory>{
    return this.categoriesService.updateCategory(categoryId, categoryDto);
  }


  @Throttle(70, 700)
  @HttpCode(200)
  @Roles('OWNER', 'ADMIN')
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
    OwnerAdminGuard,
    AuthFerfershGuard,
    AddContentGuard,
  )
  @Delete('delete_category/:categoryId')
  deleteCategory(@Param('categoryId', ParseIntPipe) categoryId: number): Promise<number> {
    return this.categoriesService.deleteCategory(categoryId);
  }
}
