import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CategoriesService } from './services/categories.service';
import { CategoriesController } from './controllers/categories.controller';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminModule } from '../admin/admin.module';
import { Admin } from '../admin/models/admin.model';
import { AdminRefreshToken } from '../admin/models/admin.refresh.token.model';
import { AuthModule } from '../auth/auth.module';
import { Owner } from '../owner/models/owner.model';
import { OwnerRefreshToken } from '../owner/models/owner.refresh.token.model';
import { OwnerModule } from '../owner/owner.module';
import { Product } from '../product/models/product.model';
import { Role } from '../roles/models/roles.model';
import { UserRoles } from '../roles/models/user.roles.model';
import { RolesModule } from '../roles/roles.module';
import { User } from '../users/models/user.model';
import { UserRefreshToken } from '../users/models/user.refresh.token.model';
import { UsersModule } from '../users/users.module';
import { Category } from './models/category.model';
import { ProductCategories } from './models/product.categories.model';
import { ProductModule } from '../product/product.module';
import { InitializeUserMiddleware } from '../common/middlewares/initialize-user.middleware';
import { ColoursService } from './services/colours.service';
import { ColoursController } from './controllers/colours.controller';
import { Colour } from './models/colours.model';
import { ProductColours } from './models/product.colour.model';
import { ProductMiddleware } from '../common/middlewares/product.middleware';

@Module({
  providers: [CategoriesService, ColoursService],
  controllers: [CategoriesController, ColoursController],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      expandVariables: true,
      isGlobal: true,
    }),
    SequelizeModule.forFeature([
      Product,
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
      Colour,
      ProductColours,
    ]),
    forwardRef(() => ProductModule),
    forwardRef(() => AdminModule),
    forwardRef(() => RolesModule),
    forwardRef(() => AuthModule),
    forwardRef(() => OwnerModule),
    forwardRef(() => UsersModule),
  ],
  exports: [CategoriesService, ColoursService],
})
export class CategoriesColoursModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ProductMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
    consumer
      .apply(InitializeUserMiddleware)
      .forRoutes(
        { path: 'categories/create_category', method: RequestMethod.PUT },
        { path: 'categories/delete_category', method: RequestMethod.DELETE },
        { path: 'colours/create_colour', method: RequestMethod.PUT },
        { path: 'colours/delete_colour', method: RequestMethod.DELETE },
        { path: '*', method: RequestMethod.PATCH },
      );
  }
}