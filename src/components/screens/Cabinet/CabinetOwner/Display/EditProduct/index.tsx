import React from "react";
import s from './EditProduct.module.scss'
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/redux/hooks";
import { fetchGoods } from "@/redux/slices/goods";
import { RootState  } from "@/redux/store";
//components 
import {Item} from './Item'
import {EditProductItem} from './EditProductItem'
// 

export const EditProduct = () =>{
    const dispatch = useAppDispatch()
    const products = useSelector((state: RootState)=>state.admin.editProducts)
    const editProductItemId = useSelector((state: RootState)=>state.admin.editProductItemId )
    const [activeId, setActiveId] = React.useState(0)

    const array = [1,2,3,4,5,6,7,8,9,10]
    // const [editProductItemId, setEditProductItemId] = React.useState<number>(-1)
    const activeProductEdit = products.filter((el)=>{
        return el.id === activeId
    })

    // console.log('activeProductEdit', activeProductEdit)
    React.useEffect(() => {
        dispatch(fetchGoods())
    }, [])
    return (

      <>
        <div className={ editProductItemId === -1 ? s.wrapper  : s.wrapper_off}>
            {products.map((obj, ind)=>{
                return <Item  
                photo={obj.images[0].fileNames[0]} 
                price={obj.price} id={obj.id} 
                setActiveId={setActiveId} 
                title={obj.title.ua}
                key={ind} 
            /> 
            })}
        </div>

        {/* передача фото розмеров та цветов от activeProductEdit */}

        <div className={s.wrapperEditProductItem}>
           <EditProductItem  id={activeId}  />            
        </div>
    </>
    )

}