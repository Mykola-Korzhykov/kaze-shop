import React, { useState } from "react";
import { useKeenSlider, KeenSliderPlugin } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import SlideItem from './SlideItem/SlideItem';
import Product from '../../../../../assets/images/main/reviews/slider/reviews_slide_item.png';
import cn from 'classnames';
import s from './reviewSlider.module.scss';

const mockSliderData = [
    {
        img: Product,
        name: 'Ксения Внедорожная',
        reviewsText: 'Очень понравились ТайДай лосины. Заказывала вчера, пришли сегодня. Все на высшем уровне, от упаковки, до общения с клиентом, спасибо!'
    },
    {
        img: Product,
        name: 'Ксения Внедорожная',
        reviewsText: 'Очень понравились ТайДай лосины. Заказывала вчера, пришли сегодня. Все на высшем уровне, от упаковки, до общения с клиентом, спасибо!'
    },
    {
        img: Product,
        name: 'Ксения Внедорожная',
        reviewsText: 'Очень понравились ТайДай лосины. Заказывала вчера, пришли сегодня. Все на высшем уровне, от упаковки, до общения с клиентом, спасибо!'
    },
    {
        img: Product,
        name: 'Ксения Внедорожная',
        reviewsText: 'Очень понравились ТайДай лосины. Заказывала вчера, пришли сегодня. Все на высшем уровне, от упаковки, до общения с клиентом, спасибо!'
    },
    {
        img: Product,
        name: 'Ксения Внедорожная',
        reviewsText: 'Очень понравились ТайДай лосины. Заказывала вчера, пришли сегодня. Все на высшем уровне, от упаковки, до общения с клиентом, спасибо!'
    }
]


const ReviewsSlider = (): JSX.Element => {
    const [sliderRef] = useKeenSlider<HTMLDivElement>(
        {
            slides: {
                perView: 3,
                spacing: 30,
            },
            loop: true,
            rubberband: false,
            vertical: true,
        },
    )
    return (
        <div ref={sliderRef} className={cn(s.slider, 'keen-slider')}>
            {mockSliderData.map((item, i) => <SlideItem key={i} {...item} className={cn(`keen-slider__slide number-slide${i + 1}`)} />)}

        </div>
    )
}

export default ReviewsSlider;

