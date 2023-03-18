import React from "react"
import s from './ModuleWindow.module.scss'
import { SizeItem } from "../SizesItem"
import Image from "next/image"
//redux
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { useAppDispatch } from '@/redux/hooks'
// import { setColors} from '../../../../../../../redux/slices/admin'
import {setSizes, setColors, setImagesPng, removeAll, setAllcoloursId, setAllsizes, setArrObjMod} from '../../../../../../../redux/slices/formData'
import { devNull } from "os"
import {setModalAddPhoto, setModalAddColor} from '../../../../../../../redux/slices/modal'
import {setImageUrl} from '../../../../../../../redux/slices/modal'
import {fetchCategories} from '../../../../../../../redux/slices/goods'

import {fetchColours} from '../../../../../../../redux/slices/goods'



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
    imagesData?: File[],
    setImages?: (n: any)=> void,
}
//setChoiceColor

export const ModuleWindiw = ({  modalAddPhoto,  setChoiceColor, choiceColor, setModalAddColor, modalAddColor, imagesData, setImages }: ModuleWindiwProps) => {

    const inputRef = React.useRef<HTMLInputElement>(null);

    const dispatch = useAppDispatch()
    //local state 
    const [files, setFiles] = React.useState<File[]>([])
    // const [arrObjMod, setArrObjMod] = React.useState([])
    const [allFiles, setAllFiles] = React.useState([])
    //redux state
    const allSizes =  useSelector((state: RootState)=> state.formData.allsizes)
    const allcoloursId =  useSelector((state: RootState)=> state.formData.categories)
    const selectedSizes = useSelector((state: RootState)=> state.formData.sizes)
   // const colors =  useSelector((state: RootState)=> state.goods.fetchedColours)
    const sizesItems =  useSelector((state: RootState)=> state.admin.sizesItems)
    //getinput_choice_photo
    const categories =  useSelector((state: RootState)=> state.goods.fetchedCategories)
    const fetchedCategories =  useSelector((state: RootState)=> state.goods.fetchedCategories)
    const colourId =  useSelector((state: RootState)=> state.formData.colourId)
    const arrObjMods =  useSelector((state: RootState)=> state.formData.arrObjMod)
    const images = useSelector((state: RootState)=> state.formData.images)
    const fetchColoursArr = useSelector((state: RootState)=> state.goods.fetchedColours)
    const selectedColor = fetchColoursArr.find((el)=> el.id === colourId)
    //images local show
    const [jpgImageShow, setJpgImageShow ] = React.useState<File>(null)
    const [pngImagesShow, setPngImagesShow ] = React.useState<File[]>([])
    // const [pngImageShowUrl, setPngImageShowUrl ] = React.useState<File>([])
    // const pngImageShowUrl = pngImageShow.map((el)=> URL.createObjectURL(el))

    // id: number | null
	// ua: string | null
	// en: string | null
	// rs: string | null
	// ru: string | null
	// hex: string | null
	// type: 'colour' | null
	// createdAt: any | null
	// updatedAt: any | null
	// label: string | null
    const newColoursArr = fetchColoursArr ? [...fetchColoursArr, {
         hex: '#A6BEE5',
		id: -48093899940393,
		ru: 'Добавить цвет',
		rs: 'rs',
		en: 'en',
		ua: 'Добавить цвет',
      }] : null;
    //modal backround
    const [choiceSize, setChoiceSize] = React.useState<boolean>(false)
    // console.log('fetchColoursArr', fetchColoursArr)
    //   console.log('setModalAddColor', setModalAddColor)

    function generationObjModal () {
        const obj = {
            fileNames: files.map((el)=>{
                return el.name
            }),
            colourId: colourId,
            sizes: selectedSizes
        }
        
        // dispatch(setArrObjMod(obj))  
        dispatch(setAllcoloursId(colourId))
        dispatch(setAllsizes(obj.sizes))
        dispatch(setArrObjMod(obj))

        // setImages([...imagesData, ...files])
        console.log('arrObjMods', arrObjMods)
        console.log('files', files)
        console.log('imagesData', imagesData)

        dispatch(removeAll())
        setFiles([])
        dispatch(setModalAddPhoto(false))
        // const file = files[0];
        // const url = URL.createObjectURL(file);
        const urls = [];

        for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const url = URL.createObjectURL(file);
        urls.push(url);
        }

        // const innetFiles: File[] = files.shift()
        //     const urlsPng = innetFiles.map((el)=>{
        //         return URL.createObjectURL(el)
        // })
        // setPngImageShow(urlsPng)

        // setImageUrl(url)
        dispatch(setImageUrl(urls))
     }



    const handleFileUploadPng = (event: React.ChangeEvent<HTMLInputElement>)=>{

        setFiles((prevArray: File[]) => [...prevArray,  event.target.files[0]])
        setImages( (prevArray: File[]) => [...prevArray,  event.target.files[0]])
        setPngImagesShow((prevArray: File[]) => [...prevArray,  event.target.files[0]])
        // const url = URL.createObjectURL(event.target.files[0])
        // setPngImageShowUrl((prevArray: string[]) => [...prevArray,  url])
    }

    const handleFileUploadJpg = (event: React.ChangeEvent<HTMLInputElement>)=>{

        setJpgImageShow(event.target.files[0])
        // set photo setFiles
        const hasJpgFiles = files.some((image) => {
            return image.name.endsWith(".jpg");
        });
        //   console.log('hasJpgImage', hasJpgFiles)
        if(hasJpgFiles){
            return
        }else{
            setFiles((prevArray: File[]) => [event.target.files[0], ...prevArray])
        }
          //set photo setImages
        const hasJpgImages = imagesData.some((image) => {
            return image.name.endsWith(".jpg");
        });
        if(hasJpgImages){
            return 
        }else{
            setImages( (prevArray: File[]) => [event.target.files[0], ...prevArray,])
        }
    }

    // React.useEffect(()=>{
    //     if(pngImageShow){
    //         const urls = pngImageShow.map((el: any) => URL.createObjectURL(el))
    //         setPngImageShowUrl(urls)
    //     }
    // }, [pngImageShow])

    React.useEffect(()=>{
        dispatch(fetchColours())
    }, [])
    
    
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
                    <span className={s.title}> Фотография в jpg  </span>
                    <label style={{
                            backgroundColor: jpgImageShow ? `#9D9D9D ` : '',
                            color:  jpgImageShow ? `black ` : '#9D9D9D ',
                            border: jpgImageShow ?  `black 1.5px solid` : `#9D9D9D 1.5px solid`,
                            opacity: jpgImageShow  ?  `0.4` : `1`
                        }} className={s.label_input_file} htmlFor="uploadfileaddphotojpg">
                        {jpgImageShow  ? `Фото загружено ` : `Загрузите фотографию`}  
                        <input 
                        disabled={jpgImageShow ? true : false}  
                        // accept={jpgImage ? '' : 'e'}
                        key={Math.random()} 
                        ref={inputRef} 
                        onChange={handleFileUploadJpg} 
                        id="uploadfileaddphotojpg" 
                        className={s.input_file} 
                        placeholder='Загрузите фотографию' 
                        type="file"
                        name="uploadfileaddphotojpg"
                        />
                    </label>
                        {/* выбраные фото */}

                    {jpgImageShow &&
                        <div className={s.image_selecte_wrapper}>
                            <span onClick={()=>{
                                    console.log('jpgImageShow', jpgImageShow)
                                    setJpgImageShow(null)
                                //убираем эту фотку с загального массива фоток 
                                setImages((prevArray: File[]) => {
                                    const newArray = [...prevArray];
                                    console.log('')
                                    const activeIndex = newArray.indexOf(jpgImageShow)
                                    newArray.splice(activeIndex, 1);
                                    return newArray;
                                    })
                                //удаляем эту фотку с локального стейта ( массива ) фоток
                                setFiles((prevArray: File[]) => {
                                    const newArray = [...prevArray];
                                    const activeIndex = newArray.indexOf(jpgImageShow)
                                    // console.log('activeIndex', activeIndex)
                                    newArray.splice(activeIndex, 1);
                                    return newArray;
                                    })
                                    
                            }} className={s.img_wrapper}>
                                <span className={s.img_backround}></span>
                                <svg className={s.remove_photo} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.75 5.25L5.25 18.75" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M18.75 18.75L5.25 5.25" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <Image 
                                width={70} 
                                height={102} 
                                className={s.imges_selected} style={{
                                }} src={ URL.createObjectURL(jpgImageShow)} alt={'photo'} />
                            </span>
                    </div>
                    }
                </div>

                <div className={s.input_inner}>
                    <span className={s.title}>Фотография в png  </span>
                    <label className={s.label_input_file} htmlFor="uploadfileaddphotopng">
                        Загрузите фотографию
                        <input  
                            key={Math.random()} 
                            ref={inputRef} 
                            multiple 
                            onChange={handleFileUploadPng} 
                            id="uploadfileaddphotopng" 
                            className={s.input_file} 
                            placeholder='Загрузите фотографию' 
                            type="file"
                            name="uploadfileaddphotojpg"
                            />
                            
                    </label>

                    <div className={s.png_show_wrapper}>
                        {pngImagesShow && pngImagesShow.map((el: File, ind)=>{
                            return <span onClick={()=>{
                                console.log('Deletefiles', files)
                                console.log('DeleteImagesData', imagesData)
                                //console.log('click')
                                //убираем рендеринг какой - фотки 
                                setPngImagesShow((prevArray: File[]) => {
                                    const newArray = [...prevArray];
                                    newArray.splice(ind, 1);
                                    return newArray;
                                  })
                                //убираем эту фотку с загального массива фоток 
                                setImages((prevArray: File[]) => {
                                    const newArray = [...prevArray];
                                    const activeIndex = newArray.indexOf(el)
                                    newArray.splice(activeIndex, 1);
                                    return newArray;
                                  })
                                //удаляем эту фотку с локального стейта ( массива ) фоток
                                setFiles((prevArray: File[]) => {
                                    const newArray = [...prevArray];
                                    const activeIndex = newArray.indexOf(el)
                                    newArray.splice(activeIndex, 1);
                                    return newArray;
                                  })
                            }} className={s.png_show_item} key={ind}>
                             <span className={s.img_backround}></span>
                            <svg className={s.remove_photo} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.75 5.25L5.25 18.75" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M18.75 18.75L5.25 5.25" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <Image 
                                width={70} 
                                height={102} 
                                className={s.imges_selected} style={{
                                }} src={ URL.createObjectURL(el) } alt={'photo'} />          
                            </span>
                        })}
                    </div>
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
                                    ()=> {
                                        if(!selectedSizes.includes(el.size)){
                                            dispatch(setSizes(el.size)) 
                                        }   
                                    }
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
                    <span onClick={(e)=> { 
                      
                        setChoiceColor(!choiceColor)
                        }} className={s.input_choice_color}>
                     { !colourId ? 'Выбрать цвет фотографии' :  <span className={s.selected_color_placeholder}>
                        <span className={s.color} style={{backgroundColor: `${selectedColor ? selectedColor.hex : ''}`}}></span>
                        <span className={s.text}> {selectedColor? selectedColor.ru : '' } </span>
                     </span>}
                        {choiceColor ? <svg className={s.open_icon} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M25 7L7 25" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M25 25L7 7" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                             </svg> : 
                             <svg className={s.open_icon} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M26 12L16 22L6 12" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>}
                    </span>
                    {/* style={{top: selectedSizes?.length > 0 ? '500px' : '453.5px'}} */}
                        <div  className={ choiceColor ?  s.color_wrapper_main :  s.color_wrapper_main_off }>
                            { choiceColor ? newColoursArr?.map((el, ind)=>{
                                return el.id !== -48093899940393 ? (
                                    <div onClick={()=> {
                                        dispatch(setColors(el.id))
                                        setChoiceColor(!choiceColor)
                                    }} key={ind} className={s.color_wrapper}>
                                        <span className={s.color} style={{
                                            backgroundColor: `${el.hex}`,
                                        }}>
                                        </span>
                                        <span className={s.title}>
                                            {el.ru}
                                        </span>
                                    </div>
                                ) : <div onClick={()=> {
                                    // setModalAddColor(true)
                                    //@ts-ignore
                                    dispatch(setModalAddColor(true)) 
                                    setChoiceColor(!choiceColor)
                                    // dispatch()
                                }} key={ind} className={s.color_wrapper}>
                                    
                                    <svg className={s.plus} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.75 12H20.25" stroke="#9D9D9D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M12 3.75V20.25" stroke="#9D9D9D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>

                                        <span className={s.title}>
                                            {el.ru}
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