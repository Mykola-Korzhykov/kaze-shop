import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminModule } from '../admin/admin.module';
import { Admin } from '../admin/models/admin.model';
import { AdminRefreshToken } from '../admin/models/admin.refresh.token.model';
import { AuthModule } from '../auth/auth.module';
import { Owner } from '../owner/models/owner.model';
import { OwnerRefreshToken } from '../owner/models/owner.refresh.token.model';
import { OwnerModule } from '../owner/owner.module';
import { Role } from '../roles/models/roles.model';
import { UserRoles } from '../roles/models/user.roles.model';
import { RolesModule } from '../roles/roles.module';
import { User } from '../users/models/user.model';
import { UserRefreshToken } from '../users/models/user.refresh.token.model';
import { UsersModule } from '../users/users.module';
import { ConfigModule } from '@nestjs/config';
import { Product } from './models/product.model';
import { Category } from '../categories&colours/models/category.model';
import { ProductCategories } from '../categories&colours/models/product.categories.model';
import { CategoriesColoursModule } from '../categories&colours/categories&colours.module';
import { CartModule } from '../cart/cart.module';
import { CartProduct } from '../cart/models/cart.product.model';
import { Cart } from '../cart/models/cart.model';
import { Order } from '../orders/models/order.model';
import { OrderProduct } from '../orders/models/order.product.model';
import { OrdersModule } from '../orders/orders.module';
import { InitializeUserMiddleware } from '../common/middlewares/initialize-user.middleware';
import { CategoriesService } from '../categories&colours/services/categories.service';
import { FilesService } from '../core/services/file.service';
import { ProductMiddleware } from '../common/middlewares/product.middleware';
import { ProductReviews } from '../reviews/models/product.reviews.model';
import { BookmarksProducts } from './models/bookmark.products';
import { WatchedProducts } from './models/watched.products.model';
import { UserMiddleware } from 'src/common/middlewares/user.middleware';
import { HttpModule } from '@nestjs/axios';
import { Currencies } from 'src/owner/models/currencies.model';
import { ColoursService } from 'src/categories&colours/services/colours.service';
import { Colour } from 'src/categories&colours/models/colours.model';
import { ProductColours } from 'src/categories&colours/models/product.colour.model';

@Module({
  providers: [ProductService, FilesService, CategoriesService, ColoursService],
  controllers: [ProductController],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      expandVariables: true,
      isGlobal: true,
    }),
    HttpModule,
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
      BookmarksProducts,
      WatchedProducts,
      UserRoles,
      Cart,
      Colour,
      ProductColours,
      CartProduct,
      Currencies,
    ]),
    forwardRef(() => OrdersModule),
    forwardRef(() => CategoriesColoursModule),
    forwardRef(() => AdminModule),
    forwardRef(() => RolesModule),
    forwardRef(() => AuthModule),
    forwardRef(() => OwnerModule),
    forwardRef(() => UsersModule),
  ],
})
export class ProductModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ProductMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
    consumer
      .apply(UserMiddleware, InitializeUserMiddleware)
      .forRoutes(
        { path: 'product/addBookmark', method: RequestMethod.POST },
        { path: 'product/addWatchedProduct', method: RequestMethod.POST },
        { path: 'product/watchedProducts', method: RequestMethod.GET },
        { path: 'product/bookmarkProducts', method: RequestMethod.GET },
      );
    consumer
      .apply(InitializeUserMiddleware)
      .forRoutes(
        { path: 'product/create_product', method: RequestMethod.PUT },
        { path: '*', method: RequestMethod.PATCH },
        { path: '*', method: RequestMethod.DELETE },
        { path: 'product/delete_image', method: RequestMethod.DELETE },
      );
  }
}
