import "keen-slider/keen-slider.min.css";
import Product from '../../../../../assets/images/main/Reviews/Slider/PhotoItem1.png';
import cn from 'classnames';
import { useKeenSlider } from 'keen-slider/react';
import SlideItem from "./SlideItem/SlideItem";
import s from './reviewsSlider.module.scss';
import slideItemStyle from './SlideItem/slideItem.module.scss';
import ArrowButton from "../../Slider/ArrowButton/ArrowButton";
import { useEffect, useState } from "react";


const mockSliderData = [
    {
        img: Product,
        name: 'Ксения Внедорожная',
        reviewsText: 'Очень понравились ТайДай лосины. Заказывала вчера, пришли сегодня. Все на высшем уровне, от упаковки, до общения с клиентом, спасибо!',
        grade: 4,
    },
    {
        img: Product,
        name: 'Ксения Внедорожная',
        reviewsText: 'Очень понравились ТайДай лосины. Заказывала вчера, пришли сегодня. Все на высшем уровне, от упаковки, до общения с клиентом, спасибо!',
        grade: 1,
    },
    {
        img: Product,
        name: 'Ксения Внедорожная',
        reviewsText: 'Очень понравились ТайДай лосины. Заказывала вчера, пришли сегодня. Все на высшем уровне, от упаковки, до общения с клиентом, спасибо!',
        grade: 2,
    },
    {
        img: Product,
        name: 'Ксения Внедорожная',
        reviewsText: 'Очень понравились ТайДай лосины. Заказывала вчера, пришли сегодня. Все на высшем уровне, от упаковки, до общения с клиентом, спасибо! Очень понравились ТайДай лосины. Заказывала вчера, пришли сегодня. Все на высшем уровне, от упаковки, до общения с клиентом, спасибо! Очень понравились ТайДай лосины. Заказывала вчера, пришли сегодня. Все на высшем уровне, от упаковки, до общения с клиентом, спасибо! Очень понравились ТайДай лосины. Заказывала вчера, пришли сегодня. Все на высшем уровне, от упаковки, до общения с клиентом, спасибо!',
        grade: 5,
    },
    {
        img: Product,
        name: 'Ксения Внедорожная',
        reviewsText: 'Очень понравились ТайДай лосины. Заказывала вчера, пришли сегодня. Все на высшем уровне, от упаковки, до общения с клиентом, спасибо!',
        grade: 4,
    }
]




const ReviewsSlider = () => {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
        {
            slides: {
                spacing: 30, 
                perView: 3,
            },
            loop: true,
            rubberband: false,
            vertical: true,
            initial: 1,
            breakpoints: {
                '(max-width:1200px)': {
                    slides: {
                        perView: 3,
                        spacing: 10,
                    },

                },
                '(max-width:992px)': {
                    slides: {
                        perView: 2,
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
                    // item.style.transform = 'scale(1)';
                    item.style.opacity = '1';
                    item.classList.remove(slideItemStyle.small);
                    return
                }

                item.style.opacity = '0.5';
                item.classList.add(slideItemStyle.small);

                if (!isMobile) {
                    item.style.maxWidth = '85%';
                    // item.style.transform = 'scale(0.8)';
                    return
                }
                item.style.maxWidth = '100%';
                // item.style.transform = 'scale(1)';


            });
        }
        slider.on('created', () => {
            slider.slides.forEach((element, idx) => {
                if (slider.track.details.rel + 1 === idx) {
                    element.style.maxWidth = '100%';
                    // element.style.transform = 'scale(1)';

                    element.classList.remove(slideItemStyle.small);
                    return
                }
                element.style.opacity = '0.5';
                element.classList.add(slideItemStyle.small);

                if (!isMobile) {
                    element.style.maxWidth = '85%';
                    // element.style.transform = 'scale(0.8)';
                    return;
                }
                element.style.maxWidth = '100%';
                // element.style.transform = 'scale(1)';
            });
        })
        rotate();
        slider.on('detailsChanged', rotate);
    }, [isMobile]);

    useEffect(() => {
        const checkWidth = () => {
            if (window.innerWidth < 768) {
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
            <div ref={sliderRef} className={cn(s.slider, 'keen-slider')}>
                {mockSliderData.map((item, i) => <SlideItem key={i} {...item} className={cn(`keen-slider__slide number-slide${i + 1}`)} />)}
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