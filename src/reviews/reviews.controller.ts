import {
    Body,
    CacheInterceptor,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    HttpCode,
    ParseIntPipe,
    Put,
    Query,
    UseFilters,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { Roles } from '../common/decorators/roles-auth.decorator';
import { AuthFerfershGuard } from '../common/guards/jw-refresh.guard';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { OwnerAdminGuard } from '../common/guards/owner-admin.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { ApiExceptionFilter } from '../common/filters/api-exception.filter';
import { ApiErrorExceptionFilter } from '../common/filters/error-handler.filter';
import { ThrottlerBehindProxyGuard } from '../common/guards/throttler-behind-proxy.guard';
import { CreateReviewDto } from './create.review.dto';
import { ReviewsService } from './reviews.service';
import { EditContentGuard } from '../common/guards/edit-content.guard';

@UseGuards(ThrottlerBehindProxyGuard)
@UseFilters(ApiErrorExceptionFilter, ApiExceptionFilter)
@UseInterceptors(CacheInterceptor, ClassSerializerInterceptor)
@Controller('reviews')
export class ReviewsController {
    constructor(
        private readonly reviewsService: ReviewsService,
    ) {}
    
    @Throttle(70, 700)
    @Put('create_review')
    createReview(
        @Body() createReviewDto: CreateReviewDto,
        @Query('productId', ParseIntPipe) productId: number
    ) {
        try {
            return this.reviewsService.createReview(createReviewDto, productId);
        } catch (error) {
            throw error;
        }
    }

    @Throttle(70, 700)
    @Delete('delete_review')
    @Roles('OWNER', 'ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard, OwnerAdminGuard, AuthFerfershGuard, EditContentGuard)
    @HttpCode(201)
    deleteReview(
        @Query('reviewId', ParseIntPipe) reviewId: number
    ) {
        try {
            return this.reviewsService.deleteReview(reviewId);
        } catch (error) {
            throw error;
        }
    }
}
