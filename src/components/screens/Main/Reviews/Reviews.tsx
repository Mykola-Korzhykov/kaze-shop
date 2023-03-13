import ReviewImg from './ReviewsImg/ReviewsImg';
import s from './reviews.module.scss';
import ReviewsSlider from './ReviewsSlider/ReviewsSlider';


const Reviews = (): JSX.Element => {

    return (
        <div className="container">
            <div className={s.reviews}>
                <ReviewImg />
                <ReviewsSlider />
            </div>
        </div>
    )
}

export default Reviews;