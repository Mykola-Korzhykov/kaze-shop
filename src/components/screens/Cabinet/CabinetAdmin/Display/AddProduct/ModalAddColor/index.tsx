import React from "react"
import s from './ModalAddColor.module.scss'
//redux
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { useAppDispatch } from '@/redux/hooks'


interface ModalAddColorProps {
    setModalAddColor: (n: boolean)=> void,
    modalAddColor: boolean,
}



export const ModalAddColor: React.FC<ModalAddColorProps> = ({setModalAddColor, modalAddColor }) => {

    const dispatch = useAppDispatch()

    return (
        <div className={s.module_wrapper}>
            <div className={s.module_inner}>

            <div onClick={()=> setModalAddColor(false)} className={s.close_modal}>

                <svg className={s.open_icon} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25 7L7 25" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M25 25L7 7" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>


                <div className={s.title_wrapper}>
                    <div className={s.title}>Добавить цвет</div>
                    <div className={s.subtitle}>Для того, чтобы добавить новый цвет, просто напишите его название сюда, и введите цветовой код</div>
                </div>

                <div className={s.inputs_wrapper}>
                    <div className={s.input_inner}>
                        <span className={s.title}>Название цвета</span>
                        <label className={s.label_input_file} htmlFor="colorname">
                            <input id="colorname" className={s.input_file} placeholder='Введите название цвета' type="text" />
                        </label>
                    </div>

                    <div className={s.input_inner}>
                        <span className={s.title}>Цветовой код</span>
                        <label className={s.label_input_file} htmlFor="choosecategoryRU">
                            <input id="choosecategoryRU" className={s.input_file} placeholder='#000000' type="text" />
                        </label>
                    </div>

                    <button className={s.btn_add}>
                        Добавить цветовой код
                    </button>

                </div>
            </div>
        </div>
    )
}