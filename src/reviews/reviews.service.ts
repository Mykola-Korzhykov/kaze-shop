import { Injectable, Logger, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductService } from '../product/product.service';
import { CreateReviewDto } from './create.review.dto';
import { Review } from './models/review.model';

@Injectable({ scope: Scope.TRANSIENT })
export class ReviewsService {
  private readonly Logger = new Logger(ProductService.name);
  constructor(
    @InjectModel(Review) private readonly reviewRepository: typeof Review,
    private readonly productService: ProductService,
  ) {}

  async createReview(createdReviewDto: CreateReviewDto, productId: number) {
    const product = await this.productService.findById(productId);
    const review = await this.reviewRepository.create(createdReviewDto);
    if (!product.reviews) {
      product.$set('reviews', review.id);
      product.reviews = [review];
    } else {
      product.$add('categories', review.id);
    }
    review.productId = product.id;
    review.$add('product', product.id);
    await review.save();
    await product.save();
    return review;
  }

  async deleteReview(reviewId: number): Promise<number> {
    const review = await this.reviewRepository.findByPk(reviewId);
    const product = await this.productService.findById(review.productId);
    product.$remove('reviews', review.id);
    await product.save();
    const deleted = await this.reviewRepository.destroy({
      where: {
        id: review.id,
        name: review.name,
        surname: review.surname,
        review: review.review,
      },
    });
    return deleted;
  }
}
