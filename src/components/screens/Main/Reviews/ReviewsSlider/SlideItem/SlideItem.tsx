import s from './slideItem.module.scss';
import Image from 'next/image';
import Stars from '../Stars/Stars';
import { SlideItemInterface } from './SlideItem.interface';
import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';

const SlideItem = ({ img, reviewsText, name, className, grade, ...props }: SlideItemInterface): JSX.Element => {

    return (
        <div className={cn(s.item, className)} {...props}>
            <div className={s.item_img}>
                <Image src={img} alt="product photo" />
            </div>
            <div className={s.item_description}>
                <div className={s.item_description_title}>
                    <h5>{name}</h5> 
                </div>
                <p>{reviewsText}</p>
                <Stars grade={grade} />
            </div>
        </div>
    )
}


export default SlideItem;