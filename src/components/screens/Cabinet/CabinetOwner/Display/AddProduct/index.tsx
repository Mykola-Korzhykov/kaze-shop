import React, { useRef } from "react"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import s from './AddProduct.module.scss'
//components & redux
import {removearrObjMod, clearForm, setTitle, setDescription, setQuantity, setPrice, setCategories} from '../../../../../../redux/slices/formData'
import {setModalAddPhoto, removeimageUrlArr, setModalAddCAtegory} from '../../../../../../redux/slices/modal'
import { InputTextItem } from './InputText'
// import {ModalAddCategory} from '../AddProduct/ModalAddCategory'
import {setAddPhotoState} from '../../../../../../redux/slices/admin'
import { useAppDispatch } from '@/redux/hooks'
// import { ModuleWindiw } from "./ModuleWindow"
// import {SizeItem} from './SizesItem'
// import {setNetData} from '../../../../../../redux/slices/formData'
import {SizeChart} from './sizeChart'
import axios from "axios"
import {API_URL} from '../../../../../../services/index'
import { parseCookies } from "nookies"
import Image from "next/image"
import selectIcon from '../../../../../../assets/icons/cabinetAdmin/selectIcon.svg'

interface AddProductProps {
    // setModalAddPhoto: (n: boolean)=> void,
    modalAddPhoto: boolean,
    setModalAddColor: (n: boolean)=> void,
    modalAddColor?: boolean,
    // countPhoto: number, 
    setCountPhoto: (n: number)=> void
    imagesData: File[],
    setImages: (n: any)=> void,
    modalAddCAtegory: boolean,
}

interface formDataType {
        images: File[] ,
        title: {
            ua: string | null,
            ru: string | null,
            rs: string | null,
            en: string | null,
        };
        description: {
            ua: string | null,
            ru: string | null,
            rs: string | null,
            en: string | null,
        },
        sizeChartImageDescription: {
            ua: string | null,
            ru: string | null,
            rs: string | null,
            en: string | null,
          }
        categories: number[],
        colours: number[],
        selectedImages: {
            fileNames: string[],
            colourId: number;
            sizes: string[]
        }[],
        price: number | null,
        quantity: number | null,
        //дальше скажи під яким неймінгом тобі грузити ці свойства
        allcoloursId?: number[] | null, //всі кольора 
        allsizes: string[] | null, // всі розміра
        // netData: string | null, // опис размерной сетки
        netImage: File //сама размерная сетка 
    
}

