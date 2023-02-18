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
import { OrderProduct } from '../orders/models/order.product.model';
import { Admin } from '../admin/models/admin.model';
import { AdminRefreshToken } from '../admin/models/admin.refresh.token.model';
import { CartProduct } from '../cart/models/cart.product.model';
import { Cart } from '../cart/models/cart.model';
import { Category } from '../categories/models/category.model';
import { ProductCategories } from '../categories/models/product.categories.model';
import { Order } from '../orders/models/order.model';
import { Owner } from '../owner/models/owner.model';
import { OwnerRefreshToken } from '../owner/models/owner.refresh.token.model';
import { Product } from '../product/models/product.model';
import { UserRefreshToken } from '../users/models/user.refresh.token.model';
import { AuthService } from '../auth/auth.service';
import { AdminModule } from '../admin/admin.module';
import { AuthModule } from '../auth/auth.module';
import { CoreModule } from '../core/core.module';
import { MailModule } from '../mail/mail.module';
import { OwnerModule } from '../owner/owner.module';
import { ProductModule } from '../product/product.module';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/services/users.service';
import { TasksService } from '../core/services/scedule.service';
import { UserJwtRefreshTokenService } from '../users/services/jwt-refresh.service';
import { InitializeUserMiddleware } from '../common/middlewares/initialize-user.middleware';
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
