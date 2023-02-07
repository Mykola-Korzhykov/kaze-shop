import { forwardRef, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { AdminModule } from '../admin/admin.module';
import { AuthModule } from '../auth/auth.module';
import { OwnerModule } from '../owner/owner.module';
import { RolesModule } from '../roles/roles.module';
import { UsersModule } from '../users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [MailService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      expandVariables: true,
      isGlobal: true,
    }),
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
