import React from 'react'
import Slider from "react-slick";
import s from './Reviews.module.scss'
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
//imgs
import photoReviews from '../../../../assets/images/main/Reviews/photo.svg'
//slider keen
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"


const LocalSlider = () => {

    const [ref] = useKeenSlider<HTMLDivElement>({
        loop: true,
        slides: {
            origin: "center",
            perView: 2,
            spacing: 10,
        },
        vertical: true,
    })

    const reviewsArr = useSelector((state: RootState) => state.main?.reviews)



    return (
        <div ref={ref} className={s.keen_slider}>

            {reviewsArr.map((obj) => {
                return <div key={obj.id} className={`${s.keen_slider__slide} ${s.number_slide1}`} >
                    <Image src={obj.photo} alt='photo' />
                    <div className={s.description_wrapper}>
                        <div className={s.name}>
                            {obj.name}
                        </div>
                        <div className={s.text}>
                            {obj.text}
                        </div>
                        <div className={s.rating}>
                            {obj.rating}
                        </div>
                    </div>
                </div>
            })}

        </div>
    );
};




const Reviews = () => {

    return (
        <div className='container'>
            <div className={s.wrapper}>

                <div className={s.photo_wrapper}>
                    <span className={s.title}>Отзывы</span>
                    <Image src={photoReviews} alt='photo' />
                </div>
                <div className={s.slider_wrapper}>
                    <LocalSlider />
                </div>
            </div>
        </div>
    );
};

export default Reviews;

// const Reviews = () => {

//     return (
//         <div className={s.wrapper}>

//         </div>

//     )
// }

// export default Reviews


