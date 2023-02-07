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
import { ServeStaticModule } from '@nestjs/serve-static';
import path, { extname } from 'path';
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
import { CategoriesModule } from './categories/categories.module';
import { Product } from './product/product.model';
import { Category } from './categories/models/category.model';
import { ProductCategories } from './categories/models/product.categories.model';
import { CartProduct } from './cart/models/cart-item.model';
import { Cart } from './cart/models/cart.model';
import { Order } from './orders/models/order.model';
import { OrderProduct } from './orders/models/order.product.model';
import { MulterModule } from '@nestjs/platform-express';
@Module({
  controllers: [AppController],
  providers: [
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
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, 'static'),
    }),
    MulterModule.register({
      dest: './static',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.PGHOST.toString(),
      port: Number(process.env.PGPORT),
      username: process.env.PGUSER.toString(),
      password: process.env.PGPASSWORD.toString(),
      database: process.env.PGDATABASE.toString(),
      models: [
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
    CategoriesModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
