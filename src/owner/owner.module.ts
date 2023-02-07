import { forwardRef, Module } from '@nestjs/common';
import { OwnerService } from './services/owner.service';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { Owner } from './models/owner.model';
import { OwnerRefreshToken } from './models/owner.refresh.token.model';
import { OwnerJwtRefreshService } from './services/jwt-refresh.service';
import { AdminModule } from '../admin/admin.module';
import { MailService } from '../mail/mail.service';
import { Role } from '../roles/models/roles.model';
import { UserRoles } from '../roles/models/user.roles.model';
import { RolesModule } from '../roles/roles.module';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from '../core/core.module';
import { TasksService } from '../core/services/scedule.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      expandVariables: true,
      isGlobal: true,
    }),
    SequelizeModule.forFeature([Owner, OwnerRefreshToken, Role, UserRoles]),
    RolesModule,
    forwardRef(() => OwnerModule),
    JwtModule.register({
      secret:
        process.env.JWT_REFRESH_OWNER_SECRET.toString().trim() ||
        'knfdljhtop6hohjlyjgfhmhnhgnljjukfty6yujhjbjlvcglkidrtujhdgsgdsagdfsdhQQQtrfujuj',
      signOptions: {
        expiresIn: 86400000,
      },
    }),
    forwardRef(() => CoreModule),
    forwardRef(() => AuthModule),
    forwardRef(() => AdminModule),
  ],
  providers: [OwnerService, OwnerJwtRefreshService, MailService, TasksService],
  exports: [OwnerService, OwnerJwtRefreshService],
})
export class OwnerModule {}
