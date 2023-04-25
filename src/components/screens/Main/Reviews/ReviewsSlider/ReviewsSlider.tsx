import "keen-slider/keen-slider.min.css";
import Product from '../../../../../assets/images/main/Reviews/Slider/PhotoItem1.png';
import cn from 'classnames';
import { useKeenSlider } from 'keen-slider/react';
import SlideItem from "./SlideItem/SlideItem";
import s from './reviewsSlider.module.scss';
import slideItemStyle from './SlideItem/slideItem.module.scss';
import ArrowButton from "../../Slider/ArrowButton/ArrowButton";
import { useEffect, useState } from "react";
import { ReviewsSliderProps } from "./ReviewsSlider.interface";
import React from "react";


const mockSliderData = [
    {
        id: 1,
        imageUrl: Product,
        name: 'Ксения',
        surname: ' Внедорожная',
        review: 'Очень понравились ТайДай лосины. Заказывала вчера, пришли сегодня. Все на высшем уровне, от упаковки, до общения с клиентом, спасибо!',
        rating: 4,
    },
    {
        id: 2,
        imageUrl: Product,
        name: 'Ксения',
        surname: ' Внедорожная',
        review: 'Очень понравились ТайДай лосины. Заказывала вчера, пришли сегодня. Все на высшем уровне, от упаковки, до общения с клиентом, спасибо!',
        rating: 1,
    },
    {
        id: 3,
        imageUrl: Product,
        name: 'Ксения',
        surname: ' Внедорожная',
        review: 'Очень понравились ТайДай лосины. Заказывала вчера, пришли сегодня. Все на высшем уровне, от упаковки, до общения с клиентом, спасибо!',
        rating: 2,
    },
    {
        id: 4,
        imageUrl: Product,
        name: 'Ксения',
        surname: 'Внедорожная',
        review: 'Очень понравились ТайДай лосины. Заказывала вчера, пришли сегодня. Все на высшем уровне, от упаковки, до общения с клиентом, спасибо!',
        rating: 5,
    },
    {
        id: 5,
        imageUrl: Product,
        name: 'Ксения',
        surname: ' Внедорожная',
        review: 'Очень понравились ТайДай лосины. Заказывала вчера, пришли сегодня. Все на высшем уровне, от упаковки, до общения с клиентом, спасибо!',
        rating: 4,
    },
]




const ReviewsSlider = ({ clientReviews }: ReviewsSliderProps) => {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const slideViewCount = clientReviews.length >= 3 ? 3 : clientReviews.length;
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
        {
            slides: {
                spacing: 20,
                perView: slideViewCount,
            },
            loop: true,
            rubberband: false,
            vertical: true,
            initial: 1,
            breakpoints: {
                '(max-width:1200px)': {
                    slides: {
                        perView: slideViewCount,
                        spacing: 10,
                    },

                },
                '(max-width:992px)': {
                    slides: {
                        perView: slideViewCount >= 2 ? 2 : slideViewCount,
                        spacing: 10,
                    },
                }
            },
        },
    );


    useEffect(() => {
        const slider = instanceRef.current;
        function rotate() {
            let init: number = slider.track.details.rel + 1;
            if (init === slider.slides.length) {
                init = 0
            }
            slider.slides.forEach((item, i) => {

                if (init === i) {
                    item.style.maxWidth = '100%';
                    item.classList.remove(slideItemStyle.small);
                    return
                }

                item.classList.add(slideItemStyle.small);

                if (!isMobile) {
                    item.style.maxWidth = '85%';
                    return
                }
                item.style.maxWidth = '100%';

            });
        }
        slider.on('created', () => {
            slider.slides.forEach((element, idx) => {
                if (slider.track.details.rel + 1 === idx) {
                    element.style.maxWidth = '100%';
                    element.classList.remove(slideItemStyle.small);
                    return
                }
                element.classList.add(slideItemStyle.small);

                if (!isMobile) {
                    element.style.maxWidth = '85%';
                    return;
                }
                element.style.maxWidth = '100%';
            });
        })
        rotate();
        slider.on('detailsChanged', rotate);
    }, [isMobile]);

    useEffect(() => {
        const checkWidth = () => {
            if (window.innerWidth <= 768) {
                setIsMobile(true);
                return
            }
            setIsMobile(false);
        };
        checkWidth();
        window.addEventListener('resize', checkWidth);
        return () => window.removeEventListener('resize', checkWidth);
    }, [isMobile])

    return (
        <div className={s.wrapper}>
            <div ref={sliderRef} className={cn(s.slider, 'keen-slider', {
                [s.oneSlide]: slideViewCount === 1,
                [s.twoSlide]: slideViewCount === 2
            })}>
                {clientReviews.map((item, i) => <SlideItem key={item.id} {...item} className={cn(`keen-slider__slide number-slide${i + 1}`)} />)}
            </div>
            <div className={s.slider_btn}>
                <ArrowButton position="up" onClick={() => instanceRef.current?.next()}
                />
                <ArrowButton position="down" onClick={() => instanceRef.current?.prev()} />
            </div>
        </div>

    )
}

export default ReviewsSlider;