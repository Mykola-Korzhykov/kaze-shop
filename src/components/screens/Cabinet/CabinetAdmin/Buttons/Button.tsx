import React from "react";
import s from './Button.module.scss';
import Image from 'next/image';
import Link from "next/link";
//types
import { ButtonType } from '../../../../../types/auth'


interface ButtonProps {
    id: number,
    img_grey: string,
    img_white: string,
    text: string,
    chengeDisplayOK: (n: number) => void
}

export const Button: React.FC<ButtonProps> = ({ id, text, img_grey, img_white, chengeDisplayOK }) => {
    // console.log(id)
    return (

        <div onClick={() => chengeDisplayOK(id)} className={s.wrapper}>
            <button className={id === 6 ? `${s.button} ${s.button7}` : `${s.button}`}>
                {/* <span className={`${s.img} ${s.img_id}`}></span> */}
                <Image className={`${s.img_grey}`} src={img_grey} alt="My Image" />
                <Image className={`${s.img_white}`} src={img_white} alt="My Image" />
                <div className={s.text}>{text}</div>
            </button>
        </div>

    )
}


