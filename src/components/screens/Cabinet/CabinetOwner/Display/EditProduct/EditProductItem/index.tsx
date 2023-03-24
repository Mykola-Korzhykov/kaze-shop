import React from "react";
import s from './EditProductItem.module.scss'
import { useSelector } from "react-redux";
import { RootState  } from "@/redux/store";
import {addCountPhotos} from '../../../../../../../redux/slices/admin'
import {setModalAddEditProduct} from '../../../../../../../redux/slices/modal'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { InputTextItem } from "../../AddProduct/InputText";
import photoTest from '../../../../../../../assets/images/product/slider/photo.png'
import photo from '../../../../../../../assets/images/admin/img.png'
import Image from "next/image";
import openInput from '../../../../../../../assets/icons/cabinetAdmin/open_input.svg'
//components 
import {Input} from './Input'
import {SizeItem} from '../../AddProduct/SizesItem'
import {ColorItem} from '../../AddProduct/ColorItem'
import {SizeChart} from '../../../Display/AddProduct/sizeChart'
//types 
import {Goods} from '../../../../../../../types/goods'
import {ImageData}  from '../../../../../../../types/goods'

interface EditProductItemType {
    id: number,
    // price: number
}

export const EditProductItem = ({id, }: EditProductItemType) =>{

    

    const dispatch = useAppDispatch()
    
    const [choiseSize, setChoiseSize] = React.useState<boolean>(false)
    const [choiceColors, setChoiceColors] = React.useState<boolean>(false)
    const sizesItems = useSelector((state: RootState)=> state.admin.sizesItems)
    const userEdit = useSelector((state: RootState)=> state.admin.userEdit)
    // console.log('EditProductItemID', id)

    const editProductItemId = useSelector((state: RootState)=> state.admin.editProductItemId)
    const products = useSelector((state: RootState)=>state.admin.editProducts)
    const colors = useSelector((state: RootState)=>state.goods.fetchedColours)
     const goods = useSelector((state: RootState)=>state.goods.goods)
    //chosen product
    const activeProduct = products.find((el)=>{
        return el.id === editProductItemId
    })
    // console.log('userEdit', userEdit.images[0].imagesPaths)

    interface ImageData {
        imagesPaths: string[];
        record: Record<string, string>;
        sizes: string[];
    }

    React.useEffect(()=>{
        
    }, [])

    const SizeChartArr = [
        {id: 1, title: ' Описание размерной сетки UA', placeholder: 'Введите описание размерной сетки', leng: "ua"},
        {id: 2, title: ' Описание размерной сетки RU', placeholder: 'Введите описание размерной сетки', leng: "ru"},
        {id: 3, title: ' Описание размерной сетки SRB', placeholder: 'Введите описание размерной сетки', leng: "rs"},
        {id: 4, title: ' Описание размерной сетки ENG', placeholder: 'Введите описание размерной сетки', leng: "en"},
    ]

    // const [arrPhotos, setArrPhotos] = React.useState<any>([...userEdit.images])
    // console.log('arrPhotos', arrPhotos)

  

    const  [inputs, setInputs] = React.useState([
        { id: 0, type: 'text', text: 'Название товара RU', placeholder: 'Введите название товара', name: 'titleRU', disable: false,  value: activeProduct?.title?.ru },
        { id: 1, type: 'text', text: 'Название товара UA', placeholder: 'Введите название товара', name: 'titleUA', disable: false ,value: activeProduct?.title?.ua},
        { id: 2, type: 'text', text: 'Название товара SRB', placeholder: 'Введите название товара', name: 'titleSRB',  disable: false ,value: activeProduct?.title?.rs},
        { id: 3, type: 'text', text: 'Название товара ENG', placeholder: 'Введите название товара', name: 'titleENG',disable: false ,value: activeProduct?.title?.en},
        { id: 4, type: 'text', text: 'Описание товара RU', placeholder: 'Введите описание товара', name: 'descriptionRU',disable: false ,value: activeProduct?.description?.ru},
        { id: 5, type: 'text', text: 'Описание товара UA', placeholder: 'Введите описание товара', name: 'descriptionUA',disable: false ,value: activeProduct?.description?.ua},
        { id: 6, type: 'text', text: 'Описание товара SRB', placeholder: 'Введите описание товара', name: 'descriptionSRB',disable: false ,value: activeProduct?.description?.rs},
        { id: 7, type: 'text', text: 'Описание товара ENG', placeholder: 'Введите описание товара', name: 'descriptionENG',disable: false ,value: activeProduct?.description?.en},
        { id: 8, type: 'select', text: 'Категория товара', placeholder: 'Выберите категорию товара ', name: 'text', disable: false ,value: activeProduct?.categories[0]?.ru},
        { id: 9, type: 'text', text: 'Цена в долларах', placeholder: 'Введите цену', name: 'price', disable: false ,value: activeProduct?.price},
        { id: 10, type: 'text', text: 'Количество товара', placeholder: 'Введите количество товаров', name: 'quantity', disable: false ,value: activeProduct?.quantity},
        // { id: 8, type: 'text', text: 'Цвет', placeholder: 'Выбрать один цвет фотографии', name: 'text', disable: true, colors: colors },
        //{ id: 9, type: 'text', text: 'Выберите существующий товар', placeholder: 'Выберите существующий товар', label: 'text', disable: true },
    ])

    interface InputsStateValidType {
        [key: number]: boolean;
    }
    const inputsStateInition =  inputs.reduce((accumulator, currentValue) => {
        accumulator[currentValue.id] = true;
        return accumulator;
    }, {} as InputsStateValidType)

    const [inputsState, setInputsState] = React.useState<InputsStateValidType>(inputsStateInition)

    return (
        <>
        <div  style={ editProductItemId >= 1 ? {display : 'block'} : {display : 'none'}}  >

        <div style={ editProductItemId >= 1 ? {display : 'flex'} : {display : 'none'}} className={s.wrapper}>
        
        {inputs.map((obj, ind)=>{
            return <div  key={ind} className={s.inputs_wrapper}>
                <Input 
                // price={price}
                placeholder={obj.placeholder}
                text={obj.text}
                name={obj.name}
                id={obj.id} 
                type={obj.type}
                disable={obj.disable} 
                setInputsState={setInputsState}
                inputsState={inputsState}
               />
            </div>
        })}
        </div>

        <div className={s.addphoto_wrapper}>
            <span className={s.title}>Добавить фото товара</span>
            <span className={s.btn }  onClick={(e)=>{
                console.log('click')
                // e.stopPropagation()
                //@ts-ignore
                dispatch(addCountPhotos()) 
            }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.75 12H20.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 3.75V20.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

            </span>
        </div>

       {/* мепаю вофо существующих товаров  */}

       <div className={s.photos_wrapper}>

       {/* {userEdit.images.map((el: any, ind: number) => {
            return (
                <div className={s.item}>
                    <span className={s.index}>{ind}</span>
                    <span className={s.button_product}>lflflfllflflf</span>
                    <div className={s.photos_wrapper}>
                        {el.imagesPaths.map((el: any)=>{
                            return  <span className={s.photo_wrapper}>
                                        <Image src={el} alt={'photo'}/>
                                    </span>
                        })}
                    </div>
                </div>
            );
        })} */}

        {userEdit.images.map((el, ind)=>{
            return  <div key={ind}  className={s.item}>
                        <div className={s.info_wrapper}>
                            <span className={s.index}>{`${ind + 1}.`}</span>  

                           { el !== null ? <span className={s.button_product}
                                    style={{
                                        color:  `${el.colour.hex}` ,
                                        border:  `${el.colour.hex} solid 1.5px`,
                                        
                                    }} 
                                        > Удалить сет</span> : 

                                        <span  style={{
                                            color:  '#0B0B0B',
                                            border: '#0B0B0B solid 1.5px',
                                            
                                        }} 
                                        className={s.button_product_add}
                                        onClick={()=> {
                                            dispatch(setModalAddEditProduct(true))
                                        }}
                                        > Загрузить фото </span>
                                        
                            } 
                        </div>
                        
                            {el &&   
                            <div className={s.photos_wrapper}>
                                {el.imagesPaths.map((el: any, ind)=>{
                                    return  <span key={ind} className={s.photo_wrapper}>
                                                <Image  
                                                src={el}
                                                alt={'photo'}
                                                width={70}
                                                height={102}
                                                />
                                            </span>
                                })}
                            </div>} 
                           
                    </div>
        })}

       </div>

        <div className={s.net_wrapper}>

            <div className={s.net_inputs}>
                <div className={s.input_wrapper}>
                    <span className={s.net_title}>
                        Описание размерной сетки UA
                    </span>
                    <input value={ activeProduct?.title?.ru}  placeholder="Введите описание" className={s.input_inner} type="text" />
                </div>
                <div className={s.input_wrapper}>
                    <span className={s.net_title}>
                        Описание размерной сетки RU
                    </span>
                    <input value={ activeProduct?.title?.ua} placeholder="Введите описание" className={s.input_inner} type="text" />
                </div>
            </div>

            <div className={s.net_inputs}>
                <div className={s.input_wrapper}>
                    <span className={s.net_title}>
                        Описание размерной сетки SRB
                    </span>
                    <input defaultValue={ activeProduct?.title?.ua} placeholder="Введите описание" className={s.input_inner} type="text" />
                </div>
                <div className={s.input_wrapper}>
                    <span className={s.net_title}>
                        Описание размерной сетки SRB
                    </span>
                    <input  value={ activeProduct?.title?.ua} placeholder="Введите описание" className={s.input_inner} type="text" />
                </div>
            </div>

        {/* {SizeChartArr.map((obj)=>{
                        return <SizeChart 
                        key={obj.id} 
                        leng={obj.leng} 
                        id={obj.id} 
                        placeholder={obj.placeholder} 
                        title={obj.title} 
                        // valid={validChartState[obj.id] }
                        // setValid={setValidChartState}
                        />
                    })} */}

          {/* <div className={s.desription_net_wrapper}>
            <span className={s.title}>Описание размерной сетки</span>
            <input className={s.input} name="desription_net" type="text" placeholder={'Описание размерной сетки'} />
          </div> */}

        </div>

        <div className={s.file_net_wrapper}>
            <span className={s.title}>Загрузите размерную сетку</span>
            <label className={s.label} htmlFor="uploadnet">
                Изменить размерную сетку
            </label>
            <input className={s.input_file} id='uploadnet' name="net_file" type="file"  />
          </div>

        {/* размер товара делаю интуп и СЕТАЮ существующие в отдельную переменную , меняю ее в редактировке и отправляю при отправке */}

        <div className={s.choice_size_wrapper}>
            <span  className={s.choice_size_title}>
                Размер товара
            </span>
           <label className={s.choice_size_label} onClick={()=>{
                setChoiseSize(!choiseSize)
           }}  htmlFor="choisesize">
                Выберите размер
                <input onClick={()=>{
                setChoiseSize(!choiseSize)
           }} className={s.input_colours} disabled id='choisesize' placeholder="Выберите размер" type="text"   />
                <Image className={choiseSize ? `${s.input_icon_on} ${s.input_icon}` : `${ s.input_icon_off} ${s.input_icon}` } src={openInput} alt='error' />
           </label>

           <div className={ choiseSize ?  s.choise_set_wrapper :  s.choise_set_wrapper_off }>
                {sizesItems.map((el, ind)=>{
                    return <div  key={ind} className={s.choise_set_item}>
                        <span className={s.choise_set_title}>
                            {el.size}
                        </span>
                    </div>
                })}
           </div>

           <div className={s.selected_sizes}>
                {userEdit?.sizes.map((el, ind)=>{
                    return <span className={s.selected_sizes_item} key={ind}  > 
                            <SizeItem key={ind} id={ind} size={el} />
                        </span>
                })}
           </div>

        </div>


            <div onClick={()=>{
                setChoiceColors(!choiceColors)
                // console.log('click')
                }} className={s.colours_select_wrapper}>
                <div className={s.title}>
                    Цвет товара
                </div>
                <label className={s.label_colors} htmlFor="colorsbyproduct">
                    Выберите цвет
                    <input onClick={(e) => {
                        e.stopPropagation();
                    }}  className={s.input_colors} id="colorsbyproduct" type="text" />
                    <Image className={choiseSize ? `${s.input_icon_on} ${s.input_icon}` : `${ s.input_icon_off} ${s.input_icon}` } src={openInput} alt='error' />
                </label>
                <div className={ choiceColors? s.choice_colors_wrapper : s.choice_colors_wrapper_off }>
                    {colors.map((el, ind)=>{
                        return <div key={ind} className={s.item_wrapper}>
                            <span 
                                style={{
                                    marginLeft: '20px',
                                    backgroundColor: `${el.hex}`,
                                    display: 'block',
                                    height: '23px',
                                    width: '23px'
                                }}
                                className={s.color}
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                            />
                            <span
                                className={s.title}
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                            >
                                {el.ua}
                            </span>
                        </div>
                    })}
                </div>


            </div>

            <div className={s.select_colors_wrapper}>
                     {userEdit.colours?.map((el, ind)=>{
                        return < ColorItem key={ind} hex={el.hex} label={el.ua} /> 
                     })}
            </div>

        {/* тоже самое с цветами , сатею в отдельную переменную, локальную переменную после чего с ней работаю и отправляю при отправке ее уже  */}

        <div className={s.send_wrapper}>
            <span className={s.send_cancel}>Отмена</span>
            <span className={s.send}>Изменить товар</span>

        </div>
        </div>

        </>
    )

 }