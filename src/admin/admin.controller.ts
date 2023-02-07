import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  ClassSerializerInterceptor,
  UseInterceptors,
  HttpCode,
  Query,
  ParseIntPipe,
  Patch,
  UseFilters,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Admin } from './models/admin.model';
import { AdminService } from './services/admin.service';
import { ValidateDto } from '../common/pipes/validation.pipe';
import { AdminInterface } from '../core/interfaces/admin.interfaces';
import { ThrottlerBehindProxyGuard } from '../common/guards/throttler-behind-proxy.guard';
import { Roles } from '../common/decorators/roles-auth.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { OwnerAdminGuard } from '../common/guards/owner-admin.guard';
import { AuthFerfershGuard } from '../common/guards/jw-refresh.guard';
import { Throttle } from '@nestjs/throttler';
import { User } from '../users/models/user.model';
import { ParseArrayPipe } from '@nestjs/common/pipes';
import { ApiErrorExceptionFilter } from '../common/filters/error-handler.filter';
import { ApiExceptionFilter } from '../common/filters/api-exception.filter';

@UseGuards(ThrottlerBehindProxyGuard)
@UseFilters(ApiErrorExceptionFilter, ApiExceptionFilter)
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('admin')
@ApiBearerAuth('JWT-auth')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // tslint:disable-next-line: promise-function-async
  @ApiOperation({ summary: 'Creating Admin' })
  @ApiResponse({ status: 200, type: Admin })
  @Throttle(60, 700)
  @Roles('OWNER')
  @UseGuards(JwtAuthGuard, RolesGuard, OwnerAdminGuard, AuthFerfershGuard)
  @HttpCode(201)
  @Post('create_admin')
  createAdmin(
    @Body(new ValidateDto()) adminDto: CreateAdminDto,
  ): Promise<Admin | User> {
    return this.adminService.createAdmin(adminDto);
  }

  // tslint:disable-next-line: promise-function-async
  @ApiOperation({ summary: 'Updating Admin' })
  @ApiResponse({ status: 202, type: Admin })
  @Throttle(70, 700)
  @Roles('OWNER')
  @UseGuards(JwtAuthGuard, RolesGuard, OwnerAdminGuard, AuthFerfershGuard)
  @HttpCode(202)
  @Patch('update_admin')
  updateAdmin(
    @Body(new ValidateDto()) adminDto: CreateAdminDto,
  ): Promise<number | Admin> {
    return this.adminService.updateAdmin(adminDto);
  }

  // tslint:disable-next-line: promise-function-async
  @ApiOperation({ summary: 'Getting Admins' })
  @ApiResponse({ status: 200, type: Admin })
  @Throttle(60, 700)
  @Roles('OWNER')
  @UseGuards(JwtAuthGuard, RolesGuard, OwnerAdminGuard, AuthFerfershGuard)
  @Get('find_admin')
  findAdmin(
    @Query('v', ParseArrayPipe) v: string[],
    @Query('page', ParseIntPipe) page: number,
    @Query('pageSize', ParseIntPipe) pageSize: number,
  ): Promise<any[]> {
    return this.adminService.findAdmin(v, page, pageSize);
  }

  // tslint:disable-next-line: promise-function-async
  @ApiOperation({ summary: 'Getting Admins' })
  @ApiResponse({ status: 200, type: [Admin] })
  @Throttle(60, 700)
  @Roles('OWNER')
  @UseGuards(JwtAuthGuard, RolesGuard, OwnerAdminGuard, AuthFerfershGuard)
  @Get('get_admins')
  getAllUsers(
    @Query('page', ParseIntPipe) page: number,
    @Query('pageSize', ParseIntPipe) pageSize: number,
  ): Promise<AdminInterface[] | []> {
    return this.adminService.getAllAdmins(page, pageSize);
  }
}
