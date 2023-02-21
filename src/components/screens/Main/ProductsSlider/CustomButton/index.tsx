import React from 'react';
import { useStore } from 'react-redux';
import s from './CustomButton.module.scss'
import Image from 'next/image';
import Slider from 'react-slick';

interface CustomButtonProps {
    img: string
    type: string
}

const CustomButton = ({ type, img }: CustomButtonProps) => {
    //@ts-ignore
    const slider = useStore().getState().slider;

    const handleClick = () => {
        if (type === 'next') {
            slider.current.slickNext();
        } else if (type === 'prev') {
            slider.current.slickPrev();
        }
    };

    return (
        <button className={s.button} onClick={handleClick}> <Image src={img} alt='arrow' /> </button>
    );
};

export default CustomButton