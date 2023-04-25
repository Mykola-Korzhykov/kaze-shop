import ReviewImg from './ReviewsImg/ReviewsImg';
import s from './Reviews.module.scss';
import ReviewsSlider from './ReviewsSlider/ReviewsSlider';
import { ReviewsProps } from './Reviews.interface';
import EmptyReviewSlideMessage from './EmptyReviewSlideMessage/EmptyReviewSlideMessage';
import cn from 'classnames';

const Reviews = ({ clientReviews, className }: ReviewsProps): JSX.Element => {
    return (
        <div className="container">
            <div className={cn(s.reviews, className)}>
                <ReviewImg />
                {clientReviews.length >= 1 && <ReviewsSlider clientReviews={clientReviews} />}
                {clientReviews.length === 0 && <EmptyReviewSlideMessage>Еще нет ни одного отзыва</EmptyReviewSlideMessage>}
            </div>
        </div>
    )
}

export default Reviews;