import {
  Body,
  CacheInterceptor,
  CacheTTL,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Put,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { Roles } from '../../common/decorators/roles-auth.decorator';
import { AddContentGuard } from '../../common/guards/add-content.guard';
import { AuthFerfershGuard } from '../../common/guards/jw-refresh.guard';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { OwnerAdminGuard } from '../../common/guards/owner-admin.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { ThrottlerBehindProxyGuard } from '../../common/guards/throttler-behind-proxy.guard';
import { ApiErrorExceptionFilter } from '../../common/filters/error-handler.filter';
import { CreateColourDto } from '../dto/create.colour.dto';
import { Colour } from '../models/colours.model';
import { ApiExceptionFilter } from '../../common/filters/api-exception.filter';
import { ReturnedColour } from '../../core/interfaces/product.interfaces';
import { ColoursService } from '../services/colours.service';
@UseGuards(ThrottlerBehindProxyGuard)
@UseFilters(ApiErrorExceptionFilter, ApiExceptionFilter)
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(CacheInterceptor)
@Controller('colours')
export class ColoursController {
  constructor(private readonly coloursService: ColoursService) {}

  @Throttle(700, 7000)
  @CacheTTL(200)
  @Get('get_colours')
  getcolours(): Promise<ReturnedColour[]> {
    return this.coloursService.getColours();
  }

  @Throttle(70, 700)
  @ApiOperation({ summary: 'Creating colours' })
  @ApiResponse({ status: 201, type: Colour })
  @HttpCode(201)
  @Roles('OWNER', 'ADMIN')
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
    OwnerAdminGuard,
    AuthFerfershGuard,
    AddContentGuard,
  )
  @Put('create_colour')
  createcolour(@Body() colourDto: CreateColourDto): Promise<ReturnedColour> {
    return this.coloursService.createColour(colourDto);
  }

  @Throttle(70, 700)
  @ApiOperation({ summary: 'Creating colours' })
  @ApiResponse({ status: 201, type: Colour })
  @HttpCode(201)
  @Roles('OWNER', 'ADMIN')
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
    OwnerAdminGuard,
    AuthFerfershGuard,
    AddContentGuard,
  )
  @Patch('update_colour/:colourId')
  updatecolour(
    @Param('colourId', ParseIntPipe) colourId: number,
    @Body() colourDto: CreateColourDto,
  ): Promise<ReturnedColour> {
    return this.coloursService.updateColour(colourId, colourDto);
  }

  @Throttle(70, 700)
  @HttpCode(200)
  @Roles('OWNER', 'ADMIN')
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
    OwnerAdminGuard,
    AuthFerfershGuard,
    AddContentGuard,
  )
  @Delete('delete_colour/:colourId')
  deletecolour(
    @Param('colourId', ParseIntPipe) colourId: number,
  ): Promise<number> {
    return this.coloursService.deleteColour(colourId);
  }
}
