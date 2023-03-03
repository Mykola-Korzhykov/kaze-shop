import React from "react";
import s from './sizeChart.module.scss'
import { useAppDispatch } from '@/redux/hooks'
import {setSizeChartImageDescription} from '@/redux/slices/formData'
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface SizeChartProps {
    id: number,
    title: string,
    placeholder: string,
    leng: string
}

export const SizeChart = ({title, placeholder, id, leng }: SizeChartProps)=> {

    const dispatch = useAppDispatch()
    const p =  useSelector((state: RootState)=> state.formData.sizeChartImageDescription)
    console.log(p)

    return (
        <label className={s.label} htmlFor={`sizechart${id}`}>

            <div className={s.label_wrapper}>
                <div className={s.title}> {title} </div>
               
                <div className={s.placeholder}>
                    <input onBlur={(e)=>{
                    console.log('value',e.target.value )
                            const payload: any = {branch: `${leng}`, sizeChartImageDescription : e.target.value}
                            dispatch(setSizeChartImageDescription(payload))
                            e.target.value = e.target.value
                        }} placeholder={placeholder}  id={`sizechart${id}`} className={s.input} type="text" />
                </div>
             </div>
          
        </label>
    )
}