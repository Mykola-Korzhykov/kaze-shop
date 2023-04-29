import "keen-slider/keen-slider.min.css";

import React from "react";
import SlideItem from '../../Slider/SliderItem/SlideItem';
import s from './ProductSlider.module.scss';
import cn from 'classnames';
import { useAppSelector } from "@/redux/hooks";



const ProductSlider = (): JSX.Element => {
  const product = useAppSelector(store => store.main.lastAddedProduct);
  return (
    <>
      {
        product.map((item, i) => <SlideItem slideHeight={220} {...item}
          className={cn(`keen-slider__slide number-slide${i + 1}`, s.slideItem)}
          key={i}
        />)
      }
    </>
  );
};

export default ProductSlider;
