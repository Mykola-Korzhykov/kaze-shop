import React from "react"
import s from './SizesItem.module.scss'
//redux
import { useAppDispatch } from '@/redux/hooks'
// import {removeSizes} from '../../../../../../../redux/slices/admin'
import { removeSizes} from '../../../../../../../redux/slices/formData'


interface SizeItemPropsType {
    size: string, 
    id: number
}

export const SizeItem = ({size, id}: SizeItemPropsType) => {

    const dispatch = useAppDispatch()

 return(
    <div onClick={()=>{dispatch(removeSizes(size))}} className={s.wrapper}>
        <span  className={s.size}>
            {size}
        </span>
        <span   className={s.remove}>
            <svg className={s.remove_icon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.75 5.25L5.25 18.75" stroke="#9D9D9D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18.75 18.75L5.25 5.25" stroke="#9D9D9D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </span>
    </div>
 ) 
}