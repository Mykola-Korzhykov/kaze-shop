import React from "react";
import s from './EditProductItem.module.scss'
import { useSelector } from "react-redux";
import { RootState  } from "@/redux/store";
//components 
import {Input} from './Input'



export const EditProductItem = () =>{

    const editProductItemId = useSelector((state: RootState)=> state.admin.editProductItemId)

    const  [inputs, setInputs] = React.useState([
        { id: 0, type: 'text', text: 'Название товара RU', placeholder: 'Введите название товара', name: 'titleRU', disable: false,  },
        { id: 1, type: 'text', text: 'Название товара UA', placeholder: 'Введите название товара', name: 'titleUA', disable: false },
        { id: 2, type: 'text', text: 'Название товара SRB', placeholder: 'Введите название товара', name: 'titleSRB',  disable: false },
        { id: 3, type: 'text', text: 'Название товара ENG', placeholder: 'Введите название товара', name: 'titleENG',disable: false },
        { id: 4, type: 'text', text: 'Описание товара RU', placeholder: 'Введите описание товара', name: 'descriptionRU',disable: false },
        { id: 5, type: 'text', text: 'Описание товара UA', placeholder: 'Введите описание товара', name: 'descriptionUA',disable: false },
        { id: 6, type: 'text', text: 'Описание товара SRB', placeholder: 'Введите описание товара', name: 'descriptionSRB',disable: false },
        { id: 7, type: 'text', text: 'Описание товара ENG', placeholder: 'Введите описание товара', name: 'descriptionENG',disable: false },
        { id: 8, type: 'select', text: 'Категория товара', placeholder: 'Выберите категорию товара ', name: 'text', disable: false },
        { id: 9, type: 'text', text: 'Цена в долларах', placeholder: 'Введите цену', name: 'price', disable: false },
        { id: 10, type: 'text', text: 'Количество товара', placeholder: 'Введите количество товаров', name: 'quantity', disable: false },
        // { id: 8, type: 'text', text: 'Цвет', placeholder: 'Выбрать один цвет фотографии', name: 'text', disable: true, colors: colors },
        //{ id: 9, type: 'text', text: 'Выберите существующий товар', placeholder: 'Выберите существующий товар', label: 'text', disable: true },
    ])

    return (
        <>
        <div style={ editProductItemId >= 1 ? {display : 'flex'} : {display : 'none'}} className={s.wrapper}>
        
        {inputs.map((obj, ind)=>{
            return <div  key={ind} className={s.inputs_wrapper}>
                <Input 
               
                placeholder={obj.placeholder}
                text={obj.text}
                name={obj.name}
                id={obj.id} 
                type={obj.type}
                disable={obj.disable} 
               />
              
            </div>
        })}


       

        

        </div>


        <div className={s.addphoto_wrapper}>
            <span className={s.title}>Добавить фото товара</span>
            <span className={s.btn}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.75 12H20.25" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 3.75V20.25" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

            </span>
        </div>




        </>
    )

 }