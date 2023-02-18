import { forwardRef, Module } from '@nestjs/common';
import { CardService } from './cart.service';
import { CardController } from './cart.controller';
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
import { CategoriesModule } from '../categories/categories.module';
import { Category } from '../categories/models/category.model';
import { ProductCategories } from '../categories/models/product.categories.model';
import { Order } from '../orders/models/order.model';
import { OrderProduct } from '../orders/models/order.product.model';
import { Product } from '../product/models/product.model';
import { OrdersModule } from '../orders/orders.module';

@Module({
  providers: [CardService],
  controllers: [CardController],
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
    forwardRef(() => ProductModule),
    forwardRef(() => OrdersModule),
    forwardRef(() => CategoriesModule),
    forwardRef(() => RolesModule),
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
  ],
})
export class CartModule {}
