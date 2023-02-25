import React from 'react';
import s from './SliderProducts.module.scss'
import { useKeenSlider } from "keen-slider/react"
//import KeenSlider from "keen-slider";
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
//store 
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Product from '../Product';


// const settings = {
//     dots: false,
//     infinite: true,
//     speed: 700,
//     slidesToShow: 3,
//     slidesToScroll: 3,
//     responsive: [
//         {
//             breakpoint: 1200, // настройки для планшета
//             settings: {
//                 slidesToShow: 2,
//                 slidesToScroll: 2,
//                 speed: 600,
//             }
//         },
//     ]
// };

const SliderProducts = () => {

    const [ref] = useKeenSlider<HTMLDivElement>({
        slides: {
          perView: 2,
          spacing: 15,
        },
      })

    console.log('ref', ref)

    const productsLeggings = useSelector((state: RootState) => state.main?.productsLeggings)


    return (

        <div className={s.wrapper}>
            {/* <button onClick={()=> slider.prev()} className={s.btn_next}>next</button> */}

            <div ref={ref} >
                {productsLeggings?.map((obj) => {
                    return <Product key={obj.id} price={obj.price} description={obj.description} img={obj.img} id={obj.id} />
                })}
            </div>

            <div className={s.btn_catalog}>
                В каталог
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.75 12H20.25" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M13.5 5.25L20.25 12L13.5 18.75" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
        </div>

    );
}

export default SliderProducts;
