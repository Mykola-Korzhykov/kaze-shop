import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoriesService } from '../categories&colours/services/categories.service';
import { InitializeUserMiddleware } from '../common/middlewares/initialize-user.middleware';
import { AdminModule } from '../admin/admin.module';
import { Admin } from '../admin/models/admin.model';
import { AdminRefreshToken } from '../admin/models/admin.refresh.token.model';
import { AuthModule } from '../auth/auth.module';
import { CartModule } from '../cart/cart.module';
import { CartProduct } from '../cart/models/cart.product.model';
import { Cart } from '../cart/models/cart.model';
import { Colour } from '../categories&colours/models/colours.model';
import { ProductColours } from '../categories&colours/models/product.colour.model';
import { Category } from '../categories&colours/models/category.model';
import { ProductCategories } from '../categories&colours/models/product.categories.model';
import { Order } from '../orders/models/order.model';
import { OrderProduct } from '../orders/models/order.product.model';
import { OrdersModule } from '../orders/orders.module';
import { Owner } from '../owner/models/owner.model';
import { OwnerRefreshToken } from '../owner/models/owner.refresh.token.model';
import { OwnerModule } from '../owner/owner.module';
import { Product } from '../product/models/product.model';
import { ProductService } from '../product/product.service';
import { Role } from '../roles/models/roles.model';
import { UserRoles } from '../roles/models/user.roles.model';
import { RolesModule } from '../roles/roles.module';
import { User } from '../users/models/user.model';
import { UserRefreshToken } from '../users/models/user.refresh.token.model';
import { UsersModule } from '../users/users.module';
import { ProductReviews } from './models/product.reviews.model';
import { Review } from './models/review.model';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './create.review.dto';
import RequestValidator from '../common/pipes/body-validator.pipe';
import { CategoriesColoursModule } from 'src/categories&colours/categories&colours.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService, ProductService, CategoriesService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      expandVariables: true,
      isGlobal: true,
    }),
    SequelizeModule.forFeature([
      ProductReviews,
      Review,
      Product,
      Colour,
      ProductColours,
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
    forwardRef(() => CategoriesColoursModule),
    forwardRef(() => AdminModule),
    forwardRef(() => RolesModule),
    forwardRef(() => AuthModule),
    forwardRef(() => OwnerModule),
    forwardRef(() => UsersModule),
    forwardRef(() => ProductModule),
  ],
})
export class ReviewsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestValidator.validate(CreateReviewDto)).forRoutes({
      path: 'reviews/create_review',
      method: RequestMethod.DELETE,
    });
    consumer.apply(InitializeUserMiddleware).forRoutes({
      path: 'reviews/delete_review',
      method: RequestMethod.DELETE,
    });
  }
}
