import React from "react";
import s from './EditProduct.module.scss'
import { useSelector } from "react-redux";
import { RootState  } from "@/redux/store";
//components 
import {Item} from './Item'
import {EditProductItem} from '../EditProduct/EditProductItem'
// 



export const EditProduct = () =>{

    const products = useSelector((state: RootState)=>state.admin.products )
    const array = [1,2,3,4,5,6,7,8,9,10]

    const [editProductItemId, setEditProductItemId] = React.useState<number>(-1)
    const activeProductEdit = products.filter((el)=>{
        return el.id === editProductItemId
    })

    return (

      <>
        <div className={ editProductItemId >= 0 ? s.wrapper_off :  s.wrapper}>
            {array.map((obj)=>{
                return <Item setEditProductItemId={setEditProductItemId} />
            })}
        </div>

        <div className={s.wrapperEditProductItem}>
            {/* передача фото розмеров та цветов от activeProductEdit */}
           <EditProductItem   />            
        </div>
    </>
    )

}