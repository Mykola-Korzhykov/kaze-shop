import { forwardRef, Module } from '@nestjs/common';
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
import { CategoriesModule } from 'src/categories/categories.module';
import { ConfigModule } from '@nestjs/config';
import { Admin } from 'src/admin/models/admin.model';
import { AdminRefreshToken } from 'src/admin/models/admin.refresh.token.model';
import { CartModule } from 'src/cart/cart.module';
import { CartProduct } from 'src/cart/models/cart-item.model';
import { Cart } from 'src/cart/models/cart.model';
import { Category } from 'src/categories/models/category.model';
import { ProductCategories } from 'src/categories/models/product.categories.model';
import { Owner } from 'src/owner/models/owner.model';
import { OwnerRefreshToken } from 'src/owner/models/owner.refresh.token.model';
import { Product } from 'src/product/product.model';
import { Order } from './models/order.model';
import { OrderProduct } from './models/order.product.model';

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
    forwardRef(() => CategoriesModule),
    forwardRef(() => RolesModule),
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
  ],
})
export class OrdersModule {}
