import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminModule } from './admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import { Admin } from './admin/models/admin.model';
import { AuthModule } from './auth/auth.module';
import { AppClusterService } from './core/services/cluster.service';
import { ThrottlerModule } from '@nestjs/throttler';
import path from 'path';
import { AdminRefreshToken } from './admin/models/admin.refresh.token.model';
import { MailModule } from './mail/mail.module';
import { CorsMiddleware } from './core/middlewares/cors.middleware';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionsFilter } from './core/filters/all-exceptions.filter';
import { GlobalInterceptor } from './core/interceptors/global.interceptor';
import { CoreModule } from './core/core.module';
import { ProductModule } from './product/product.module';
import { UsersModule } from './users/users.module';
import { OwnerModule } from './owner/owner.module';
import { OrdersModule } from './orders/orders.module';
import { CartModule } from './cart/cart.module';
import { Owner } from './owner/models/owner.model';
import { OwnerRefreshToken } from './owner/models/owner.refresh.token.model';
import { User } from './users/models/user.model';
import { UserRefreshToken } from './users/models/user.refresh.token.model';
import { Role } from './roles/models/roles.model';
import { UserRoles } from './roles/models/user.roles.model';
import { AppController } from './app.controller';
import { TelegramModule } from './telegram/telegram.module';
import { getTelegramConfig } from './telegram/telegram.config';
import { CategoriesColoursModule } from './categories&colours/categories&colours.module';
import { Product } from './product/models/product.model';
import { Category } from './categories&colours/models/category.model';
import { ProductCategories } from './categories&colours/models/product.categories.model';
import { CartProduct } from './cart/models/cart.product.model';
import { Cart } from './cart/models/cart.model';
import { Order } from './orders/models/order.model';
import { OrderProduct } from './orders/models/order.product.model';
import { MulterModule } from '@nestjs/platform-express';
import { BullModule } from '@nestjs/bull';
import { ReviewsModule } from './reviews/reviews.module';
import { Review } from './reviews/models/review.model';
import { ProductReviews } from './reviews/models/product.reviews.model';
import { BookmarksProducts } from './product/models/bookmark.products';
import { WatchedProducts } from './product/models/watched.products.model';
import { Currencies } from './owner/models/currencies.model';
import { HttpModule } from '@nestjs/axios';
import { LocationMiddleware } from './core/middlewares/location.middleware';
import { TasksService } from './core/services/scedule.service';
import { Colour } from './categories&colours/models/colours.model';
import { ProductColours } from './categories&colours/models/product.colour.model';
import { FilesService } from './core/services/file.service';
@Module({
  controllers: [AppController],
  providers: [
    FilesService,
    TasksService,
    HttpModule,
    AppClusterService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: GlobalInterceptor,
    },
  ],
  imports: [
    HttpModule.register({
      withCredentials: true,
      responseEncoding: 'utf8',
      responseType: 'json',
    }),
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      expandVariables: true,
      isGlobal: true,
    }),
    TelegramModule.forRootAsync({
      useFactory: getTelegramConfig,
    }),
    CacheModule.register({
      ttl: 6000,
      max: 100,
      isGlobal: true,
    }),
    ThrottlerModule.forRoot({
      ttl: 600,
      limit: 100,
    }),
    BullModule.forRoot({
      limiter: {
        max: 5,
        duration: 10000,
        bounceBack: true,
      },
      redis: {
        host: process.env.REDIS_HOST.toString(),
        port: Number(process.env.REDIS_PORT),
        db: 1,
        password: process.env.REDIS_PASSWORD.toString(),
      },
      settings: {
        lockDuration: 30000,
        lockRenewTime: 15000,
        stalledInterval: 30000,
        maxStalledCount: 1,
        guardInterval: 5000,
        retryProcessDelay: 5000,
        drainDelay: 5,
      },
    }),
    // ServeStaticModule.forRoot({
    //   rootPath: path.join(__dirname, 'static'),
    //   renderPath: '*',
    // }),  NOT WORKING
    MulterModule.register({
      dest: './static',
      fileFilter(req, file, callback) {
        const filetypes = /\.(jpg|jpeg|png|gif)$/;
        const extname = filetypes.test(
          path.extname(file.originalname).toLowerCase(),
        );
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
          return callback(null, true);
        }
        return callback(new Error('Only image files are allowed!'), false);
      },
      preservePath: true,
      limits: {
        fileSize: 12282810,
      },
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.PGHOST.toString(),
      port: Number(process.env.PGPORT),
      username: process.env.PGUSER.toString(),
      password: process.env.PGPASSWORD.toString(),
      database: process.env.PGDATABASE.toString(),
      models: [
        ProductReviews,
        Product,
        Order,
        OrderProduct,
        Category,
        ProductCategories,
        Admin,
        AdminRefreshToken,
        Owner,
        OwnerRefreshToken,
        User,
        UserRefreshToken,
        Role,
        UserRoles,
        Cart,
        CartProduct,
        Review,
        BookmarksProducts,
        WatchedProducts,
        Currencies,
        Colour,
        ProductColours,
      ],
      autoLoadModels: true,
      synchronize: true,
      retryDelay: 5,
      retryAttempts: 5,
    }),
    AdminModule,
    AuthModule,
    MailModule,
    CoreModule,
    ProductModule,
    UsersModule,
    OwnerModule,
    OrdersModule,
    CartModule,
    CategoriesColoursModule,
    ReviewsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware, LocationMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
