import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from '../admin/models/admin.model';
import { AdminRefreshToken } from '../admin/models/admin.refresh.token.model';
import { Owner } from '../owner/models/owner.model';
import { OwnerRefreshToken } from '../owner/models/owner.refresh.token.model';
import { Role } from '../roles/models/roles.model';
import { UserRoles } from '../roles/models/user.roles.model';
import { RolesModule } from '../roles/roles.module';
import { User } from '../users/models/user.model';
import { UserRefreshToken } from '../users/models/user.refresh.token.model';
import { Cart } from './models/cart.model';
import { AuthModule } from '../auth/auth.module';
import { ProductModule } from '../product/product.module';
import { UsersModule } from '../users/users.module';
import { CartProduct } from './models/cart.product.model';
import { Colour } from '../categories&colours/models/colours.model';
import { ProductColours } from '../categories&colours/models/product.colour.model';
import { Category } from '../categories&colours/models/category.model';
import { ProductCategories } from '../categories&colours/models/product.categories.model';
import { Order } from '../orders/models/order.model';
import { OrderProduct } from '../orders/models/order.product.model';
import { Product } from '../product/models/product.model';
import { OrdersModule } from '../orders/orders.module';
import { CategoriesColoursModule } from 'src/categories&colours/categories&colours.module';
import { CartMiddleware } from 'src/common/middlewares/cart.middleware';
import { CurrencyService } from 'src/owner/services/currency.service';
import { Currencies } from 'src/owner/models/currencies.model';
import { AdminModule } from 'src/admin/admin.module';
import { OwnerModule } from 'src/owner/owner.module';
import { MailModule } from 'src/mail/mail.module';
import { HttpModule } from '@nestjs/axios';
import { ProductService } from '../product/product.service';

@Module({
  providers: [CartService, CurrencyService, ProductService],
  controllers: [CartController],
  exports: [CartService],
  imports: [
    HttpModule,
    forwardRef(() => AuthModule),
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
      Colour,
      ProductColours,
      Currencies,
    ]),
    forwardRef(() => MailModule),
    forwardRef(() => ProductModule),
    forwardRef(() => OrdersModule),
    forwardRef(() => CategoriesColoursModule),
    forwardRef(() => RolesModule),
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
    forwardRef(() => AdminModule),
    forwardRef(() => OwnerModule),
  ],
})
export class CartModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CartMiddleware)
      .forRoutes(
        { path: 'cart/', method: RequestMethod.GET },
        { path: 'cart/addProduct', method: RequestMethod.POST },
        { path: 'cart/clear', method: RequestMethod.PUT },
        { path: 'cart/deleteProduct', method: RequestMethod.DELETE },
        { path: 'cart/leftCarts', method: RequestMethod.GET },
      );
  }
}
