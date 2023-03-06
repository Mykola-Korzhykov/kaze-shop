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
    const editProductItemId = useSelector((state: RootState)=>state.admin.editProductItemId )

    const array = [1,2,3,4,5,6,7,8,9,10]
    // const [editProductItemId, setEditProductItemId] = React.useState<number>(-1)
    const activeProductEdit = products.filter((el)=>{
        return el.id === editProductItemId
    })

    return (

      <>
        <div className={ editProductItemId === -1 ? s.wrapper  : s.wrapper_off}>
            {array.map((obj, ind)=>{
                return <Item key={ind}  /> 
            })}
        </div>

        <div className={s.wrapperEditProductItem}>
            {/* передача фото розмеров та цветов от activeProductEdit */}
           <EditProductItem   />            
        </div>


        
    </>
    )

}