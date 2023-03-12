import s from './reviewsImg.module.scss';
import WomanImg from '../../../../../assets/images/main/reviews/reviews_woman.png';
import Image from 'next/image';


const ReviewsImg = (): JSX.Element => {
    return (
        <div className={s.review_img}>
            <Image src={WomanImg} alt="woman photo" />
            <h3>Отзывы</h3>
        </div>
    )
}

export default ReviewsImg;