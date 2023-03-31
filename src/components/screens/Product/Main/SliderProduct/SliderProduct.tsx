import s from './sliderProduct.module.scss';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import ArrowButton from '@/components/screens/Main/Slider/ArrowButton/ArrowButton';
import { SliderProductInterface } from './SliderProduct.interface';
import Image from 'next/image';
import cn from 'classnames';


const Slider = ({ images, className, ...props }: SliderProductInterface) => {
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        slides: {
            perView: 2,
            spacing: 15,
        },
        breakpoints: {
            '(max-width:1200px)': {
                slides: {
                    perView: 1,
                    spacing: 0,
                },
            },
            '(max-width:992px)': {
                slides: {
                    perView: 2,
                    spacing: 10,
                },
            },
            '(max-width:768px)': {
                slides: {
                    perView: 1,
                    spacing: 0,
                },
            }
        },
        loop: true,
    });

    return (
        <div className={cn(s.slider, className)} {...props}>
            <div className={s.slider_btn}>
                <ArrowButton position='left' onClick={() => instanceRef.current?.prev()} />
                <ArrowButton position='right' onClick={() => instanceRef.current?.next()} />
            </div>
            <div ref={sliderRef} className='keen-slider'>
                {images.map((item, i) => {
                    return <Image key={i} src={item} priority={true} width={180} height={222} alt={`slide ${i + 1}`}
                        className={`keen-slider__slide number-slide${i}`} quality={100} />
                })}
            </div>

        </div>
    );
};

export default Slider;