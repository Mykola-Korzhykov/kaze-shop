import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { Role } from '../roles/models/roles.model';
import { UserRoles } from '../roles/models/user.roles.model';
import { RolesModule } from '../roles/roles.module';
import { User } from '../users/models/user.model';
import { UserRefreshToken } from '../users/models/user.refresh.token.model';
import { UsersModule } from '../users/users.module';
import { ConfigModule } from '@nestjs/config';
import { Admin } from '../admin/models/admin.model';
import { AdminRefreshToken } from '../admin/models/admin.refresh.token.model';
import { CartModule } from '../cart/cart.module';
import { CartProduct } from '../cart/models/cart.product.model';
import { Cart } from '../cart/models/cart.model';
import { Category } from '../categories&colours/models/category.model';
import { ProductCategories } from '../categories&colours/models/product.categories.model';
import { Owner } from '../owner/models/owner.model';
import { OwnerRefreshToken } from '../owner/models/owner.refresh.token.model';
import { Product } from '../product/models/product.model';
import { Order } from './models/order.model';
import { OrderProduct } from './models/order.product.model';
import { CategoriesColoursModule } from '../categories&colours/categories&colours.module';
import { IsUser } from '../common/middlewares/is-user.middleware';

@Module({
  providers: [OrdersService],
  controllers: [OrdersController],
  imports: [
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
    ]),
    forwardRef(() => CartModule),
    forwardRef(() => CategoriesColoursModule),
    forwardRef(() => RolesModule),
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
  ],
})
export class OrdersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IsUser).forRoutes({
      path: 'orders/create_order',
      method: RequestMethod.POST,
    });
  }
}
