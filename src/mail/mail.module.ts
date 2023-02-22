import { forwardRef, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { AdminModule } from '../admin/admin.module';
import { AuthModule } from '../auth/auth.module';
import { OwnerModule } from '../owner/owner.module';
import { RolesModule } from '../roles/roles.module';
import { UsersModule } from '../users/users.module';
import { ConfigModule } from '@nestjs/config';
import { UsersService } from '../users/services/users.service';
import { OwnerService } from '../owner/services/owner.service';
import { AdminService } from '../admin/services/admin.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from '../admin/models/admin.model';
import { AdminRefreshToken } from '../admin/models/admin.refresh.token.model';
import { CartProduct } from '../cart/models/cart.product.model';
import { Cart } from '../cart/models/cart.model';
import { Order } from '../orders/models/order.model';
import { OrderProduct } from '../orders/models/order.product.model';
import { Owner } from '../owner/models/owner.model';
import { OwnerRefreshToken } from '../owner/models/owner.refresh.token.model';
import { Product } from '../product/models/product.model';
import { Role } from '../roles/models/roles.model';
import { UserRoles } from '../roles/models/user.roles.model';
import { User } from '../users/models/user.model';
import { UserRefreshToken } from '../users/models/user.refresh.token.model';
import { Currencies } from 'src/owner/models/currencies.model';

@Module({
  providers: [MailService, UsersService, OwnerService, AdminService],
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
    ]),
    forwardRef(() => AdminModule),
    forwardRef(() => RolesModule),
    forwardRef(() => AuthModule),
    forwardRef(() => OwnerModule),
    forwardRef(() => UsersModule),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAILER_HOST?.toString().trim() || 'smtp.gmail.com',
        port: Number(process.env.MAILER_PORT?.trim()) || 465,
        secure: Boolean(process.env.MAILER_SECURITY?.trim()) || true,
        auth: {
          user:
            process.env.MAILER_USER?.toString().trim() ||
            'kazesport2022@gmail.com',
          pass:
            process.env.MAILER_PASS?.toString().trim() || 'flbwyzikawirfudk',
        },
        tls: {
          rejectUnauthorized: false,
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
    }),
  ],
  exports: [MailService],
})
export class MailModule {}
