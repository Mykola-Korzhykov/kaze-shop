import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './services/admin.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { AdminRefreshToken } from './models/admin.refresh.token.model';
import { AdminJwtRefreshService } from './services/jwt-refresh.service';
import { OwnerModule } from '../owner/owner.module';
import { MailService } from '../mail/mail.service';
import { InitializeUserMiddleware } from '../common/middlewares/initialize-user.middleware';
import { OwnerService } from '../owner/services/owner.service';
import { Owner } from '../owner/models/owner.model';
import { Role } from '../roles/models/roles.model';
import { UserRoles } from '../roles/models/user.roles.model';
import { RolesModule } from '../roles/roles.module';
import { OwnerRefreshToken } from '../owner/models/owner.refresh.token.model';
import { UsersModule } from '../users/users.module';
import { User } from '../users/models/user.model';
import { UserRefreshToken } from '../users/models/user.refresh.token.model';
import { UserAdminMiddleware } from '../common/middlewares/user-admin.middleware';
import RequestValidator from '../common/pipes/body-validator.pipe';
import { CreateAdminDto } from './dto/create-admin.dto';
import { ConfigModule } from '@nestjs/config';
import { AdminUserMiddleware } from '../common/middlewares/admin-user.middleware';
import { CoreModule } from '../core/core.module';
import { TasksService } from '../core/services/scedule.service';
import { CartProduct } from '../cart/models/cart.product.model';
import { Cart } from '../cart/models/cart.model';
import { Colour } from '../categories&colours/models/colours.model';
import { ProductColours } from '../categories&colours/models/product.colour.model';
import { Category } from '../categories&colours/models/category.model';
import { ProductCategories } from '../categories&colours/models/product.categories.model';
import { Order } from '../orders/models/order.model';
import { OrderProduct } from '../orders/models/order.product.model';
import { Product } from '../product/models/product.model';
import { UsersService } from '../users/services/users.service';
import { Currencies } from '../owner/models/currencies.model';
import { HttpModule } from '@nestjs/axios';
import { CurrencyService } from '../owner/services/currency.service';
import { CartModule } from '../cart/cart.module';
import { CartService } from '../cart/cart.service';
import { MailModule } from '../mail/mail.module';
import { ProductModule } from '../product/product.module';
import { CategoriesColoursModule } from '../categories&colours/categories&colours.module';
import { ProductService } from '../product/product.service';
import { FilesService } from '../core/services/file.service';
@Module({
  controllers: [AdminController],
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
      Colour,
      ProductColours,
    ]),
    JwtModule.register({
      secret:
        process.env.JWT_REFRESH_ADMIN_SECRET.toString().trim() ||
        'knfdljhtop6hohjlymhnhgnljjukfty6yujhjbjlvcglkidrtujhtrfujuj',
      signOptions: {
        expiresIn: 172800000,
      },
    }),
    forwardRef(() => CartModule),
    forwardRef(() => CoreModule),
    forwardRef(() => AdminModule),
    forwardRef(() => RolesModule),
    forwardRef(() => AuthModule),
    forwardRef(() => OwnerModule),
    forwardRef(() => UsersModule),
    forwardRef(() => MailModule),
    forwardRef(() => ProductModule),
    forwardRef(() => CategoriesColoursModule),
  ],
  providers: [
    FilesService,
    CartService,
    TasksService,
    AdminService,
    AdminJwtRefreshService,
    MailService,
    OwnerService,
    AdminService,
    UsersService,
    CurrencyService,
    ProductService,
  ],
  exports: [AdminService, AdminJwtRefreshService],
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(InitializeUserMiddleware)
      .forRoutes(
        { path: 'admin/get_admins', method: RequestMethod.GET },
        { path: 'admin/find_admin', method: RequestMethod.GET },
        { path: 'admin/create_admin', method: RequestMethod.POST },
        { path: 'admin/update_admin', method: RequestMethod.PATCH },
      );
    consumer
      .apply(UserAdminMiddleware)
      .forRoutes({ path: 'admin/create_admin', method: RequestMethod.POST });
    consumer
      .apply(RequestValidator.validate(CreateAdminDto))
      .forRoutes({ path: 'admin/create_admin', method: RequestMethod.POST });
    consumer
      .apply(AdminUserMiddleware)
      .forRoutes({ path: 'admin/update_admin', method: RequestMethod.PATCH });
    consumer
      .apply(RequestValidator.validate(CreateAdminDto))
      .forRoutes({ path: 'admin/update_admin', method: RequestMethod.PATCH });
  }
}
