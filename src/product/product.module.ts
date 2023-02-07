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
import { Product } from './product.model';
import { Category } from '../categories/models/category.model';
import { ProductCategories } from '../categories/models/product.categories.model';
import { CategoriesModule } from '../categories/categories.module';
import { CartModule } from '../cart/cart.module';
import { CartProduct } from 'src/cart/models/cart-item.model';
import { Cart } from 'src/cart/models/cart.model';
import { Order } from 'src/orders/models/order.model';
import { OrderProduct } from 'src/orders/models/order.product.model';
import { OrdersModule } from 'src/orders/orders.module';
import { InitializeUserMiddleware } from 'src/common/middlewares/initialize-user.middleware';
import { UserMiddleware } from 'src/common/middlewares/user.middleware';
import RequestValidator from 'src/common/pipes/body-validator.pipe';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { CreateProductDto } from './dto/create.product.dto';
import { CategoriesService } from 'src/categories/categories.service';

@Module({
  providers: [ProductService, CategoriesService],
  controllers: [ProductController],
  imports: [
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
    ]),
    forwardRef(() => OrdersModule),
    forwardRef(() => CartModule),
    forwardRef(() => CategoriesModule),
    forwardRef(() => AdminModule),
    forwardRef(() => RolesModule),
    forwardRef(() => AuthModule),
    forwardRef(() => OwnerModule),
    forwardRef(() => UsersModule),
  ],
})
export class ProductModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(RequestValidator.validate(CreateProductDto)).forRoutes({
    //   path: 'product/create_product',
    //   method: RequestMethod.POST,
    // });
    // consumer
    //     .apply(InitializeUserMiddleware)
    //     .forRoutes(
    //       { path: 'product/create_product', method: RequestMethod.POST },
    //     );
  }
}