export const AddProduct = ({ modalAddPhoto, setModalAddColor, modalAddColor, setCountPhoto, imagesData, setImages, modalAddCAtegory}: AddProductProps) => {

    const [netFile, setNetFile] = React.useState<null | any>(null)
    const [netFileShow, setNetFileShow] = React.useState<null | string>(null)
    // const NetData = useSelector((state: RootState)=> state.formData.netData)
    const colors =  useSelector((state: RootState)=> state.goods.fetchedColours)
    //statesRedux
    const imageUrlArr =  useSelector((state: RootState)=> state.modaleSlice.imageUrlArr)
    const addPhotoState =  useSelector((state: RootState)=> state.admin.addPhotoState)
    const title = useSelector((state: RootState)=> state.formData.title)
    const description = useSelector((state: RootState)=> state.formData.description)
    const sizeChartImageDescription = useSelector((state: RootState)=> state.formData.sizeChartImageDescription)
    const categories = useSelector((state: RootState)=> state.formData.categories)
    const colours = useSelector((state: RootState)=> state.formData.allcoloursId)
    const selectedImages = useSelector((state: RootState)=> state.formData.arrObjMod)
    const price =  useSelector((state: RootState)=> state.formData.price)
    const quantity =  useSelector((state: RootState)=> state.formData.quantity)
    const netImage =  useSelector((state: RootState)=> state.formData.netData)
    const allsizes =  useSelector((state: RootState)=> state.formData.allsizes)
    const [checkForm, setCheckForm] = React.useState<boolean>(false)
    const formData = useSelector((state: RootState)=> state.formData)

    //
    const arrObjMods =  useSelector((state: RootState)=> state.formData.arrObjMod)
    console.log('imageUrlArr', imageUrlArr)
    console.log(' imageUrlArr[ind]',  imageUrlArr[0])
    // imageUrlArr[ind]

   let objDataSend = {
        images: imagesData,
        title: title,
        description: description,
        sizeChartImageDescription: sizeChartImageDescription,
        categories: categories,
        colours: colours,
        selectedImages: selectedImages,
        price: price,
        quantity: quantity,
        //allcoloursId: colours,
        allsizes: allsizes,
        netImage: netFile
    }

    console.log('objDataSend', objDataSend)

    // const selectedImages = useSelector((state: RootState)=> state.formData.)

    const dispatch = useAppDispatch()

    console.log('imagesData', imagesData)

    function sendFormData({ images, title, description, sizeChartImageDescription, categories, colours, selectedImages, price, quantity, allsizes, netImage }: formDataType) {
        const cookies = parseCookies();
        const token = cookies.accessToken;
        //console.log('вошли в форму')
        
        const formData = new FormData();
        //images
        for (let i = 0; i < images.length; i++) {
            formData.append("images", images[i]);
        }
        //title
        formData.append("title", JSON.stringify(title));
        //description
        formData.append("description", JSON.stringify(description));
        //sizeChartImageDescription
        formData.append("sizeChartImageDescription", JSON.stringify(sizeChartImageDescription));
        //categories
        formData.append("categories", JSON.stringify(categories));
        //colours
        formData.append("colours", JSON.stringify(colours));
        //selectedImages
        formData.append("selectedImages", JSON.stringify(selectedImages));
        //price
        formData.append("price", String(price));
        //quantity
        formData.append("quantity", quantity.toString());
        //allsizes
        formData.append("sizes", JSON.stringify(allsizes));
        //sizeChartImage
        formData.append("sizeChartImage", netImage);

        // console.log("formDataChecktitle", formData.get('title'));
        // console.log("formDataCheckimages", formData.get('images'));
        // console.log("formDataCheckprice", formData.get('price'));
        // console.log("formDataChecksizeChartImage", formData.get('sizeChartImage'));
        axios
          .put("/product/create_product", formData, {
            baseURL: API_URL,
            withCredentials: true,
            headers: {
              Authorization: "Bearer " + (token || ""),
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log('response.data', response.data);
          })
          .catch((error) => {
            console.error("There was an error!", error);
          });
            // console.log("formDataChecktitle", formData.get('title'));
            // console.log("formDataCheckimages", formData.get('images'));
            // console.log("formDataCheckprice", formData.get('price'));
            // console.log("formDataChecksizeChartImage", formData.get('sizeChartImage'));

            console.log('inputRefs', inputRefs)
            inputRefs.current.forEach(inputRef => {
                inputRef.value = "";
            });

            console.log('objDataSendInnerForm', objDataSend)

    }

    const SizeChartArr = [
        {id: 1, title: ' Описание размерной сетки UA', placeholder: 'Введите описание размерной сетки', leng: "ua"},
        {id: 2, title: ' Описание размерной сетки RU', placeholder: 'Введите описание размерной сетки', leng: "ru"},
        {id: 3, title: ' Описание размерной сетки SRB', placeholder: 'Введите описание размерной сетки', leng: "rs"},
        {id: 4, title: ' Описание размерной сетки ENG', placeholder: 'Введите описание размерной сетки', leng: "en"},
    ]


    interface Input {
        id: number;
        type: string;
        text: string;
        placeholder: string;
        name: string;
        disable: boolean;
        // value?: any,
        key?: string 
        lang? : string
    }

    const  [inputs, setInputs] = React.useState<Input[]>([
        { id: 0, type: 'text', text: 'Название товара RU', placeholder: 'Введите название кнопки', name: 'titleRU', disable: false, key: 'title' , lang: 'ru' },
        { id: 1, type: 'text', text: 'Название товара UA', placeholder: 'Введите название кнопки', name: 'titleUA', disable: false, key: 'title', lang: 'ua'},
        { id: 2, type: 'text', text: 'Название товара SRB', placeholder: 'Введите название кнопки', name: 'titleSRB',  disable: false, key: 'title' , lang: 'rs'},
        { id: 3, type: 'text', text: 'Название товара ENG', placeholder: 'Введите название кнопки', name: 'titleENG',disable: false, key: 'title', lang: 'en' },
        { id: 4, type: 'text', text: 'Описание товара RU', placeholder: 'Введите описание товара', name: 'descriptionRU',disable: false,  key: 'description', lang: 'ru'  },
        { id: 5, type: 'text', text: 'Описание товара UA', placeholder: 'Введите описание товара', name: 'descriptionUA',disable: false,  key: 'description', lang: 'ua' },
        { id: 6, type: 'text', text: 'Описание товара SRB', placeholder: 'Введите описание товара', name: 'descriptionSRB',disable: false,  key: 'description', lang: 'rs'  },
        { id: 7, type: 'text', text: 'Описание товара ENG', placeholder: 'Введите описание товара', name: 'descriptionENG',disable: false, key: 'description', lang: 'en'  },
        { id: 8, type: 'select', text: 'Категория товара', placeholder: 'Выберите категорию товара', name: 'text', disable: false, key: 'categories'},
        { id: 9, type: 'number', text: 'Цена в долларах', placeholder: 'Введите цену', name: 'price', disable: false,  key: 'price'},
        { id: 10, type: 'number', text: 'Количество товара', placeholder: 'Введите количество товаров', name: 'quantity', disable: false, key: 'quantity'},
    ])

    const inputRefs = useRef([]);

    interface InputsStateValidType {
        [key: number]: boolean;
    }

    const inputsStateInition =  inputs.reduce((accumulator, currentValue) => {
        accumulator[currentValue.id] = true;
        return accumulator;
    }, {} as InputsStateValidType)

    const [inputsState, setInputsState] = React.useState<InputsStateValidType>(inputsStateInition)

    const initialValidChartState: InputsStateValidType = SizeChartArr.reduce((accumulator, currentValue) => {
        accumulator[currentValue.id] = true;
        return accumulator;
    }, {} as InputsStateValidType);

    const [validChartState, setValidChartState] = React.useState(initialValidChartState)

    const inputsFistWrapper_1 = inputs?.slice(0, 2)
    const inputsFistWrapper_2 = inputs?.slice(2, 4)
    const inputsFistWrapper_3 = inputs?.slice(4, 6)
    const inputsFistWrapper_4 = inputs?.slice(6, 8)
    const inputsFistWrapper_5 = inputs?.slice(8, 10)
    const inputsFistWrapper_6 = inputs?.slice(10, 11)

//@ts-ignore

console.log('formDataKey', formData[inputs[0].key][inputs[0].lang])















    //для инпутов логике 

    // const categories = useSelector((state: RootState)=> state.formData.categories)
    const categoryArr = useSelector((state: RootState)=> state.goods.fetchedCategories)

    const newCategoryArr = [...categoryArr, {
		id: 0.1,
		ua: 'UAstring',
		en: 'ENstring',
		rs: 'RSstring',
		ru: 'RUtring',
		type: 'category',
		createdAt: 'string',
		updatedAt: 'string'
	},]

    const activeCategories = categoryArr.find((el)=>{
        return el.id === categories[0]
    })

    //state
    const [categoriesDisplay, setCategoriesDisplay ] = React.useState<boolean>(false)


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

        // console.log('titleDescription', titleDescription)
        // console.log('titleStore' , titleStore)
        // console.log('obj',event.target.name )
        // console.log('Пользователь закончил ввод:', event.target.value);
    }





    return (
        <div className={s.wrapper}>
            <form className={s.from} action="/submit-form" method="post">
            <div className={s.inputs_text}>

                <div className={s.inputs_wrapper}>
                <div className={s.wrapper_inner }>
                        {inputsFistWrapper_1?.map((obj)=>{
                            return (
                                <div key={obj.id} className={s.wrapper_inner_input}>
                                <div className={s.title}>
                                    {obj.text} 
                                    {/* {inputsState[id] ? <></> : <span  className={s.valid}> *Это поле не может быть пустым </span>   } */}
                                </div>
                                
                                {obj.disable == false && obj.type === 'text' &&
                                <input id={`${obj.id}`} 
                                name={obj.name}
                                onChange={(e)=>{
                                    setInputsState( (prevState: any)=>{
                                        const objCopy = {...prevState}
                                        objCopy[obj.id] = e.target.value.trim() !== '' ? true  : false
                                        return objCopy
                                    })
                                    handleBlurSet(e)
                                }}
                                onBlur={handleBlurSet}
                                // @ts-ignore
                                // className={ (checkForm && formData[obj.key][obj.lang] !== null &&  checkForm && formData[obj.key][obj.lang] !== '') && inputsState[obj.id]    ?  s.input : ${s.input} ${s.input_off_valid}  } 
                                className={ (!checkForm || (checkForm && formData[obj.key][obj.lang] !== null && formData[obj.key][obj.lang] !== '')) && inputsState[obj.id]
                                            ? s.input
                                            : `${s.input} ${s.input_off_valid}`
                                            }
                                style={{
                                    // @ts-ignore
                                    border:  (!checkForm || (checkForm && formData[obj.key][obj.lang] !== null && formData[obj.key][obj.lang] !== '')) && inputsState[obj.id]
                                    ? ''
                                    : 'solid 1.5px red'
                                }} 
                                type={obj.type}
                                placeholder={obj.placeholder}  /> }
                                </div>
                            )
                        })}
                    </div>

                    <div className={s.wrapper_inner }>
                        {inputsFistWrapper_2?.map((obj, ind)=>{
                            return (
                                 // @ts-ignore
                          
                            <div key={ind} className={s.wrapper_inner_input}>
                                <div className={s.title}>
                                    {obj.text} 
                                    {/* {inputsState[id] ? <></> : <span  className={s.valid}> *Это поле не может быть пустым </span>   } */}
                                </div>

                                {obj.disable == false && obj.type === 'text' &&
                                <input id={`${obj.id}`} 
                                name={obj.name}
                                onChange={(e)=>{
                                    setInputsState( (prevState: any)=>{
                                        const objCopy = {...prevState}
                                        objCopy[obj.id] = e.target.value.trim() !== '' ? true  : false
                                        return objCopy
                                    })
                                    handleBlurSet(e)
                                }}
                                onBlur={handleBlurSet}
                                 // @ts-ignore
                                className={ (!checkForm || (checkForm && formData[obj.key][obj.lang] !== null && formData[obj.key][obj.lang] !== '')) && inputsState[obj.id]
                                            ? s.input
                                            : `${s.input} ${s.input_off_valid}`
                                            }
                                style={{
                                    // @ts-ignore
                                    border:  (!checkForm || (checkForm && formData[obj.key][obj.lang] !== null && formData[obj.key][obj.lang] !== '')) && inputsState[obj.id]
                                    ? ''
                                    : 'solid 1.5px red'
                                }} 
                                type={obj.type}
                                 // @ts-ignore
                                placeholder={obj.placeholder}  /> }
                            </div>
                            )
                        })}
                    </div>
                </div>

                <div className={s.inputs_wrapper}>
                    <div className={s.wrapper_inner }>
                    {inputsFistWrapper_3?.map((obj, ind)=>{
                            return (
                                 // @ts-ignore
                            <div key={ind} className={s.wrapper_inner_input}>
                                <div className={s.title}>
                                    {obj.text} 
                                    {/* {inputsState[id] ? <></> : <span  className={s.valid}> *Это поле не может быть пустым </span>   } */}
                                </div>
                                {obj.disable == false && obj.type === 'text' &&
                                <input id={`${obj.id}`} 
                                name={obj.name}
                                onChange={(e)=>{
                                    setInputsState( (prevState: any)=>{
                                        const objCopy = {...prevState}
                                        objCopy[obj.id] = e.target.value.trim() !== '' ? true  : false
                                        return objCopy
                                    })
                                    handleBlurSet(e)
                                }}
                                onBlur={handleBlurSet} 
                                 // @ts-ignore
                                className={ (!checkForm || (checkForm && formData[obj.key][obj.lang] !== null && formData[obj.key][obj.lang] !== '')) && inputsState[obj.id]
                                ? s.input
                                : `${s.input} ${s.input_off_valid}`
                                }
                                style={{
                                    // @ts-ignore
                                    border:  (!checkForm || (checkForm && formData[obj.key][obj.lang] !== null && formData[obj.key][obj.lang] !== '')) && inputsState[obj.id]
                                    ? ''
                                    : 'solid 1.5px red'
                                }}
                                type={obj.type}
                                placeholder={obj.placeholder}  /> }
                            </div>
                            )
                        })}
                    </div>

                    <div className={s.wrapper_inner }>
                        {inputsFistWrapper_4?.map((obj, ind)=>{
                            return (
                            <div key={ind} className={s.wrapper_inner_input}>
                                <div className={s.title}>
                                    {obj.text} 
                                    {/* {inputsState[id] ? <></> : <span  className={s.valid}> *Это поле не может быть пустым </span>   } */}
                                </div>
                                
                                {obj.disable == false && obj.type === 'text' &&
                                <input id={`${obj.id}`} 
                                name={obj.name}
                                onChange={(e)=>{
                                    setInputsState( (prevState: any)=>{
                                        const objCopy = {...prevState}
                                        objCopy[obj.id] = e.target.value.trim() !== '' ? true  : false
                                        return objCopy
                                    })
                                    handleBlurSet(e)
                                }}
                                onBlur={handleBlurSet}
                                 // @ts-ignore
                                className={ (!checkForm || (checkForm && formData[obj.key][obj.lang] !== null && formData[obj.key][obj.lang] !== '')) && inputsState[obj.id]
                                ? s.input
                                : `${s.input} ${s.input_off_valid}`
                                }
                                style={{
                                    // @ts-ignore
                                    border:  (!checkForm || (checkForm && formData[obj.key][obj.lang] !== null && formData[obj.key][obj.lang] !== '')) && inputsState[obj.id]
                                    ? ''
                                    : 'solid 1.5px red'
                                }}
                                type={obj.type}
                                placeholder={obj.placeholder}  /> }
                            </div>
                            )
                        })}
                    </div>
                </div>

                <div className={s.inputs_wrapper}>
                    <div className={s.wrapper_inner }>
                    {inputsFistWrapper_5?.map((obj) => {

                        return (
                            <div className={s.wrapper_inner_input} key={obj.id}>
                                <div className={s.title}>
                                    {obj.text} 
                                    {/* {inputsState[id] ? <></> : <span  className={s.valid}> *Это поле не может быть пустым </span>   } */}
                                </div>
                                {obj.type === 'select' ?  
                                    <label className={s.select__wrapper} htmlFor={`${obj.id}`}>
                                        <input 
                                            onClick={(e) => { 
                                                console.log('[[[[[');
                                                setCategoriesDisplay(!categoriesDisplay);
                                            }}  
                                            id={`${obj.id}`} 
                                            readOnly 
                                            // @ts-ignore
                                            className={(!checkForm || (checkForm && formData[obj.key].length > 0)) && inputsState[obj.id]  ?  s.input : `${s.input} ${s.input_off_valid}`  }
                                            // @ts-ignore
                                            style={{border: (!checkForm || (checkForm && formData[obj.key].length > 0)) && inputsState[obj.id] ? 'solid 1.5px #9D9D9D' : 'solid 1.5px #E73232' }}
                                            // className={ inputsState[obj.id] ? s.input : s.input_off_valid} 
                                            type={obj.type}
                                            placeholder={activeCategories ? activeCategories.ru : obj.placeholder} 
                                        />
                                        <Image className={s.select_img} src={selectIcon} alt="My Image" />
                                        
                                        <div className={categoriesDisplay ? s.categorychose_wrapper : s.categorychose_wrapper_off}>
                                            {newCategoryArr?.map((el, ind) => {
                                                if (el.id !== 0.1) {
                                                    return (
                                                        <div 
                                                            onClick={(e) => { 
                                                                e.preventDefault();
                                                                e.stopPropagation(); 
                                                                setInputsState((prevState: any) => {
                                                                    const objCopy = { ...prevState };
                                                                    objCopy[obj.id] = el.ua !== '' ? true : false;
                                                                    return objCopy;
                                                                })  
                                                                setCategoriesDisplay(!categoriesDisplay);
                                                                dispatch(setCategories(el.id));
                                                            }}  
                                                            key={ind} 
                                                            className={s.categorychose_item}
                                                        >
                                                            <span>{el.ua}</span>
                                                        </div>
                                                    );
                                                } else {
                                                    return (
                                                        <div
                                                            onClick={(e) => { 
                                                                e.preventDefault();
                                                                e.stopPropagation();
                                                                dispatch(setModalAddCAtegory(true));
                                                                setCategoriesDisplay(!categoriesDisplay);
                                                            }} 
                                                            key={ind} 
                                                            className={s.categorychose_add}
                                                        >
                                                            <span className={s.categorychose_img}>
                                                                <svg className={s.plus} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M3.75 12H20.25" stroke="#9D9D9D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                    <path d="M12 3.75V20.25" stroke="#9D9D9D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                </svg>
                                                            </span>
                                                            <span className={s.categorychose_item_add}>
                                                                Добавить категорию
                                                            </span>
                                                        </div>
                                                    );
                                                }
                                            })}
                                        </div>
                                    </label>  
                                    : 
                                    <input id={`${obj.id}`}
                                        onChange={(e)=>{
                                            setInputsState( (prevState: any)=>{
                                                const objCopy = {...prevState}
                                                objCopy[obj.id] = e.target.value.trim() !== '' ? true  : false
                                                return objCopy
                                            })
                                            handleBlurSet(e)
                                        }}
                                        style={{
                                            WebkitAppearance: 'none',
                                            MozAppearance: 'textfield',
                                            // @ts-ignore
                                            border:  (!checkForm || (checkForm && formData[obj.key] !== null && formData[obj.key][obj.lang] !== '')) && inputsState[obj.id] ?  '' : 'solid 1.5px red'
                                        }} 
                                        name={obj.name} 
                                        onBlur={handleBlurSet} 
                                        // @ts-ignore
                                        className={(!checkForm || (checkForm && formData[obj.key] !== null && formData[obj.key][obj.lang] !== '')) && inputsState[obj.id]  ?  s.input : `${s.input} ${s.input_off_valid}`  } 
                                        type={obj.type} 
                                        placeholder={ obj.placeholder } />
                                }
                            </div>
                        );
                    })}

                    </div>

                    <div className={s.wrapper_inner }>
                    
                        {inputsFistWrapper_6?.map((obj) => {
                            return (
                                    <div key={obj.id} className={s.wrapper_inner_input}>
                                        <div className={s.title}>{obj.text}</div>
                                        <input
                                        id={`${obj.id}`}
                                        onChange={(e) => {
                                            setInputsState((prevState: any) => {
                                            const objCopy = { ...prevState };
                                            objCopy[obj.id] = e.target.value.trim() !== '' ? true : false;
                                            return objCopy;
                                            });
                                        }}
                                        style={{
                                            WebkitAppearance: 'none',
                                            MozAppearance: 'textfield',
                                             // @ts-ignore
                                            border: (!checkForm || (checkForm && formData[obj.key] !== null && formData[obj.key][obj.lang] !== '')) && inputsState[obj.id] ? '' : 'solid 1.5px red',
                                        }}
                                        name={obj.name}
                                        onBlur={handleBlurSet}
                                         // @ts-ignore
                                        // className={ (checkForm && formData[obj.key][obj.lang] !== null &&  checkForm && formData[obj.key][obj.lang] !== '') && inputsState[obj.id]    ?  s.input : `${s.input} ${s.input_off_valid}`  } 
                                        className={ (!checkForm || (checkForm && formData[obj.key] !== null && formData[obj.key][obj.lang] !== '')) && inputsState[obj.id]
                                        ? s.input
                                        : `${s.input} ${s.input_off_valid}`
                                        }
                                        type={obj.type}
                                        placeholder={obj.placeholder}
                                        />
                                    </div>
                            );
                        })}
                    </div>
            </div>

                {/* <div className={s.second_wrapper}>
                    {inputsSecondWrapper?.map((obj) => {
                        return <InputTextItem key={obj.id} id={obj.id} type={obj.type} text={obj.text} placeholder={obj.placeholder} />
                    })}
                </div> */}

            </div>
                <div className={s.addphoto_wrapper}>
                    <div className={s.descriprion}>
                        <span className={s.title}>Добавить фото товара</span>
                        <span onClick={()=>{
                        //    setCountPhoto(addPhotoState.length)
                        //    @ts-ignore
                        dispatch(setAddPhotoState());

                        } } className={s.btn}>
                        <svg className={s.img} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.75 12H20.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 3.75V20.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                        </span>
                    </div>
                    <div className={s.addphoto}>  
                    {addPhotoState?.map((el, ind)=>{
                        return <div key={ind} onClick={()=> dispatch(setModalAddPhoto(!modalAddPhoto))} className={s.addphoto_wrapper}>
                            <div className={s.element_wrapper}>
                                <span className={s.id}> {`${el.id}.`}</span>
                                    {/* определение загруженого обьекта */}
                                {arrObjMods[ind]? <span onClick={(e)=>{
                                    dispatch(removearrObjMod(ind))
                                    dispatch(removeimageUrlArr(ind))

                                    // console.log('removearrObjMod', removearrObjMod)
                                    // console.log('click', ind)
                                    // console.log('arrObjMods', arrObjMods)
                                    e.stopPropagation()
                                    
                                }} style={{
                                    color: '#9D9D9D', 
                                    border: '#9D9D9D solid 1.5px'
                                }} className={s.text}>Удалить сет</span> : 
                                
                                <span className={ (!checkForm || (checkForm && formData.arrObjMod.length > 0) ) ?  `${s.text}` : `${s.text} ${s.text_invalible}`  }>Загрузить фото</span>}
                                {/* arrObjMods */}
                                {imageUrlArr[ind]?.map((el, ind)=>{
                                    return  <Image key={ind}
                                    className={ el ? s.photo_item : s.photo_item_off }
                                    src={el}
                                    alt=""
                                    width={200}
                                    height={200}
                                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                    //   if(imageUrlArr[ind]){
                                    //   }else{
                                    //     const target = e.target as HTMLImageElement;
                                    //     // console.log('Error loading image:', target.src);
                                    //     // console.log('imageUrlArr', imageUrlArr)
                                    //     target.style.display = 'none';
                                    //   }
                                    }}
                                    />
                                })}
                                {/* {imageUrlArr[ind].fileNames.map((el)=>{
                                    console.log('el', el)
                                    console.log('arrObjMods[ind]', arrObjMods[ind])
                                    return  <Image
                                    className={ imageUrlArr[ind] ?    s.photo_item : s.photo_item_off }
                                    src={imageUrlArr[ind] ? imageUrlArr[ind] : ''}
                                    alt=""
                                    width={200}
                                    height={200}
                                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                    //   if(imageUrlArr[ind]){
                                    //   }else{
                                    //     const target = e.target as HTMLImageElement;
                                    //     // console.log('Error loading image:', target.src);
                                    //     // console.log('imageUrlArr', imageUrlArr)
                                    //     target.style.display = 'none';
                                    //   }
                                    }}
                                    />
                                })} */}
                               
                            </div>
                        </div>
                    })}
                    </div>
                </div>






                <div className={s.net_wrapper}>

                    {SizeChartArr.map((obj)=>{
                        return <SizeChart 
                        key={obj.id} 
                        leng={obj.leng} 
                        id={obj.id} 
                        placeholder={obj.placeholder} 
                        title={obj.title} 
                        valid={validChartState[obj.id] }
                        setValid={setValidChartState}
                        checkForm={checkForm}


                        />
                    })}
                    
                    {/* <span className={s.item_wrapper_1}>
                        Описание размерной сетки
                        <input onBlur={(e)=>{
                            dispatch(setNetData(e.target.value))
                            e.target.value = e.target.value
                        }}  key={1}  className={s.item_1} placeholder="Введите описание размерной сетки" type="text" />
                    </span> */}


                    <span  
                        className={s.item_wrapper_2}
                        
                    >
                        Загрузите размерную сетку
                        <label 
                            style={{ cursor: 'pointer', 
                            }} 
                            htmlFor="uploadnet" 
                            className={  (!checkForm || (checkForm && netFileShow !== null)) ? `${s.label}`: `${s.label} ${s.label_invalabel}`  }>
                            Загрузить размерную сетку
                        </label>
                        {/* label_invalabel */}
                        {/* color: (!checkForm || (checkForm && netFileShow !== null)) ? '' : 'red' */}
                        <input key={2}  onChange={(e)=>{
                            setNetFile(e.target.files[0])
                            setNetFileShow(URL.createObjectURL(e.target.files[0]))

                        }} id='uploadnet' className={s.item_2} placeholder="Загрузить размерную сетку" type="file" />

                            { netFileShow  && <div onClick={()=>{
                                setNetFile(null)
                                setNetFileShow(null)
                            }} className={s.show_net_wrapper}>
                                <span  className={s.show_net}>
                                    <span className={s.show_net_hover}></span>
                                    <svg className={s.remove_photo} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18.75 5.25L5.25 18.75" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M18.75 18.75L5.25 5.25" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    <Image 
                                    src={netFileShow} 
                                    alt={'photo'}
                                    width={ 308}
                                    height={60}
                                    />
                                </span>
                            </div> }
                            
                        
                    </span> 
                </div>


                {/* module */}

                {/* <div className={s.module_wrapper}>
                    <div className={s.module_inner}>
                        <div className={s.title_wrapper}>
                            <div className={s.title}>Добавить фотографию</div>
                            <div className={s.subtitle}>Для того, чтобы добавить фотографию</div>
                        </div>

                        <div className={s.inputs_wrapper}>
                            <div className={s.input_inner}>
                                <span className={s.title}>Фотография в png и jpg</span>
                                <input placeholder='Загрузите фотографию' type="text" />
                            </div>
                            <div className={s.input_inner}>
                                <span className={s.title}>Размер</span>
                                <input placeholder='Выбрать размер фотографии' type="text" />
                            </div>

                            <div className={s.sizes}>
                                {sizesArr.map((el)=>{
                                    return <SizeItem size={el.size} />
                                })}
                            </div>
                        </div>
                    </div>
                </div> */}

                {checkForm && 
                <div className={s.check_form}>
                    Чтобы добавить товар, полностью заполните форму
                </div>
                }

                <div className={s.send_wrapper}>
                    <button  className={s.btn_cancel}>Отменить</button>
                    
                    <input
                        onClick={()=>{
                            console.log('resODODODOODODODODDODOODDODODOODOD', checkObjectValues(objDataSend))
                            console.log('objDataSend', objDataSend)
                            function checkObjectValues(obj: any) {
                                for (const key in obj) {
                                    if (obj[key] === null || obj[key] === '' || obj.selectedImages.length < 1  ) {
                                        return false;
                                    }
                                }
                                return true;
                            }

                            //проверка на валидность формы
                            if(checkObjectValues(objDataSend) ) {
                                setCheckForm(false)
                                sendFormData(objDataSend)
                            }else{
                                setCheckForm(true)
                                console.log('setCheckForm', checkForm)
                                console.log('objDataSend', objDataSend)
                            }

                        }} 
                        className={s.btn_send} 
                        value='Добавить товар' 
                        name="submit" 
                        id="" 
                    />
                </div>
            </form>
        </div>
    )
}