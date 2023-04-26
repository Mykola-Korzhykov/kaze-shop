import s from './slideItem.module.scss';
import Image from 'next/image';
import Stars from '../Stars/Stars';
import { SlideItemInterface } from './SlideItem.interface';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Api } from '@/services/index';
import { changeClientReviews } from '@/redux/slices/strapiValues';

const SlideItem = ({ id, imageUrl, rating, surname, review, name, className, }: SlideItemInterface): JSX.Element => {
    const userType = useAppSelector(store => store.user.user?.type);

    const dispatch = useAppDispatch();
    const allReviews = useAppSelector(store => store.strapiValues.reviews.clientReviews);

    const removeReviews = async () => {
        if (!window.confirm('Хотите удалить этот отзыв ?')) {
            return
        }
        const cloneReviews = [...allReviews];
        try {
            const newReviewsStack = allReviews.filter(rev => id !== rev.id);
            dispatch(changeClientReviews(newReviewsStack))
            await Api().goods.deleteReviews(id);
        } catch {
            dispatch(changeClientReviews(cloneReviews))
        }
    }
    return (
        <div className={cn(s.item, className)} >
            <div className={s.item_img}>
                <Image src={imageUrl} alt="product photo" quality={100} width={200} height={242} />
            </div>
            <div className={s.item_description}>
                <div className={s.item_description_title}>
                    <h5>{name} {surname}</h5> 
                </div>
                <p>{review}</p>
                <Stars grade={rating} />

                {['OWNER', 'ADMIN'].includes(userType) &&
                    <svg onClick={removeReviews} className={s.delete} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.75 5.25L5.25 18.75" stroke="#0B0B0B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M18.75 18.75L5.25 5.25" stroke="#0B0B0B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>}
            </div>
        </div>
    )
}


export default SlideItem;