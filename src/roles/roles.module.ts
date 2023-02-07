import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './models/roles.model';
import { User } from '../users/models/user.model';
import { UserRoles } from './models/user.roles.model';
import { ConfigModule } from '@nestjs/config';
import { OrderProduct } from 'src/orders/models/order.product.model';
import { Admin } from 'src/admin/models/admin.model';
import { AdminRefreshToken } from 'src/admin/models/admin.refresh.token.model';
import { CartProduct } from 'src/cart/models/cart-item.model';
import { Cart } from 'src/cart/models/cart.model';
import { Category } from 'src/categories/models/category.model';
import { ProductCategories } from 'src/categories/models/product.categories.model';
import { Order } from 'src/orders/models/order.model';
import { Owner } from 'src/owner/models/owner.model';
import { OwnerRefreshToken } from 'src/owner/models/owner.refresh.token.model';
import { Product } from 'src/product/product.model';
import { UserRefreshToken } from 'src/users/models/user.refresh.token.model';
import { AuthService } from 'src/auth/auth.service';
import { AdminModule } from 'src/admin/admin.module';
import { AuthModule } from 'src/auth/auth.module';
import { CoreModule } from 'src/core/core.module';
import { MailModule } from 'src/mail/mail.module';
import { OwnerModule } from 'src/owner/owner.module';
import { ProductModule } from 'src/product/product.module';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/services/users.service';
import { TasksService } from 'src/core/services/scedule.service';
import { UserJwtRefreshTokenService } from 'src/users/services/jwt-refresh.service';
import { InitializeUserMiddleware } from 'src/common/middlewares/initialize-user.middleware';
@Module({
  controllers: [RolesController],
  providers: [
    RolesService,
    AuthService,
    UsersService,
    TasksService,
    UserJwtRefreshTokenService,
  ],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      expandVariables: true,
      isGlobal: true,
    }),
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
    forwardRef(() => MailModule),
    forwardRef(() => ProductModule),
    forwardRef(() => CoreModule),
    forwardRef(() => AdminModule),
    forwardRef(() => RolesModule),
    forwardRef(() => AuthModule),
    forwardRef(() => OwnerModule),
  ],
  exports: [RolesService],
})
export class RolesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(InitializeUserMiddleware)
      .forRoutes(
        { path: 'roles/create_role', method: RequestMethod.PUT },
        { path: 'roles/get', method: RequestMethod.GET },
      );
  }
}
