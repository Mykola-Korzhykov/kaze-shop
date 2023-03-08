import React from "react"
import s from './ModuleWindow.module.scss'
import { SizeItem } from "../SizesItem"
//redux
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { useAppDispatch } from '@/redux/hooks'
// import { setColors} from '../../../../../../../redux/slices/admin'
import {setSizes, setColors, setImagesPng, removeAll, setAllcoloursId, setAllsizes, setArrObjMod} from '../../../../../../../redux/slices/formData'
import { devNull } from "os"
import {setModalAddPhoto} from '../../../../../../../redux/slices/modal'


interface ModuleWindowImagesProps {
    fileNames: string[];
    colourId: number;
    sizes: string[];
}

interface ModuleWindiwProps {
    setModalAddPhoto?: (n: boolean)=> void, 
    modalAddPhoto?: boolean,
    setChoiceColor?: (n: boolean)=> void,
    choiceColor?: boolean,
    setModalAddColor?: (n: boolean)=> void,
    modalAddColor?: boolean,
    imagesData?: { fileNames: string[], colourId: number; sizes: string[];}[],
    setImages?: (n: any)=> void,
}

export const ModuleWindiw = ({  modalAddPhoto, setChoiceColor, choiceColor, setModalAddColor, modalAddColor, imagesData, setImages }: ModuleWindiwProps) => {

    const inputRef = React.useRef<HTMLInputElement>(null);

    const dispatch = useAppDispatch()
    //local state 
    const [files, setFiles] = React.useState([])
    // const [arrObjMod, setArrObjMod] = React.useState([])
    const [allFiles, setAllFiles] = React.useState([])
    //redux state
    const allSizes =  useSelector((state: RootState)=> state.formData.allsizes)
    const allcoloursId =  useSelector((state: RootState)=> state.formData.categories)
    const selectedSizes = useSelector((state: RootState)=> state.formData.sizes)
    const colors =  useSelector((state: RootState)=> state.goods.fetchedColours)
    const sizesItems =  useSelector((state: RootState)=> state.admin.sizesItems)
    //get
    const categories =  useSelector((state: RootState)=> state.goods.fetchedCategories)
    const categoriesSend =  useSelector((state: RootState)=> state.goods.fetchedCategories)
    const colourId =  useSelector((state: RootState)=> state.formData.colourId)
    const ArrObjMod =  useSelector((state: RootState)=> state.formData.arrObjMod)
    const images = useSelector((state: RootState)=> state.formData.images)
    //modal backround
    const [choiceSize, setChoiceSize] = React.useState<boolean>(false)
    // console.log('categoriesSend', categoriesSend)

     function generationObjModal () {
        const obj = {
            fileNames: files.map((el)=>{
                return el.name
            }),
            colourId: colourId,
            sizes: selectedSizes
        }

        // files.forEach((el)=>{
        //     dispatch(setArrObjMod(el))  
        // })
        
        dispatch(setAllcoloursId(colourId))
        dispatch(setAllsizes(obj.sizes))
        dispatch(setArrObjMod(obj))
       
        // setImages([...imagesData, ...files])
        console.log('ArrObjMod', ArrObjMod)
        
        dispatch(removeAll())
        setFiles([])
        dispatch(setModalAddPhoto(false))
     }
     
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>)=>{
        // console.log(event.target.files)
        console.log()
       
        setFiles(  (prevArray: any) => [...prevArray,  event.target.files[0]] )
        setImages( (prevArray: any) => [...prevArray,  event.target.files[0]])
    }
      //@ts-ignore
      globalThis.pavlo = files
      
  

    return (
        <div  style={  modalAddColor  ? {visibility: 'hidden'} :  {visibility: 'visible'}} className={s.module_wrapper}>

       
        <div className={s.module_inner}>

        <div onClick={()=> dispatch(setModalAddPhoto(false))  } className={s.close_modal}>

            <svg className={s.open_icon} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25 7L7 25" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M25 25L7 7" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
             </svg>
        </div>

            <div className={s.title_wrapper}>
                <div className={s.title}>Добавить фотографию</div>
                <div className={s.subtitle}>Для того, чтобы добавить фотографию</div>
            </div>

            <div className={s.inputs_wrapper}>
                <div className={s.input_inner}>
                    <span className={s.title}>Фотографии </span>
                    <label className={s.label_input_file} htmlFor="uploadfileaddphotojpg">
                        Загрузите фотографию
                        <input  key={Math.random()} ref={inputRef} multiple onChange={handleFileUpload} id="uploadfileaddphotojpg" className={s.input_file} placeholder='Загрузите фотографию' type="file" />
                    </label>
                </div>

                {/* <div className={s.input_inner}>
                    <span className={s.title}>Фотография в png</span>
                    <label className={s.label_input_file} htmlFor="uploadfileaddphotopng">
                        Загрузите фотографию
                        <input  key={Math.random()} multiple onChange={handleFileUploadPng} id="uploadfileaddphotopng" className={s.input_file} placeholder='Загрузите фотографию' type="file" />
                    </label>
                </div> */}
                
                <div className={s.input_inner}>
                    <span className={s.title}>Размер</span>
                    <span onClick={()=>{
                        setChoiceSize(!choiceSize)
                    }} className={s.input_choice_photo}>
                        Выбрать размер фотографии
                    {choiceSize ? <svg className={s.open_icon} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M25 7L7 25" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M25 25L7 7" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                             </svg> : 
                             <svg className={s.open_icon} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M26 12L16 22L6 12" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>}

                        <div className={ choiceSize ? `${s.choice_photo_wrapper} ${s.choice_photo_on}` : `${s.choice_photo_wrapper} ${s.choice_photo_off}`  }>
                            {sizesItems.map((el, ind)=>{
                                return <span onClick={
                                    ()=>  dispatch(setSizes(el.size)) 
                                } key={ind} className={s.item_choice_photo}>
                                    {el.size}
                                </span>
                            })}
                           
                        </div>
                    </span>
                </div>

                <div className={s.sizes}>
                    {selectedSizes?.map((el, ind)=>{
                        return <SizeItem key={ind} size={el} id={ind} />
                    })}
                </div>

                <div className={s.input_inner}>
                    <span className={s.title}>Цвет</span>
                    <span onClick={()=> { setChoiceColor(!choiceColor)}} className={s.input_choice_color}>
                        Выбрать цвет фотографии
                        {choiceColor ? <svg className={s.open_icon} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M25 7L7 25" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M25 25L7 7" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                             </svg> : 
                             <svg className={s.open_icon} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M26 12L16 22L6 12" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>}
                    </span>
                        <div  style={{top: selectedSizes?.length > 0 ? '500px' : '456px'}} className={s.color_wrapper_main}>
                            { choiceColor ? colors?.map((el, ind)=>{
                                return el.id !== 48093899940393 ? (
                                    <div onClick={()=> {
                                        dispatch(setColors(el.id))
                                        setChoiceColor(!choiceColor)
                                    }} key={ind} className={s.color_wrapper}>
                                        <span className={s.color} style={{
                                            backgroundColor: `${el.hex}`,
                                        }}>  
                                        </span>
                                        <span className={s.title}>
                                            {el.label}
                                        </span>
                                    </div>
                                ) : <div onClick={()=> {
                                    setModalAddColor(true)
                                    setChoiceColor(!choiceColor)
                                }} key={ind} className={s.color_wrapper}>
                                    
                                    <svg className={s.plus} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.75 12H20.25" stroke="#9D9D9D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M12 3.75V20.25" stroke="#9D9D9D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>

                                        <span className={s.title}>
                                            {el.label}
                                        </span>
                                       
                                </div>
                            }) : ''}
                        </div>
                   </div>
                <button onClick={generationObjModal} className={s.btn}>
                    Добавить фотографию
                </button>
            </div>
        </div>
    </div>


    )
}