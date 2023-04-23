import { useAppSelector } from '@/redux/hooks';
import s from './reviewsImg.module.scss';
import Image from 'next/image';
import { STRAPI_API_URL } from '@/services';


const ReviewsImg = (): JSX.Element => {
    const { image, title } = useAppSelector(store => store.strapiValues.reviews);

    return (

        <div className={s.review_img}>
            <Image src={STRAPI_API_URL + image.data.attributes.url}
                width={image.data?.attributes.width}
                height={image.data?.attributes.height}
                alt="woman photo" quality={100} />
            <div className={s.review_img_bg}></div>
            <h3>{title}</h3>
        </div>

    )
}

export default ReviewsImg;