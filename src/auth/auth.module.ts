import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminModule } from '../admin/admin.module';
import { JwtModule } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { AuthMiddleware } from '../common/middlewares/auth.middleware';
import { ThrottlerGuard } from '@nestjs/throttler';
import { OwnerModule } from '../owner/owner.module';
import { AdminJwtRefreshService } from '../admin/services/jwt-refresh.service';
import { OwnerJwtRefreshService } from '../owner/services/jwt-refresh.service';
import { UsersModule } from '../users/users.module';
import { InitializeUserMiddleware } from '../common/middlewares/initialize-user.middleware';
import { InitializeEmailMiddleware } from '../common/middlewares/initialize-email.middleware';
import { ActivateMiddleware } from '../common/middlewares/activate.middleware';
import RequestValidator from '../common/pipes/body-validator.pipe';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { ResetDto } from './dto/reset.password.dto';
import { ChangeDto } from './dto/change.password.dto';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from '../admin/models/admin.model';
import { AdminRefreshToken } from '../admin/models/admin.refresh.token.model';
import { Owner } from '../owner/models/owner.model';
import { OwnerRefreshToken } from '../owner/models/owner.refresh.token.model';
import { Role } from '../roles/models/roles.model';
import { UserRoles } from '../roles/models/user.roles.model';
import { User } from '../users/models/user.model';
import { UserRefreshToken } from '../users/models/user.refresh.token.model';
import { ConfigModule } from '@nestjs/config';
import { TasksService } from '../core/services/scedule.service';
import { CoreModule } from '../core/core.module';
import { AppListener } from '../core/services/events.service';
import { CurrencyService } from '../owner/services/currency.service';
import { Currencies } from '../owner/models/currencies.model';
import { HttpModule } from '@nestjs/axios';
import { CartModule } from '../cart/cart.module';
import { Cart } from '../cart/models/cart.model';
import { CartProduct } from '../cart/models/cart.product.model';
import { Category } from '../categories&colours/models/category.model';
import { Colour } from '../categories&colours/models/colours.model';
import { ProductCategories } from '../categories&colours/models/product.categories.model';
import { ProductColours } from '../categories&colours/models/product.colour.model';
import { Order } from '../orders/models/order.model';
import { OrderProduct } from '../orders/models/order.product.model';
import { BookmarksProducts } from '../product/models/bookmark.products';
import { Product } from '../product/models/product.model';
import { WatchedProducts } from '../product/models/watched.products.model';
import { ProductReviews } from '../reviews/models/product.reviews.model';
import { Review } from '../reviews/models/review.model';
import { CategoriesColoursModule } from '../categories&colours/categories&colours.module';
import { ProductModule } from '../product/product.module';
import { RolesModule } from '../roles/roles.module';
import { FilesService } from '../core/services/file.service';
@Module({
  providers: [
    CurrencyService,
    FilesService,
    AppListener,
    AuthService,
    JwtModule,
    AdminJwtRefreshService,
    OwnerJwtRefreshService,
    MailService,
    TasksService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  controllers: [AuthController],
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      expandVariables: true,
      isGlobal: true,
    }),
    SequelizeModule.forFeature([
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
    ]),
    forwardRef(() => CategoriesColoursModule),
    forwardRef(() => CartModule),
    forwardRef(() => CoreModule),
    forwardRef(() => AdminModule),
    forwardRef(() => OwnerModule),
    forwardRef(() => UsersModule),
    forwardRef(() => ProductModule),
    forwardRef(() => RolesModule),
    JwtModule.register({
      secret:
        process.env.JWT_ACCESS_SECRET.toString().trim() ||
        'knfdljhtop6hohjlymhnhgnljjukfty6yujhjbjlvcglki',
      signOptions: {
        expiresIn: 3600000,
      },
    }),
  ],
  exports: [
    AuthService,
    JwtModule,
    AdminJwtRefreshService,
    OwnerJwtRefreshService,
  ],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'auth/login', method: RequestMethod.POST },
        { path: 'auth/signup', method: RequestMethod.POST },
        { path: 'auth/refresh', method: RequestMethod.PATCH },
        { path: 'auth/change', method: RequestMethod.PATCH },
      );
    consumer
      .apply(InitializeUserMiddleware)
      .forRoutes(
        { path: 'auth/logout', method: RequestMethod.POST },
        { path: 'auth/refresh', method: RequestMethod.PATCH },
        { path: 'auth/change', method: RequestMethod.PATCH },
      );
    consumer
      .apply(InitializeEmailMiddleware)
      .forRoutes(
        { path: 'auth/code', method: RequestMethod.POST },
        { path: 'auth/reset', method: RequestMethod.PATCH },
      );
    consumer
      .apply(ActivateMiddleware)
      .forRoutes({ path: 'auth/activate/:link', method: RequestMethod.GET });
    consumer
      .apply(RequestValidator.validate(LoginDto))
      .forRoutes({ path: 'auth/login', method: RequestMethod.POST });
    consumer
      .apply(RequestValidator.validate(SignupDto))
      .forRoutes({ path: 'auth/signup', method: RequestMethod.PUT });
    consumer
      .apply(RequestValidator.validate(ResetDto))
      .forRoutes({ path: 'auth/reset', method: RequestMethod.PATCH });
    consumer
      .apply(RequestValidator.validate(ChangeDto))
      .forRoutes({ path: 'auth/change', method: RequestMethod.PATCH });
  }
}
