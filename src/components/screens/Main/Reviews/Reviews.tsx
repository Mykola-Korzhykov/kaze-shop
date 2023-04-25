import ReviewImg from './ReviewsImg/ReviewsImg';
import s from './Reviews.module.scss';
import ReviewsSlider from './ReviewsSlider/ReviewsSlider';
import { ReviewsProps } from './Reviews.interface';
import EmptyReviewSlideMessage from './EmptyReviewSlideMessage/EmptyReviewSlideMessage';

const Reviews = ({ clientReviews }: ReviewsProps): JSX.Element => {
    return (
        <div className="container">
            <div className={s.reviews}>
                <ReviewImg />
                {clientReviews.length >= 1 && <ReviewsSlider clientReviews={clientReviews} />}
                {clientReviews.length === 0 && <EmptyReviewSlideMessage>Еще нет ни одного отзыва</EmptyReviewSlideMessage>}
            </div>
        </div>
    )
}

export default Reviews;