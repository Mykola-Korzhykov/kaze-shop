import React from "react";
import s from './EditProduct.module.scss'
import { useSelector } from "react-redux";
import { RootState  } from "@/redux/store";
//components 
import {Item} from './Item'


export const EditProduct = () =>{

    const products = useSelector((state: RootState)=>state.admin.products )
    const array = [1,2,3,4,5,6,7,8,9,10]

    return (
        <div className={s.wrapper}>
            {array.map((obj)=>{
                return <Item />
            })}
        </div>
    )

}