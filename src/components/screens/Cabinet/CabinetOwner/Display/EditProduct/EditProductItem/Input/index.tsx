import React from "react";
import s from './Input.module.scss'
import { useSelector } from "react-redux";
import { RootState ,  } from "@/redux/store";
import { useAppDispatch } from '@/redux/hooks'
import { setCategories, setDescription, setPrice, setQuantity, setTitle } from "@/redux/slices/formData";
import Image from 'next/image';
import selectIcon from '../../../../../../../../assets/icons/cabinetAdmin/selectIcon.svg'
//components 

interface InputProps {
    text: string,
    placeholder: string,
    name: string,
    id: number,
    type: string,
    disable: boolean,
    // price: number
}

export const Input = ({text, placeholder, name, id, type, disable,}: InputProps) =>{

    const dispatch = useAppDispatch()
    const [categoriesDisplay, setCategoriesDisplay] = React.useState<boolean>(false)
    const categoryArr = useSelector((state: RootState)=> state.admin.categoryArr)
    
    
    function handleBlurSet(event: any) {
        
        if(event.target.name === 'titleRU' ){
            const payload: any = {branch: 'ru', title: event.target.value}
            dispatch(setTitle(payload)) 
        }
        if(event.target.name === 'titleUA' ){
            const payload: any = {branch: 'ua', title: event.target.value}
            dispatch(setTitle(payload)) 
        }
        if(event.target.name === 'titleSRB' ){
            const payload: any = {branch: 'rs', title: event.target.value}
            dispatch(setTitle(payload)) 
        }
        if(event.target.name === 'titleENG' ){
            const payload: any = {branch: 'en', title: event.target.value}
            dispatch(setTitle(payload)) 
        }
        //descriptionRU
        if(event.target.name === 'descriptionRU'){
            const payload: any = {branch: 'ru', description: event.target.value}
            dispatch(setDescription(payload)) 
        }
        if(event.target.name === 'descriptionUA'){
            const payload: any = {branch: 'ua', description: event.target.value}
            dispatch(setDescription(payload)) 
        }
        if(event.target.name === 'descriptionSRB'){
            const payload: any = {branch: 'rs', description: event.target.value}
            dispatch(setDescription(payload)) 
        }
        if(event.target.name === 'descriptionENG'){
            const payload: any = {branch: 'en', description: event.target.value}
            dispatch(setDescription(payload)) 
        }
         //quantity
        if(event.target.name === 'quantity'){
            const payload: number = event.target.value
            dispatch(setQuantity(Number(payload))) 
        }
       //price
       if(event.target.name === 'price'){
            const payload: number = event.target.value
            dispatch(setPrice(Number(payload))) 
        }
        //setQuantity
        // console.log('titleDescription', titleDescription)
        // console.log('titleStore' , titleStore)
        // console.log('obj',event.target.name )
        // console.log('Пользователь закончил ввод:', event.target.value);
      }

    //   { id: 9, type: 'text', text: 'Цена в долларах', placeholder: 'Введите цену', name: 'price', disable: false },
    //   { id: 10, type: 'text', text: 'Количество товара', placeholder: 'Введите количество товаров', name: 'quantity', disable: false },

    return (
        <div className={s.wrapper}>

        {disable == false && type === 'text' ?  <div className={s.wrapper}>
            <div className={s.title}>{text}</div>
            <input onBlur={handleBlurSet}  className={s.input} type={type} placeholder={placeholder !== 'Введите название товара' && placeholder !== 'Введите описание товара' ?  placeholder : placeholder } name={name}/>
        </div> : '' }
        {/* next */}

        {/* {disable == false && type === 'text' ?  <div className={s.wrapper}>
            <div className={s.title}>{text}</div>
            <input onBlur={handleBlurSet}  className={s.input} type={type} placeholder={placeholder !== 'Введите цену' && placeholder !== 'Введите количество товаров' ? 'какие - то данные ' : placeholder  } name={name}/>
        </div> : '' }
        next */}
        {disable == true  && type === 'text' && placeholder === 'Выберите существующий товар' ?  <input onClick={()=> console.log('p')} style={{cursor: 'pointer'}} readOnly className={s.input} type={type} placeholder={placeholder} /> : ''}
        {/* next */}




        {type === 'select' ?  
        
        <label className={s.select__wrapper} htmlFor="selectCategory">
             <div className={s.title}>{text}</div>
            <input
            onClick={(e) => {
                console.log('[[[[[');
                setCategoriesDisplay(!categoriesDisplay);
            }}
            id='selectCategory'
            readOnly
            className={s.input_category}
            type={type}
            placeholder={placeholder}
            />
            <Image className={`${s.select_img}`} src={selectIcon} alt="My Image" />
            <div className={categoriesDisplay ? s.categorychose_wrapper : s.categorychose_wrapper_off}>
            {categoryArr?.map((el, ind) => {
                return el.id !== 0.1 ? (
                <div
                    onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('item');
                    console.log(el.id);
                    setCategoriesDisplay(!categoriesDisplay);
                    dispatch(setCategories(el.id));
                    }}
                    key={ind}
                    className={s.categorychose_item}
                >
                    <span> {el.title} </span>
                </div>
               
                ) : (
                    ''
                // <div
                //     onClick={(e) => {
                //     e.preventDefault();
                //     e.stopPropagation();
                //     //   setModalAddCAtegory(true);
                //     setCategoriesDisplay(!categoriesDisplay);
                //     }}
                //     key={ind}
                //     className={s.categorychose_add}
                // >
                //     <span className={s.categorychose_img}>
                //     <svg
                //         className={s.plus}
                //         width="24"
                //         height="24"
                //         viewBox="0 0 24 24"
                //         fill="none"
                //         xmlns="http://www.w3.org/2000/svg"
                //     >
                //         <path
                //         d="M3.75 12H20.25"
                //         stroke="#9D9D9D"
                //         stroke-width="1.5"
                //         strokeLinecap="round"
                //         strokeLinejoin="round"
                //         />
                //         <path
                //         d="M12 3.75V20.25"
                //         stroke="#9D9D9D"
                //         stroke-width="1.5"
                //         strokeLinecap="round"
                //         strokeLinejoin="round"
                //         />
                //     </svg>
                //     </span>
                //     <span className={s.categorychose_item_add}>Добавить категорию</span>
                // </div>
                );
            })}
            </div>
        </label> : (
            <div></div>
        )}

        


        </div>
    )

}