import {
  Body,
  CacheInterceptor,
  Controller,
  Get,
  HttpCode,
  Param,
  Put,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles-auth.decorator';
import { AddContentGuard } from '../common/guards/add-content.guard';
import { AuthFerfershGuard } from '../common/guards/jw-refresh.guard';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { OwnerAdminGuard } from '../common/guards/owner-admin.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { ApiErrorExceptionFilter } from '../common/filters/error-handler.filter';
import { CreateRoleDto } from './dto/create.role.dto';
import { Role } from './models/roles.model';
import { RolesService } from './roles.service';
import { Throttle } from '@nestjs/throttler';
import { ApiExceptionFilter } from '../common/filters/api-exception.filter';
import { ThrottlerBehindProxyGuard } from '../common/guards/throttler-behind-proxy.guard';
@UseGuards(ThrottlerBehindProxyGuard)
@ApiTags('roles')
@UseFilters(ApiErrorExceptionFilter, ApiExceptionFilter)
@Controller('/roles')
@UseInterceptors(CacheInterceptor)
export class RolesController {
  constructor(private readonly roleService: RolesService) {}
  // tslint:disable-next-line: promise-function-async
  @Throttle(70, 700)
  @ApiOperation({ summary: 'Creating Roles' })
  @ApiResponse({ status: 200, type: Role })
  @Roles('OWNER', 'ADMIN')
  @HttpCode(201)
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
    OwnerAdminGuard,
    AuthFerfershGuard,
    AddContentGuard,
  )
  @Put('/create_role')
  createRole(@Body() roleDto: CreateRoleDto): Promise<Role> {
    try {
      return this.roleService.createRole(roleDto);
    } catch (error) {
      throw error;
    }
  }

  // tslint:disable-next-line: promise-function-async
  @Throttle(70, 700)
  @ApiOperation({ summary: 'Getting Roles' })
  @ApiResponse({ status: 200, type: Role })
  @Roles('OWNER', 'ADMIN')
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
    OwnerAdminGuard,
    AuthFerfershGuard,
    AddContentGuard,
  )
  @Get('get/:value')
  getRoleByValue(@Param('value') value: string): Promise<Role> {
    try {
      return this.roleService.getRoleByValue(value);
    } catch (error) {
      throw error;
    }
  }
}
