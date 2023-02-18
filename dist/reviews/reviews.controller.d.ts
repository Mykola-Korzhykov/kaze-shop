import { CreateReviewDto } from './create.review.dto';
import { ReviewsService } from './reviews.service';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    createReview(createReviewDto: CreateReviewDto, productId: number): Promise<import("./models/review.model").Review>;
    deleteReview(reviewId: number): Promise<number>;
}
