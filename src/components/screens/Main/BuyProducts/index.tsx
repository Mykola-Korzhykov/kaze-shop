import React from 'react'
import s from './BuyProducts.module.scss'
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Product from './Product'
//imgs
import { CSSTransition } from 'react-transition-group';
import SliderProducts from '../BuyProducts/SliderProducts'

import product1 from '../../../assets/images/main/products/product1.svg'
import product2 from '../../../assets/images/main/products/product2.svg'
import product3 from '../../../assets/images/main/products/product3.svg'

const BuyProducts = () => {


    const productsLeggings = useSelector((state: RootState) => state.main?.productsLeggings)
    let [slide, setSlide] = React.useState(0)

    return (

        <div className={s.wrapper}>
            <div className={s.wrapper_slider}>
                <SliderProducts />
            </div>

            <div className={s.backround_for_mobile}></div>


            <div className={s.text_wrapper}>
                <div className={s.text_mobile}>
                    <span className={s.transparent_text_mobile}>БУДЬ</span>
                    <span className={s.white_text_mobile}>СОБОЙ</span>
                </div>
            </div>



            <div className={s.inner__wrapper}>
                <div className={s.inner_nav}>
                    <span className={s.nav_text_1}>Повседневное  белье</span>
                    <span className={s.nav_text_2}>Велосипедки</span>
                    <button className={s.nav_btn}>
                        купить
                        <svg className={s.arrow} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.75 12H20.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M13.5 5.25L20.25 12L13.5 18.75" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
                <div className={s.inner_text}>
                    <span className={s.text}>
                        <span className={s.transparent_text}>БУДЬ</span>
                        <span className={s.white_text}>СОБОЙ</span>
                    </span>
                </div>
                <div className={s.inner_collection}>

                    {/* <button onClick={() => {
                        // console.log(slide)
                        // setSlide(slide === 210 * (productsLeggings.length - 3) ? 0 : slide + 210)
                    }} className={s.btn}>
                        <svg className={s.btn_arrow} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 16H27" stroke="#0B0B0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M18 7L27 16L18 25" stroke="#0B0B0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button> */}

                    <div className={s.collection_wrapper}>

                        <div className={s.products_wrapper} style={{ transform: `translateX(-${slide}px)` }}>

                            {/* {productsLeggings?.map((obj) => {
                                    return <Product key={obj.id} price={obj.price} description={obj.description} img={obj.img} id={obj.id} />
                            })} */}
                        </div>

                    </div>

                </div>
            </div>

            <div className={s.wrapper_slider_mobile}>
                <div className={s.inner_slider}>
                    <div className={s.slider}>
                        {/* <SliderProducts /> */}
                    </div>
                </div>

            </div>
        </div>

    )
}

export default BuyProducts