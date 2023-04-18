import React from 'react';
import { CountButtonProps } from './CountButton.interface';
import PlusSVG from '../../../../assets/icons/cart/pricePlus.svg';
import MinusSVG from '../../../../assets/icons/cart/priceMinus.svg';
import s from './CountButton.module.scss';
import Image from 'next/image';

const CountButton = ({ countType, onClick }: CountButtonProps): JSX.Element => {
    return (
        <button className={s.countBtn} onClick={onClick}>
            {countType === 'plus' && <Image src={PlusSVG} alt='icon' />}
            {countType === 'minus' && <Image src={MinusSVG} alt='icon' />}
        </button>
    );
};

export default CountButton;