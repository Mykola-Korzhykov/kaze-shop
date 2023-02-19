import React from "react"
import s from './InputText.module.scss'
import selectIcon from '../../../../../../../assets/icons/cabinetAdmin/selectIcon.svg'
import Image from 'next/image';

interface InputItemProps {
    id: number,
    type: string,
    text: string,
    placeholder: string,
    label?: string
}

export const InputTextItem = ({ id, type, text, placeholder }: InputItemProps) => {

    return (
        <div className={s.wrapper}>
            <div className={s.title}>
                {text}
            </div>
            {type === 'text' ? <input className={s.input} type={type} placeholder={placeholder} /> :
                <label htmlFor="categoruProduct" className={s.select__wrapper}>
                    <Image className={`${s.select_img}`} src={selectIcon} alt="My Image" />
                    <select className={s.select} placeholder={placeholder} name="categoruProduct" id="categoruProduct">
                        <option className={s.p} style={{ 'color': 'red' }} value="" disabled selected>Выберите категорию товара </option>
                    </select>
                </label>
            }
        </div>
    )
}