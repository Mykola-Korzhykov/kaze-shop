import s from './slideItem.module.scss';
import Image from 'next/image';
import Stars from '../Stars/Stars';
import { SlideItemInterface } from './SlideItem.interface';
import cn from 'classnames';
import { useAppSelector } from '@/redux/hooks';

const SlideItem = ({ img, reviewsText, name, className, grade, ...props }: SlideItemInterface): JSX.Element => {
    const userType = useAppSelector(store => store.user.user?.type);

    return (
        <div className={cn(s.item, className)} {...props}>
            <div className={s.item_img}>
                <Image src={img} alt="product photo" quality={100} />
            </div>
            <div className={s.item_description}>
                <div className={s.item_description_title}>
                    <h5>{name}</h5> 
                </div>
                <p>{reviewsText}</p>
                <Stars grade={grade} />

                {['OWNER', 'ADMIN'].includes(userType) &&
                    <svg className={s.delete} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.75 5.25L5.25 18.75" stroke="#0B0B0B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M18.75 18.75L5.25 5.25" stroke="#0B0B0B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>}
            </div>
        </div>
    )
}


export default SlideItem;