import "keen-slider/keen-slider.min.css";

import React from "react";
import SlideItem from "../../Slider/SliderItem/SlideItem";
import Product from '../../../../../assets/images/main/products/product1.png';

import cn from 'classnames';


const mockSliderProps = [
  {
    img: Product,
    title: 'Лосины ТайДай',
    price: '78$',
  },
  {
    img: Product,
    title: 'Лосины ТайДай',
    price: '78$',
  },
  {
    img: Product,
    title: 'Лосины ТайДай',
    price: '78$',
  },
  {
    img: Product,
    title: 'Лосины ТайДай',
    price: '78$',
  },
  {
    img: Product,
    title: 'Лосины ТайДай',
    price: '78$',
  },
  {
    img: Product,
    title: 'Лосины ТайДай',
    price: '78$',
  }
]

const ProductSlider = (): JSX.Element => {

  return (
    <>
      {
        mockSliderProps.map((item, i) => <SlideItem {...item}
          className={cn(`keen-slider__slide number-slide${i + 1}`)}
          key={i}
        />)
      }
    </>
  );
};

export default ProductSlider;
