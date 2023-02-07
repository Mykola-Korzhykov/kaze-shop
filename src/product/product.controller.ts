import {
  Body,
  CacheInterceptor,
  Controller,
  Delete,
  FileTypeValidator,
  HttpCode,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseFilePipeBuilder,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFiles,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ThrottlerBehindProxyGuard } from '../common/guards/throttler-behind-proxy.guard';
import { ApiErrorExceptionFilter } from '../common/filters/error-handler.filter';
import { CreateProductDto } from './dto/create.product.dto';
import { Throttle } from '@nestjs/throttler';
import { ProductService } from './product.service';
import { Roles } from '../common/decorators/roles-auth.decorator';
import { AddContentGuard } from '../common/guards/add-content.guard';
import { AuthFerfershGuard } from '../common/guards/jw-refresh.guard';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { OwnerAdminGuard } from '../common/guards/owner-admin.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { destination, fileFilter, fileName } from './file-upload.config';
import { UpdateProductDto } from './dto/update.product.dto';
import { Type } from '../common/decorators/user-type.decorator';
import { UserId } from '../common/decorators/user.id.decorator';
import { ApiExceptionFilter } from '../common/filters/api-exception.filter';
@UseGuards(ThrottlerBehindProxyGuard)
@UseFilters(ApiErrorExceptionFilter, ApiExceptionFilter)
@UseInterceptors(CacheInterceptor)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Throttle(70, 700)
  @Post('create_product')
  // @Roles('OWNER', 'ADMIN')
  // @UseGuards(JwtAuthGuard, RolesGuard, OwnerAdminGuard, AuthFerfershGuard, AddContentGuard)
  @HttpCode(201)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'images', maxCount: 20 },
      { name: 'sizeChartImage', maxCount: 1 },
    ], {
      // fileFilter: fileFilter,
      storage: diskStorage({
        destination: destination,
        filename: fileName,
      })
    }), 
  )
  createProduct(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles()
    files: {
      images?: Express.Multer.File[];
      sizeChartImage?: Express.Multer.File[];
    },
    @UserId('USER-ID') userId: number,
    @Type('REFRESHTOKEN') type: 'OWNER' | 'ADMIN' | null,
  ) {
    try {
      return this.productService.createProduct(createProductDto, userId, type, files.images, files.sizeChartImage);
    } catch (error: unknown) {
      throw error;
    }
  }

  @Throttle(70, 700)
  @Patch('update_product')
  // @Roles('OWNER', 'ADMIN')
  // @UseGuards(JwtAuthGuard, RolesGuard, OwnerAdminGuard, AuthFerfershGuard, EditContentGuard)
  @HttpCode(202)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'images', maxCount: 20 },
      { name: 'sizeChartImage', maxCount: 1 },
    ], {
      fileFilter: fileFilter,
      storage: diskStorage({
        destination: destination,
        filename: fileName,
      })
    }), 
  )
  updateProduct(
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4  }),
          new FileTypeValidator({ fileType: /\.(jpg|jpeg|png|gif)$/ }),
        ],
      }),
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /\.(jpg|jpeg|png|gif)$/,
        })
        .addMaxSizeValidator({
          maxSize: 1024 * 1024 * 4 ,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    files: {
      images?: Express.Multer.File[];
      sizeChartImage?: Express.Multer.File[];
    },
  ) {
    try {
      return this.productService.updateProduct(updateProductDto, files.images, files.sizeChartImage);
    } catch (err: unknown) {
      throw err;
    }
  }

  @Throttle(70, 700)
  @Delete('delete_product/:productId')
  // @Roles('OWNER', 'ADMIN')
  // @UseGuards(JwtAuthGuard, RolesGuard, OwnerAdminGuard, AuthFerfershGuard, EditContentGuard)
  @HttpCode(202)
  deleteProduct(@Param('productId', ParseIntPipe) productId: number) {
    try {
      return this.productService.deleteProduct(productId);
    } catch (err: unknown) {
      throw err;
    }
  }

  @Throttle(70, 700)
  @Delete('delete_file/:filePath')
  // @Roles('OWNER', 'ADMIN')
  // @UseGuards(JwtAuthGuard, RolesGuard, OwnerAdminGuard, AuthFerfershGuard, EditContentGuard)
  @HttpCode(200)
  deleteFile(@Param('filePath') filePath: string) {
    try {

    } catch (err: unknown) {
      throw err;
    }
  }
}
