import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './services/users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Role } from '../roles/models/roles.model';
import { UserRoles } from '../roles/models/user.roles.model';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '../auth/auth.module';
import { UserRefreshToken } from './models/user.refresh.token.model';
import { JwtModule } from '@nestjs/jwt';
import { UserJwtRefreshTokenService } from './services/jwt-refresh.service';
import { UserMiddleware } from '../common/middlewares/user.middleware';
import { InitializeUserMiddleware } from '../common/middlewares/initialize-user.middleware';
import { AdminRefreshToken } from '../admin/models/admin.refresh.token.model';
import { Admin } from '../admin/models/admin.model';
import { AdminModule } from '../admin/admin.module';
import { Owner } from '../owner/models/owner.model';
import { OwnerRefreshToken } from '../owner/models/owner.refresh.token.model';
import { OwnerModule } from '../owner/owner.module';
import RequestValidator from '../common/pipes/body-validator.pipe';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigModule } from '@nestjs/config';
import { TasksService } from '../core/services/scedule.service';
import { CoreModule } from '../core/core.module';
import { ProductModule } from '../product/product.module';
import { CartProduct } from '../cart/models/cart.product.model';
import { Cart } from '../cart/models/cart.model';
import { Colour } from '../categories&colours/models/colours.model';
import { ProductColours } from '../categories&colours/models/product.colour.model';
import { Category } from '../categories&colours/models/category.model';
import { ProductCategories } from '../categories&colours/models/product.categories.model';
import { Order } from '../orders/models/order.model';
import { OrderProduct } from '../orders/models/order.product.model';
import { Product } from '../product/models/product.model';
import { AuthService } from '../auth/auth.service';
import { MailModule } from '../mail/mail.module';
import { BookmarksProducts } from '../product/models/bookmark.products';
import { WatchedProducts } from '../product/models/watched.products.model';
import { Currencies } from '../owner/models/currencies.model';
import { HttpModule } from '@nestjs/axios';
import { CurrencyService } from '../owner/services/currency.service';
import { CartModule } from '../cart/cart.module';
import { CartService } from '../cart/cart.service';
import { CategoriesColoursModule } from '../categories&colours/categories&colours.module';
import { ProductService } from '../product/product.service';
import { FilesService } from '../core/services/file.service';
@Module({
  controllers: [UsersController],
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      expandVariables: true,
      isGlobal: true,
    }),
    SequelizeModule.forFeature([
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
      Currencies,
      BookmarksProducts,
      WatchedProducts,
      Currencies,
      Colour,
      ProductColours,
    ]),
    JwtModule.register({
      secret:
        process.env.JWT_REFRESH_USER_SECRET.toString().trim() ||
        'knfdgfhRRljhtop6hfdghshfdshfohjlymhnhgnljjukfty6yujhjbjlvcglkidrtujhtrfujuj',
      signOptions: {
        expiresIn: 604800000,
      },
    }),
    forwardRef(() => AuthModule),
    forwardRef(() => CartModule),
    forwardRef(() => MailModule),
    forwardRef(() => ProductModule),
    forwardRef(() => CoreModule),
    forwardRef(() => AdminModule),
    forwardRef(() => RolesModule),
    forwardRef(() => AuthModule),
    forwardRef(() => OwnerModule),
    forwardRef(() => UsersModule),
    forwardRef(() => ProductModule),
    forwardRef(() => CategoriesColoursModule),
  ],
  providers: [
    FilesService,
    CartService,
    UsersService,
    UserJwtRefreshTokenService,
    TasksService,
    AuthService,
    CurrencyService,
    ProductService,
  ],
  exports: [UsersService, UserJwtRefreshTokenService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .forRoutes({ path: 'users/update', method: RequestMethod.PATCH });
    consumer
      .apply(RequestValidator.validate(UpdateUserDto))
      .forRoutes({ path: 'users/update', method: RequestMethod.PATCH });
    consumer
      .apply(InitializeUserMiddleware)
      .forRoutes(
        { path: 'user/get_users', method: RequestMethod.GET },
        { path: 'user/find_users', method: RequestMethod.GET },
      );
  }
}