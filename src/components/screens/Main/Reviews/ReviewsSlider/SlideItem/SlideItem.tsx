import s from './slideItem.module.scss';
import Image from 'next/image';
import Stars from '../Stars/Stars';
import { SlideItemInterface } from './SlideItem.interface';
import cn from 'classnames';

const SlideItem = ({ img, reviewsText, name, className, ...props }: SlideItemInterface): JSX.Element => {
    return (
        <div className={cn(s.item, className)} {...props}>
            <div className={s.item_img}>
                <Image src={img} alt="product photo" />
            </div>
            <div className={s.item_description}>
                <h5>{name}</h5>
                <p>{reviewsText}</p>
                <Stars />
            </div>
        </div>
    )
}

export default SlideItem;