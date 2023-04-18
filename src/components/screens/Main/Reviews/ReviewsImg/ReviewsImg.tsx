import s from './reviewsImg.module.scss';
import WomanImg from '../../../../../assets/images/main/Reviews/photo.png';
import Image from 'next/image';
import { useAppSelector } from '@/redux/hooks';


const ReviewsImg = (): JSX.Element => {
    const { image, title } = useAppSelector(store => store.main.reviews)
    return (

        <div className={s.review_img}>
            <Image src={process.env.NEXT_STRAPI_URL + image.data?.attributes.url}
                width={image.data?.attributes.width}
                height={image.data?.attributes.height}
                alt="woman photo" quality={100} />
            <div className={s.review_img_bg}></div>
            <h3>{title}</h3>
        </div>

    )
}

export default ReviewsImg;