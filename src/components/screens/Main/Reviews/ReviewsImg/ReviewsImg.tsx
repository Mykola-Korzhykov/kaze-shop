import s from './reviewsImg.module.scss';
import WomanImg from '../../../../../assets/images/main/Reviews/photo.png';
import Image from 'next/image';


const ReviewsImg = (): JSX.Element => {
    return (

        <div className={s.review_img}>
            <Image src={WomanImg} alt="woman photo" />
            <div className={s.review_img_bg}></div>
            <h3>Отзывы</h3>
        </div>

    )
}

export default ReviewsImg;