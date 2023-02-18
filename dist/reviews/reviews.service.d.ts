import { ProductService } from '../product/product.service';
import { CreateReviewDto } from './create.review.dto';
import { Review } from './models/review.model';
export declare class ReviewsService {
    private readonly reviewRepository;
    private readonly productService;
    private readonly Logger;
    constructor(reviewRepository: typeof Review, productService: ProductService);
    createReview(createdReviewDto: CreateReviewDto, productId: number): Promise<Review>;
    deleteReview(reviewId: number): Promise<number>;
}
