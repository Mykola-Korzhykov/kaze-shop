import React from "react"
import s from './ModalAddCategory.module.scss'
//redux
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { useAppDispatch } from '@/redux/hooks'


interface ModalAddCategoryProps {
    setModalAddCAtegory: (n: boolean)=> void,
    modalAddCAtegory: boolean,
}



export const ModalAddCategory = ({setModalAddCAtegory, modalAddCAtegory }: ModalAddCategoryProps) => {

    const dispatch = useAppDispatch()

    return (
        <div className={s.module_wrapper}>
            <div className={s.module_inner}>

            <div onClick={()=> setModalAddCAtegory(false)} className={s.close_modal}>

                <svg className={s.open_icon} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25 7L7 25" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M25 25L7 7" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>


                <div className={s.title_wrapper}>
                    <div className={s.title}>Добавить категорию</div>
                    <div className={s.subtitle}>Для того, чтобы добавить новую категорию на сайт, просто напишите ее название на четырех языках в полях ниже</div>
                </div>

                <div className={s.inputs_wrapper}>
                    <div className={s.input_inner}>
                        <span className={s.title}>Категория (Украинский)</span>
                        <label className={s.label_input_file} htmlFor="choosecategoryUA">
                                
                            <input id="choosecategoryUA" className={s.input_file} placeholder='Введите категорию' type="text" />
                        </label>
                    </div>

                    <div className={s.input_inner}>
                        <span className={s.title}>Категория (Русский)</span>
                        <label className={s.label_input_file} htmlFor="choosecategoryRU">
                           
                            <input id="choosecategoryRU" className={s.input_file} placeholder='Введите категорию' type="text" />
                        </label>
                    </div>

                    <div className={s.input_inner}>
                        <span className={s.title}>Категория (Английский)</span>
                        <label className={s.label_input_file} htmlFor="choosecategoryEN">
                           
                            <input id="choosecategoryEN" className={s.input_file} placeholder='Введите категорию' type="text" />
                        </label>
                    </div>

                    <div className={s.input_inner}>
                        <span className={s.title}>Категория (Сербский)</span>
                        <label className={s.label_input_file} htmlFor="choosecategoryRS">
                           
                            <input id="choosecategoryRS" className={s.input_file} placeholder='Введите категорию' type="text" />
                        </label>
                    </div>

                    <button className={s.btn_add}>
                        Добавить категорию
                    </button>

                </div>
            </div>
        </div>
    )
}