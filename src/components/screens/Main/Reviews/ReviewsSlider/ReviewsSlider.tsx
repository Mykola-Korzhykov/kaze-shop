import "keen-slider/keen-slider.min.css";
import Product from '../../../../../assets/images/main/Reviews/Slider/PhotoItem1.png';
import cn from 'classnames';
import { KeenSliderPlugin, useKeenSlider } from 'keen-slider/react';
import SlideItem from "./SlideItem/SlideItem";
import s from './reviewsSlider.module.scss';
import ArrowButton from "../../Slider/ArrowButton/ArrowButton";


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


const carousel: KeenSliderPlugin = (slider) => {
    const z = 300
    function rotate() {
        const activeSlide = slider.track.absToRel(slider.track.details.abs);
        const width = slider.container.clientHeight / 3;

        slider.slides.forEach((item, i) => {

            // if (activeSlide >= i) {
            //     item.style.width = '70%';
            // } else if (activeSlide <= i) {
            //     item.style.width = '70%'
            // } else {
            //     item.style.width = '100%'
            // }
            const prev = activeSlide === 0 ? 0 : activeSlide - 1;
            const next = activeSlide + 1;
            const minWidth = item.clientWidth / 100 * 70;
            const maxWidth = slider.container.clientWidth;
            const track = slider.track.details.progress * 100;
            // if (track) {
            //     item.style.maxWidth = (item.clientWidth + 1) + 'px';

            // }
            // if (next === i && item.clientWidth > minWidth) {
            //     item.style.maxWidth = item.clientWidth - 1 + 'px';
            // }
            console.log(track / 5, slider.track.details.position)
        })
    }
    slider.on('created', () => {
        const activeSlide = slider.track.absToRel(slider.track.details.abs);

        slider.slides.forEach((element, idx) => {
            if (activeSlide !== idx) {
                return
            }
            // element.style.maxWidth = '600px';

        })
        // rotate()
    })
    slider.on('detailsChanged', rotate)
    // slider.on('animationStopped', rotate)

}

const ReviewsSlider = () => {
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
        {
            slides: {
                perView: 3,
                spacing: 30,
            },
            loop: true,
            rubberband: false,
            vertical: true,
            initial: 0,
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
            }

        },
        [carousel]
    );
    return (
        <div className={s.wrapper}>
            <div ref={sliderRef} className={cn(s.slider, 'keen-slider')}>
                {mockSliderData.map((item, i) => <SlideItem key={i} {...item} className={cn(`keen-slider__slide number-slide${i + 1}`)} />)}
            </div>
            <div className={s.slider_btn}>
                <ArrowButton position="up" onClick={() => instanceRef.current?.next()} />
                <ArrowButton position="down" onClick={() => instanceRef.current?.prev()} />
            </div>
        </div>

    )
}

export default ReviewsSlider;