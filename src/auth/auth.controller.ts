import {
  Controller,
  Post,
  Body,
  Put,
  Req,
  Res,
  Next,
  ClassSerializerInterceptor,
  ParseIntPipe,
} from '@nestjs/common';
import {
  Get,
  HttpCode,
  Param,
  Patch,
  Query,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common/decorators';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ResetDto } from './dto/reset.password.dto';
import { SignupDto } from './dto/signup.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NextFunction, Request, Response } from 'express';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Throttle } from '@nestjs/throttler';
import { ThrottlerBehindProxyGuard } from '../common/guards/throttler-behind-proxy.guard';
import { Type } from '../common/decorators/user-type.decorator';
import { UserAgent } from '../common/decorators/user-agent.decorator';
import { ValidateDto } from '../common/pipes/validation.pipe';
import { RefreshAuthGuard } from '../common/guards/refresh.guard';
import { CodeDto } from '../core/interfaces/auth.interfaces';
import { AuthFerfershGuard } from '../common/guards/jw-refresh.guard';
import { ChangeDto } from './dto/change.password.dto';
import { UserId } from '../common/decorators/user.id.decorator';
import { ApiErrorExceptionFilter } from '../common/filters/error-handler.filter';
import { AppListener } from '../core/services/events.service';
import { ApiExceptionFilter } from '../common/filters/api-exception.filter';
@UseGuards(ThrottlerBehindProxyGuard)
@UseFilters(ApiErrorExceptionFilter, ApiExceptionFilter)
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private appListener: AppListener,
  ) {}

  @ApiOperation({ summary: 'Signing up users' })
  @ApiResponse({ status: 201 })
  @Throttle(50, 600)
  @Post('signup')
  @HttpCode(201)
  signup(
    @Body(new ValidateDto()) userDto: SignupDto,
    @Res() response: Response,
    @Req() request: Request,
    @Next() next: NextFunction,
    @UserAgent('USER-AGENT') userAgent: string,
  ): void {
    (async () => {
      return this.authService.signup(
        userDto,
        response,
        request,
        next,
        userAgent,
      );
    })();
  }

  @ApiOperation({ summary: 'Logging in users' })
  @ApiResponse({ status: 200 })
  @UseFilters(ApiExceptionFilter)
  @Throttle(40, 400)
  @HttpCode(200)
  @Post('login')
  login(
    @Body(new ValidateDto()) userDto: LoginDto,
    @Res() response: Response,
    @Req() request: Request,
    @Next() next: NextFunction,
    @UserAgent('USER-AGENT') userAgent: string,
  ): void {
    (async () => {
      return this.authService.login(
        userDto,
        response,
        request,
        next,
        userAgent,
      );
    })();
  }

  @ApiOperation({ summary: 'Refreshing users' })
  @ApiResponse({ status: 202 })
  @Throttle(40, 400)
  @UseGuards(RefreshAuthGuard)
  @HttpCode(202)
  @Patch('refresh')
  refresh(
    @Res() response: Response,
    @Req() request: Request,
    @Next() next: NextFunction,
    @Type('REFRESHTOKEN') type: 'OWNER' | 'ADMIN' | null,
    @UserAgent('USER-AGENT') userAgent: string,
  ) {
    (async () => {
      return this.authService.refresh(response, request, next, type, userAgent);
    })();
  }

  @ApiOperation({ summary: 'Loggigng out users' })
  @ApiResponse({ status: 202 })
  @Throttle(40, 400)
  @UseGuards(JwtAuthGuard)
  @HttpCode(202)
  @Post('logout')
  logout(
    @Res() response: Response,
    @Req() request: Request,
    @Next() next: NextFunction,
    @Type('REFRESHTOKEN') type: 'OWNER' | 'ADMIN' | null,
  ): void {
    (async () => {
      return this.authService.logout(response, request, next, type);
    })();
  }
  
  @ApiOperation({ summary: 'Getting code' })
  @ApiResponse({ status: 202 })
  @Throttle(40, 400)
  @Post('code')
  @HttpCode(202)
  fetchRenewalCode(
    @Type('CODEDTO') codeDto: CodeDto,
    @Query('locale') locale: 'ua' | 'ru' | 'rs' | 'en',
  ): Promise<string> {
    try {
      return this.authService.setCode(codeDto, locale);
    } catch (error: unknown) {
      throw error;
    }
  }

  // tslint:disable-next-line: promise-function-async
  @ApiOperation({ summary: 'Resetting password' })
  @ApiResponse({ status: 201 })
  @Throttle(45, 450)
  @Patch('reset')
  @HttpCode(201)
  resetPassword(
    @Body(new ValidateDto()) resetDto: ResetDto,
    @Type('CODEDTO') codeDto: CodeDto,
  ): Promise<string | void>{
    try {
      return this.authService.resetPassword(resetDto, codeDto);
    } catch (error: unknown) {
      throw error;
    }
  }

  @ApiOperation({ summary: 'Changing password' })
  @ApiResponse({ status: 202 })
  @Throttle(70, 700)
  @Patch('change')
  @UseGuards(JwtAuthGuard, AuthFerfershGuard)
  @HttpCode(202)
  changePassword(
    @Res() response: Response,
    @Req() request: Request,
    @Next() next: NextFunction,
    @Body() changeDto: ChangeDto,
    @UserId('USER-ID') userId: number,
    @Type('REFRESHTOKEN') type: 'OWNER' | 'ADMIN' | null,
  ): void {
    (async () => {
      return this.authService.changePassword(
        response,
        request,
        next,
        changeDto,
        userId,
        type,
      );
    })();
  }

  @ApiOperation({ summary: 'Activating users' })
  @ApiResponse({ status: 204 })
  @Throttle(70, 700)
  @Get('activate/:link')
  @HttpCode(204)
  activate(
    @Param('link') activationLink: string,
    @Query('code', ParseIntPipe) code: number,
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
    @Type('ACTIVATE') type: 'OWNER' | 'ADMIN',
    @UserAgent('USER-AGENT') userAgent: string,
  ): void {
    (async () => {
      return this.authService.activate(
        request,
        response,
        next,
        activationLink,
        code,
        type,
        userAgent,
      );
    })();
  }
}
