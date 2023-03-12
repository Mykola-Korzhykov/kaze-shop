import React from "react";
import s from './ColorItem.module.scss'

interface ColorItemType {
    hex: string
    label: string
}

export const ColorItem = ({hex, label}: ColorItemType) =>{
    return (
        <div className={s.wrapper}>
            <span className={s.color} style={{backgroundColor: `${hex}`}}> </span>
            <span className={s.title}> {label} </span>
            <span className={s.close}>
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.4375 6.5625L6.5625 23.4375" stroke="#9D9D9D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M23.4375 23.4375L6.5625 6.5625" stroke="#9D9D9D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </span>
        </div>
    )
}

