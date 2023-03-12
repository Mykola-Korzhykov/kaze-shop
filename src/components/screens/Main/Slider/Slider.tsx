import ArrowButton from './ArrowButton/ArrowButton';
import s from './slider.module.scss';

import SlideItem from './SliderItem/SlideItem';
import cn from 'classnames';
import { useKeenSlider } from 'keen-slider/react';
import React from 'react';
import ProductBottomButton from '../ProductBottomButton/ProductBottomButton';
import { SliderInterface } from './Slider.interface';

const Slider = ({ title, items }: SliderInterface): JSX.Element => {
    
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const [sliderRef, instanceRef] = useKeenSlider({
        slides: {
            perView: 4,
            spacing: 30,
        },
        breakpoints: {
            '(max-width: 992px)': {
                slides: {
                    perView: 3,
                    spacing: 30,
                }
            }
        },
        loop: true,
        initial: 0,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
        }
    })
    return (
        <div className={cn(s.slider_box, 'container')}>
            <div className={s.title_box}>
                <h3>{ title}</h3>
                <div>
                    <ArrowButton position='left' onClick={()=>instanceRef.current?.prev()}/>
                    <ArrowButton position='right' onClick={()=>instanceRef.current?.next()} />
                </div>
            </div>
            <div className={cn(s.slider, 'keen-slider')} ref={sliderRef}>
                {items.map((item, i) => {
                    return (
                        <div key={i} className={
                            cn(s.slide_item, `keen-slider__slide number-slide${i + 1}`)} >
                            <SlideItem {...item}>
                                <ProductBottomButton />
                            </SlideItem>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}



export default Slider;