import React from 'react';
import s from './ProductsSlider.module.scss'
import Slider from 'react-slick';
import { useStore } from 'react-redux';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
//imgs
import arrowLeft from '../../../../assets/images/main/productsFitnes/arrowLeft.svg'
import arrowRigt from '../../../../assets/images/main/productsFitnes/arrowRight.svg'
import Image from 'next/image'
//components
import CustomButtonComponent from './CustomButton'
import ProductComponent from './Product'
//types
import { Product } from '@/types/auth'


interface ProductSliderProps {
    products: Product[],
    title: string
}

interface CustomButtonProps {
    img: string
    type: string
}

const ProductSlider = ({ products, title }: ProductSliderProps) => {

    const sliderRef = React.useRef(null);
    const sliderRefNext = React.useRef(null);
    const sliderRefPrev = React.useRef(null);

    const handleClick = (type: string) => {
        if (type === 'next') {
            sliderRef.current.slickNext();
        } else if (type === 'prev') {
            sliderRef.current.slickPrev();
        }
    };
    const [settings, setSettings] = React.useState({
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
    });

    React.useEffect(() => {
        const updateSettings = () => {
            const width = window.innerWidth;
            // if (width < 540) {
            //     setSettings({
            //         ...settings,
            //         slidesToShow: 1,
            //     });
            // } else if (width < 810) {
            //     setSettings({
            //         ...settings,
            //         slidesToShow: 2,
            //     });
            // } else if (width < 930) {
            //     setSettings({
            //         ...settings,
            //         slidesToShow: 2,
            //     });
            // } else if (width < 1300) {
            //     setSettings({
            //         ...settings,
            //         slidesToShow: 3,
            //     });
            // } else {
            //     setSettings({
            //         ...settings,
            //         slidesToShow: 4,
            //     });
            // }
        };

        updateSettings();

        window.addEventListener('resize', updateSettings);

        return () => {
            window.removeEventListener('resize', updateSettings);
        };
    }, []);

    // const settings = {
    //     dots: false,
    //     infinite: true,
    //     speed: 600,
    //     slidesToShow: 4,
    //     slidesToScroll: 1,
    //     nextArrow: sliderRefNext.current,
    //     prevArrow: sliderRefPrev.current,

    //     responsive: [
    //         {
    //             breakpoint: 1300,
    //             settings: {
    //                 slidesToShow: 3,
    //                 slidesToScroll: 1,
    //             }
    //         },
    //     ]
    // }


    return (
        <div className={s.wrapper}>

            <div className={s.tilte_wrapper}>
                <div className={s.title}>
                    {title}
                </div>
                <div className={s.buttons_wrapper}>
                    <button className={`${s.btn_prev} ${s.btn}`} onClick={() => handleClick('prev')}>  </button>
                    <button className={`${s.btn_next} ${s.btn}`} onClick={() => handleClick('next')}>  </button>
                </div>
            </div>

            <div className={s.slider_wrapper}>
                <Slider ref={sliderRef} className={s.slick_wrapper} {...settings}>
                    {products.map((obj) => {
                        return <ProductComponent key={obj.id} product={obj} />
                    })}
                </Slider>
            </div>



        </div>

    );
}

export default ProductSlider;