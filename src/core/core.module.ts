import { forwardRef, Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { ThrottlerBehindProxyGuard } from '../common/guards/throttler-behind-proxy.guard';
import { GlobalInterceptor } from './interceptors/global.interceptor';
import { AppClusterService } from './services/cluster.service';
import { FilesService } from './services/file.service';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './services/scedule.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { BullModule } from '@nestjs/bull';
import { GarbageCollectingProcessor } from './processors/garbage.processor';
import { Admin } from '../admin/models/admin.model';
import { AdminRefreshToken } from '../admin/models/admin.refresh.token.model';
import { CartProduct } from '../cart/models/cart.product.model';
import { Cart } from '../cart/models/cart.model';
import { Colour } from '../categories&colours/models/colours.model';
import { ProductColours } from '../categories&colours/models/product.colour.model';
import { Category } from '../categories&colours/models/category.model';
import { ProductCategories } from '../categories&colours/models/product.categories.model';
import { Order } from '../orders/models/order.model';
import { OrderProduct } from '../orders/models/order.product.model';
import { Owner } from '../owner/models/owner.model';
import { OwnerRefreshToken } from '../owner/models/owner.refresh.token.model';
import { Product } from '../product/models/product.model';
import { Role } from '../roles/models/roles.model';
import { UserRoles } from '../roles/models/user.roles.model';
import { User } from '../users/models/user.model';
import { UserRefreshToken } from '../users/models/user.refresh.token.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { CurrencyService } from '../owner/services/currency.service';
import { Currencies } from '../owner/models/currencies.model';
import { HttpModule } from '@nestjs/axios';
import { AdminModule } from '../admin/admin.module';
import { AuthModule } from '../auth/auth.module';
import { MailModule } from '../mail/mail.module';
import { OwnerModule } from '../owner/owner.module';
import { ProductModule } from '../product/product.module';
import { RolesModule } from '../roles/roles.module';
import { UsersModule } from '../users/users.module';
@Module({
  providers: [
    { provide: APP_INTERCEPTOR, useClass: GlobalInterceptor },
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    {
      provide: APP_GUARD,
      useClass: ThrottlerBehindProxyGuard,
    },
    CurrencyService,
    TasksService,
    AppClusterService,
    FilesService,
    GarbageCollectingProcessor,
  ],
  imports: [
    HttpModule,
    BullModule.registerQueue({
      name: 'garbageCollecting',
    }),
    EventEmitterModule.forRoot({
      wildcard: true,
      delimiter: '.',
      newListener: true,
      removeListener: true,
      maxListeners: 10,
      verboseMemoryLeak: true,
      ignoreErrors: false,
    }),
    ScheduleModule.forRoot(),
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
    forwardRef(() => MailModule),
    forwardRef(() => ProductModule),
    forwardRef(() => CoreModule),
    forwardRef(() => AdminModule),
    forwardRef(() => RolesModule),
    forwardRef(() => AuthModule),
    forwardRef(() => OwnerModule),
    forwardRef(() => UsersModule),
  ],
})
export class CoreModule {}
