import {
  CacheInterceptor,
  CacheTTL,
  CACHE_MANAGER,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  ParseIntPipe,
  Put,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { Roles } from 'src/common/decorators/roles-auth.decorator';
import { AddContentGuard } from 'src/common/guards/add-content.guard';
import { AuthFerfershGuard } from 'src/common/guards/jw-refresh.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { OwnerAdminGuard } from 'src/common/guards/owner-admin.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { ThrottlerBehindProxyGuard } from '../common/guards/throttler-behind-proxy.guard';
import { ApiErrorExceptionFilter } from '../common/filters/error-handler.filter';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create.category.dto';
import { Category } from './models/category.model';
import { ApiExceptionFilter } from '../common/filters/api-exception.filter';
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
  getCategories(): Promise<
    {
      title: string;
      description: string;
      createdAt: any;
      updatedAt: any;
    }[]
  > {
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
  createCategory(categoryDto: CreateCategoryDto): Promise<{
    title: string;
    description: string;
  }> {
    return this.categoriesService.createCategory(categoryDto);
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
  deleteCategory(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.categoriesService.deleteCategory(categoryId);
  }
}
