import {
  Body,
  CacheInterceptor,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Next,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  Req,
  Res,
  UploadedFiles,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
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
import path, { extname } from 'path';
import { UpdateProductDto } from './dto/update.product.dto';
import { Type } from '../common/decorators/user-type.decorator';
import { UserId } from '../common/decorators/user.id.decorator';
import { ApiExceptionFilter } from '../common/filters/api-exception.filter';
import { existsSync, mkdirSync } from 'fs';
import { v4 } from 'uuid';
import { EditContentGuard } from '../common/guards/edit-content.guard';
import { ReturnedProduct, ReturnedProducts } from '../core/interfaces/product.interfaces';
import { ParseFormDataJsonPipe } from '../common/pipes/formdata.pipe';
import { UserGuard } from 'src/common/guards/user.guard';
import { QueryFilterDto } from './dto/query-filter.dto';
@UseGuards(ThrottlerBehindProxyGuard)
@UseFilters(ApiErrorExceptionFilter, ApiExceptionFilter)
@UseInterceptors(CacheInterceptor, ClassSerializerInterceptor)
@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
  ) {}
  
  @Throttle(70, 700)
  @Get('/')
  getProducts(
    @Res() response: Response,
    @Req() request: Request,
    @Next() next: NextFunction,
    @Query('page', ParseIntPipe) page: number,
    @Query('pageSize', ParseIntPipe) pageSize: number,
  ) {
    (async () => {
      try {
        return this.productService.getProducts(request, response, page, pageSize);
      } catch (err: unknown) {
        return next(err);
      }
    })();
  }

  @Throttle(70, 700)
  @Get('get')
  getProductsByIds(
    @Res() response: Response,
    @Req() request: Request,
    @Next() next: NextFunction,
    @Query('page', ParseIntPipe) page: number,
    @Query('pageSize', ParseIntPipe) pageSize: number,
    @Query('productIds', ParseArrayPipe) productIds: number[],
  ) {
    (async () => {
      try {
        return this.productService.getProductsByIds(request, response, productIds, page, pageSize);
      } catch (err: unknown) {
        return next(err);
      }
    })();
  }

  @Throttle(70, 700)
  @UsePipes(ValidationPipe)
  @Get('filter')
  filterProducts(
    @Res() response: Response,
    @Req() request: Request,
    @Next() next: NextFunction,
    @Query() queryFilterDto: QueryFilterDto,
  ) {
    (async () => {
      try {
        return this.productService.filterProducts(request, response, queryFilterDto);
      } catch (err: unknown) {
        return next(err);
      }
    })();
  }    

  @Throttle(70, 700)
  @Get('/:productId')
  getById(
    @Res() response: Response,
    @Req() request: Request,
    @Next() next: NextFunction,
    @Param('productId', ParseIntPipe) productId: number
  ) {
    (async () => {
      try {
        return this.productService.getProductById(request, response, productId);
      } catch (err: unknown) {
        return next(err);
      }
    })();
  }

  @Throttle(70, 700)
  @Roles('USER')
  @UseGuards(JwtAuthGuard, RolesGuard, UserGuard)
  @Get('bookmarkProducts')
  getBookmarkProducts(
    @Res() response: Response,
    @Req() request: Request,
    @Next() next: NextFunction,
    @Query('page', ParseIntPipe) page: number,
    @Query('pageSize', ParseIntPipe) pageSize: number,
    @UserId('USER-ID') userId: number,
  ) {
    (async () => {
    try {
      return this.productService.getBookmarks(request, response, page, pageSize, userId);
    } catch (err: unknown) {
        return next(err);
      }
    })();
  }

  @Throttle(70, 700)
  @Roles('USER')
  @UseGuards(JwtAuthGuard, RolesGuard, UserGuard)
  @Get('watchedProducts')
  getWatchedProducts(
    @Res() response: Response,
    @Req() request: Request,
    @Next() next: NextFunction,
    @Query('page', ParseIntPipe) page: number,
    @Query('pageSize', ParseIntPipe) pageSize: number,
    @UserId('USER-ID') userId: number,
  ) {
    (async () => {
      try {
        return this.productService.getWatchedProducts(request, response, page, pageSize, userId);
      } catch (err: unknown) {
        return next(err);
      }
    })();
  }

  @Throttle(70, 700)
  @Roles('USER')
  @UseGuards(JwtAuthGuard, RolesGuard, UserGuard)
  @Post('addWatchedProduct')
  addWatchedProduct(
    @Next() next: NextFunction,
    @Query('productId', ParseIntPipe) productId: number,
    @UserId('USER-ID') userId: number,
  ): void | Promise<number> {
    try {
      return this.productService.addWatchedProduct(productId, userId);
    } catch (err: unknown) {
      return next(err);
    }
  }

  @Throttle(70, 700)
  @Roles('USER')
  @UseGuards(JwtAuthGuard, RolesGuard, UserGuard)
  @Post('addBookmarkProduct')
  addBookmark(
    @Next() next: NextFunction,
    @Query('productId', ParseIntPipe) productId: number,
    @UserId('USER-ID') userId: number,
  ): void | Promise<number> {
    try {
      return this.productService.addBookmarkProduct(productId, userId);
    } catch (err: unknown) {
      return next(err);
    }
  }

  @Throttle(70, 700)
  @Put('create_product')
  @Roles('OWNER', 'ADMIN')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(JwtAuthGuard, RolesGuard, OwnerAdminGuard, AuthFerfershGuard, AddContentGuard)
  @HttpCode(201)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'images', maxCount: 20 },
      { name: 'sizeChartImage', maxCount: 1 },
    ], {
      fileFilter: (
        req: Request,
        file: Express.Multer.File,
        callback: (error: Error, acceptFile: boolean) => void
      ) => {
        const filetypes = /jpeg|jpg|png|gif|svg/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
          return callback(null, true);
        } else {
          return callback(new Error('Only image files are allowed!'), false);
        }
      },
      storage: diskStorage({
        destination: (
          req, file: Express.Multer.File,
          callback: (error: Error, destination: string) => void
        ) => {
          if (!JSON.parse(req.body.title)?.en) {
            return callback(new Error('Invalid params!'), null);
          }
          const destination = path.join(
            __dirname, 'static', 'products', `${JSON.parse(req.body.title)?.en.split(' ').join('_')}`
          );
          const imagesPath = path.join(
            __dirname, 'static', 'products', `${JSON.parse(req.body.title)?.en.split(' ').join('_')}`, file.fieldname
          );
          if (!existsSync(destination)) {
            mkdirSync(destination, { recursive: true });
          }
          if (!existsSync(imagesPath)) {
            mkdirSync(imagesPath, { recursive: true });
          }
          callback(null, imagesPath);
        },
        filename: (
          req, file: Express.Multer.File,
          callback: any,
        ) => {
          if (!JSON.parse(req.body.title)?.en) {
            return callback(new Error('Invalid params!'), null);
          }
          const name = file.originalname.split('.')[0];
          const ext = extname(file.originalname);
          const randomName = v4();
          callback(null, `${randomName}--${JSON.parse(req.body.title)?.en.split(' ').join('_')}--${name}${ext}`);
        },
      })
    }),
  )
  createProduct(
    @Body(new ParseFormDataJsonPipe({except: ['images', 'sizeChartImage']})) createProductDto: CreateProductDto,
    @UploadedFiles()
    files: {
      images?: Express.Multer.File[];
      sizeChartImage?: Express.Multer.File[];
    },
    @UserId('USER-ID') userId: number,
    @Type('REFRESHTOKEN') type: 'OWNER' | 'ADMIN' | null,
  ): Promise<ReturnedProduct> {
    try {
      return this.productService.createProduct(createProductDto, userId, type, files.images, files.sizeChartImage);
    } catch (error: unknown) {
      throw error;
    }
  }

  @Throttle(70, 700)
  @Patch('update_product/:productId')
  @Roles('OWNER', 'ADMIN')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(JwtAuthGuard, RolesGuard, OwnerAdminGuard, AuthFerfershGuard, EditContentGuard)
  @HttpCode(202)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'images', maxCount: 20 },
      { name: 'sizeChartImage', maxCount: 1 },
    ], {
      fileFilter: (
        req: Request,
        file: Express.Multer.File,
        callback: (error: Error, acceptFile: boolean) => void
      ) => {
        const filetypes = /jpeg|jpg|png|gif|svg/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
          return callback(null, true);
        } else {
          return callback(new Error('Only image files are allowed!'), false);
        }
      },
      storage: diskStorage({
        destination: (
          req, file: Express.Multer.File,
          callback: (error: Error, destination: string) => void
        ) => {
          if (!JSON.parse(req.body.title)?.en) {
            return callback(new Error('Invalid params!'), null);
          }
          const destination = path.join(
            __dirname, 'static', 'products', `${JSON.parse(req.body.title)?.en.split(' ').join('_')}`
          );
          const imagesPath = path.join(
            __dirname, 'static', 'products', `${JSON.parse(req.body.title)?.en.split(' ').join('_')}`, file.fieldname
          );
          if (!existsSync(destination)) {
            mkdirSync(destination, { recursive: true });
          }
          if (!existsSync(imagesPath)) {
            mkdirSync(imagesPath, { recursive: true });
          }
          callback(null, imagesPath);
        },
        filename: (
          req, file: Express.Multer.File,
          callback: any,
        ) => {
          if (!JSON.parse(req.body.title)?.en) {
            return callback(new Error('Invalid params!'), null);
          }
          const name = file.originalname.split('.')[0];
          const ext = extname(file.originalname);
          const randomName = v4();
          callback(null, `${randomName}--${JSON.parse(req.body.title)?.en.split(' ').join('_')}--${name}${ext}`);
        },
      })
    }),
  )
  updateProduct(
    @Body(new ParseFormDataJsonPipe({except: ['images', 'sizeChartImage']})) updateProductDto: UpdateProductDto,
    @Param('productId', ParseIntPipe) productId: number,
    @UserId('USER-ID') userId: number,
    @Type('REFRESHTOKEN') type: 'OWNER' | 'ADMIN' | null,
    @UploadedFiles()
    files: {
      images?: Express.Multer.File[];
      sizeChartImage?: Express.Multer.File[];
    },
  ): Promise<ReturnedProduct> {
    try {
      return this.productService.updateProduct(
        updateProductDto,
        productId,
        userId,
        type,
        files.images,
        files.sizeChartImage
      );
    } catch (err: unknown) {
      throw err;
    }
  }

  @Throttle(70, 700)
  @Delete('delete_product/:productId')
  @Roles('OWNER', 'ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard, OwnerAdminGuard, AuthFerfershGuard, EditContentGuard)
  @HttpCode(202)
  deleteProduct(
    @Param('productId', ParseIntPipe) productId: number
  ): Promise<number> {
    try {
      return this.productService.deleteProduct(productId);
    } catch (err: unknown) {
      throw err;
    }
  }

  @Throttle(70, 700)
  @Delete('delete_image')
  @Roles('OWNER', 'ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard, OwnerAdminGuard, AuthFerfershGuard, EditContentGuard)
  @HttpCode(200)
  deleteFile(
    @Query('filePath') filePath: string,
  ): Promise<string> {
      return this.productService.deleteImage(filePath);
  }
}
