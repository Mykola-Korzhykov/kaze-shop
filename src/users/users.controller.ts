import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  HttpCode,
  Patch,
  Req,
  Res,
  Next,
  ClassSerializerInterceptor,
  UseInterceptors,
  Query,
  ParseIntPipe,
  ParseArrayPipe,
  UseFilters,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles-auth.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { User } from './models/user.model';
import { UsersService } from './services/users.service';
import { RolesGuard } from '../common/guards/roles.guard';
import { BanUserDto } from './dto/ban-user.dto';
import { Throttle } from '@nestjs/throttler';
import { ThrottlerBehindProxyGuard } from '../common/guards/throttler-behind-proxy.guard';
import { AuthService } from '../auth/auth.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { NextFunction, Request, Response } from 'express';
import { UserAgent } from '../common/decorators/user-agent.decorator';
import { UserId } from '../common/decorators/user.id.decorator';
import { UserGuard } from '../common/guards/user.guard';
import { UserInterface } from '../core/interfaces/user.interfaces';
import { ValidateDto } from '../common/pipes/validation.pipe';
import { OwnerAdminGuard } from '../common/guards/owner-admin.guard';
import { AuthFerfershGuard } from '../common/guards/jw-refresh.guard';
import { ApiErrorExceptionFilter } from '../common/filters/error-handler.filter';
import { ApiExceptionFilter } from '../common/filters/api-exception.filter';

@UseGuards(ThrottlerBehindProxyGuard)
@UseFilters(ApiErrorExceptionFilter, ApiExceptionFilter)
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('users')
@ApiBearerAuth('JWT-auth')
@Controller('user')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  // tslint:disable-next-line: promise-function-async
  @Throttle(40, 400)
  @ApiOperation({ summary: 'Getting Users' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles('OWNER')
  @UseGuards(JwtAuthGuard, RolesGuard, OwnerAdminGuard, AuthFerfershGuard)
  @Get('/get_users')
  getAllUsers(
    @Query('page', ParseIntPipe) page: number,
    @Query('pageSize', ParseIntPipe) pageSize: number,
  ): Promise<UserInterface[] | []> {
    return this.userService.getAllUsers(page, pageSize);
  }

  // tslint:disable-next-line: promise-function-async
  @Throttle(60, 700)
  @ApiOperation({ summary: 'Getting User' })
  @ApiResponse({ status: 200, type: User })
  @Roles('OWNER')
  @UseGuards(JwtAuthGuard, RolesGuard, OwnerAdminGuard, AuthFerfershGuard)
  @Get('/find_users')
  findUser(
    @Query('v', ParseArrayPipe) v: string[],
    @Query('page', ParseIntPipe) page: number,
    @Query('pageSize', ParseIntPipe) pageSize: number,
  ) {
    return this.userService.findUser(v, page, pageSize);
  }

  // tslint:disable-next-line: promise-function-async
  @Throttle(40, 400)
  @ApiOperation({ summary: 'Ban a user' })
  @ApiResponse({ status: 200 })
  @Roles('OWNER')
  @UseGuards(JwtAuthGuard, RolesGuard, OwnerAdminGuard, AuthFerfershGuard)
  @Post('/ban')
  banUser(@Body() dto: BanUserDto) {
    return this.userService.banUser(dto);
  }

  @Throttle(40, 400)
  @Roles('USER')
  @UseGuards(JwtAuthGuard, RolesGuard, UserGuard)
  @HttpCode(201)
  @Patch('update')
  update(
    @Res() response: Response,
    @Req() request: Request,
    @Next() next: NextFunction,
    @UserId('USER-ID') userId: number,
    @Body() userDto: UpdateUserDto,
    @UserAgent('USER-AGENT') userAgent: string,
  ) {
    (async () => {
      await this.userService.updateUser(userDto, userId);
      return this.authService.refresh(response, request, next, null, userAgent);
    })();
  }
}
