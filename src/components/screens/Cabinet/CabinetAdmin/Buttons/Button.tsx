import React from "react";
import s from './Button.module.scss'
import Image from 'next/image';
//types
import { ButtonType } from '../../../../../types/auth'



export const Button: React.FC<ButtonType> = ({ id, text, img_grey, img_white }) => {

    return (
        <div className={s.wrapper}>
            <button className={id === 7 ? `${s.button} ${s.button7}` : `${s.button}`}>
                {/* <span className={`${s.img} ${s.img_id}`}></span> */}
                <Image className={`${s.img_grey}`} src={img_grey} alt="My Image" />
                <Image className={`${s.img_white}`} src={img_white} alt="My Image" />
                <div className={s.text}>{text}</div>
            </button>
        </div>
    )
}