// import React from "react"
// import { useSelector } from "react-redux"
// import { RootState } from "@/redux/store"
// //comonets
// // import { InputTextItem } from '../../../components/screens/Cabinet/CabinetAdmin/Display/AddProduct/InputText'
// import Link from "next/link"

// import { InputTextItem } from "@/components/screens/Cabinet/CabinetAdmin/Display/AddProduct/InputText";
// import { useAppDispatch } from "@/redux/hooks"
// import { RootState } from "@/redux/store"
// import React from "react"
// import { useSelector } from "react-redux"
// import { SizeChart } from '@/components/screens/Cabinet/CabinetAdmin/Display/AddProduct/sizeChart';

// const AddProduct = () => {

//     // const inputs = useSelector((state: RootState) => state.admin.inputs)

//     const  [inputs, setInputs] = React.useState([
//         { id: 0, type: 'text', text: 'Название товара RU', placeholder: 'Введите название кнопки', name: 'titleRU', disable: false,  },
//         { id: 1, type: 'text', text: 'Название товара UA', placeholder: 'Введите название кнопки', name: 'titleUA', disable: false },
//         { id: 2, type: 'text', text: 'Название товара SRB', placeholder: 'Введите название кнопки', name: 'titleSRB',  disable: false },
//         { id: 3, type: 'text', text: 'Название товара ENG', placeholder: 'Введите название кнопки', name: 'titleENG',disable: false },
//         { id: 4, type: 'text', text: 'Описание товара RU', placeholder: 'Введите описание товара', name: 'descriptionRU',disable: false },
//         { id: 5, type: 'text', text: 'Описание товара UA', placeholder: 'Введите описание товара', name: 'descriptionUA',disable: false },
//         { id: 6, type: 'text', text: 'Описание товара SRB', placeholder: 'Введите описание товара', name: 'descriptionSRB',disable: false },
//         { id: 7, type: 'text', text: 'Описание товара ENG', placeholder: 'Введите описание товара', name: 'descriptionENG',disable: false },
//         { id: 8, type: 'select', text: 'Категория товара', placeholder: 'Выберите категорию товара ', name: 'text', disable: false },
//         { id: 9, type: 'text', text: 'Цена в долларах', placeholder: 'Введите цену', name: 'text', disable: false },
//         { id: 10, type: 'text', text: 'Количество товара', placeholder: 'Введите количество товаров', name: 'text', disable: false },
//         // { id: 8, type: 'text', text: 'Цвет', placeholder: 'Выбрать один цвет фотографии', name: 'text', disable: true, colors: colors },
//         //{ id: 9, type: 'text', text: 'Выберите существующий товар', placeholder: 'Выберите существующий товар', label: 'text', disable: true },
   
//     ])

//     const inputsFistWrapper_1 = inputs?.slice(0, 2)
//     const inputsFistWrapper_2 = inputs?.slice(2, 4)
//     const inputsFistWrapper_3 = inputs?.slice(4, 6)
//     const inputsFistWrapper_4 = inputs?.slice(6, 7)

//     return (

//         <main className='content'>
//             <div className='container'>


//                 <div className='page_coordinator'>
//                     <Link href='/cabinet'>.../Личный кабинет |</Link> <span>Добавить товарь</span>
//                 </div>

//                 <div className={s.wrapper}>

//                     <div className={s.inputs_text}>
//                         <div className={s.first_wrapper}>
//                             <div className={s.first_wrapper_1}>
//                                 {inputsFistWrapper_1?.map((obj) => {
//                                     return <InputTextItem
//                                     name={obj.name}
//                                     disable={obj.disable} 
//                                     key={obj.id} id={obj.id} 
//                                     type={obj.type} 
//                                     text={obj.text} 
//                                     placeholder={obj.placeholder}
                                   
//                                     />
//                                 })}
//                             </div>
//                             <div className={s.first_wrapper_2}>
//                                 {inputsFistWrapper_2?.map((obj) => {
//                                     return <InputTextItem 
//                                     name={obj.name}
//                                     disable={obj.disable} 
//                                     key={obj.id} id={obj.id} 
//                                     type={obj.type} 
//                                     text={obj.text} 
//                                     placeholder={obj.placeholder}
//                                     />
//                                 })}
//                             </div>
//                             <div className={s.first_wrapper_2}>
//                                 {inputsFistWrapper_3?.map((obj) => {
//                                     return <InputTextItem
//                                     name={obj.name}
//                                     disable={obj.disable} 
//                                     key={obj.id} id={obj.id} 
//                                     type={obj.type} 
//                                     text={obj.text} 
//                                     placeholder={obj.placeholder}
//                                     />
//                                 })}
//                             </div>
//                             <div className={s.first_wrapper_2}>
//                                 {inputsFistWrapper_4?.map((obj) => {
//                                     return <InputTextItem 
//                                     name={obj.name}
//                                     disable={obj.disable} 
//                                     key={obj.id} id={obj.id} 
//                                     type={obj.type} 
//                                     text={obj.text} 
//                                     placeholder={obj.placeholder}
//                                     />
//                                 })}
//                             </div>

//                         </div>
//                         {/* <div className={s.second_wrapper}>
//                             {inputsSecondWrapper?.map((obj) => {
//                                 return <InputTextItem key={obj.id} id={obj.id} type={obj.type} text={obj.text} placeholder={obj.placeholder} />
//                             })}
//                         </div> */}
//                     </div>
//                 </div>

//                 <div>
                    
//                 </div>

//             </div>

//         </main >




//     )
// }

// export default AddProduct


import React from "react"
// import { useSelector } from "react-redux"
// import { RootState } from "@/redux/store"
// import s from './addProduct.module.scss';
// //components
// import { InputTextItem } from '../../../components/screens/Cabinet/CabinetOwner/Display/AddProduct/InputText'
// // import {ModalAddCategory} from '../AddProduct/ModalAddCategory'
// import {setAddPhotoState} from '../../../redux/slices/admin'
// import { useAppDispatch } from '@/redux/hooks'
// // import { ModuleWindiw } from "./ModuleWindow"
// // import {SizeItem} from './SizesItem'
// // import {setNetData} from '../../../../../../redux/slices/formData'
// import {SizeChart} from '../../../components/screens/Cabinet/CabinetOwner/Display/AddProduct/sizeChart'
// import {setModalAddPhoto} from '../../../redux/slices/modal'
// import {ModuleWindiw} from '../../../components/screens/Cabinet/CabinetOwner/Display/AddProduct/ModuleWindow'
// import Link from "next/link"
// import { getUsersRole} from '../../../redux/slices/admin'

// interface AddProductProps {
//     // setModalAddPhoto: (n: boolean)=> void,
//     modalAddPhoto: boolean,
//     setModalAddColor: (n: boolean)=> void,
//     modalAddColor: boolean,
//     // countPhoto: number, 
//     setCountPhoto: (n: number)=> void
//     imagesData: { fileNames: string[], colourId: number; sizes: string[];}[],
//     setImages: (n: any)=> void,
//     modalAddCAtegory: boolean,
//     setModalAddCAtegory: (n: any)=> void,
// }
  


// interface formDataType {
//         images: File[] ,
//         title: {
//             ua: string | null,
//             ru: string | null,
//             rs: string | null,
//             en: string | null,
//         };
//         description: {
//             ua: string | null,
//             ru: string | null,
//             rs: string | null,
//             en: string | null,
//         },
//         sizeChartImageDescription: {
//             ua: string | null,
//             ru: string | null,
//             rs: string | null,
//             en: string | null,
//           }
//         categories: number[],
//         colours: number[],
//         selectedImages: {
//             fileNames: string[],
//             colourId: number;
//             sizes: string[]
//         }[],
//         price: number | null,
//         quantity: number | null,
//         //дальше скажи під яким неймінгом тобі грузити ці свойства
//         allcoloursId: number[] | null, //всі кольора 
//         allsizes: string[] | null, // всі розміра
//         // netData: string | null, // опис размерной сетки
//         netImage: File //сама размерная сетка 
// }

// export const AddProduct = ({  setModalAddColor, modalAddColor, setCountPhoto, imagesData, setImages, modalAddCAtegory, setModalAddCAtegory}: AddProductProps) => {

//     const [netFile, setNetFile] = React.useState<null | any>(null)

//     console.log('getUsersRole', getUsersRole)
//     // const NetData = useSelector((state: RootState)=> state.formData.netData)
//     const colors =  useSelector((state: RootState)=> state.goods.fetchedColours)
//     const modalAddPhoto = useSelector((state: RootState)=> state.modaleSlice.modalAddPhoto)

//     //statesRedux
//     const addPhotoState =  useSelector((state: RootState)=> state.admin.addPhotoState)
//     const title = useSelector((state: RootState)=> state.formData.title)
//     const description = useSelector((state: RootState)=> state.formData.description)
//     const sizeChartImageDescription = useSelector((state: RootState)=> state.formData.sizeChartImageDescription)
//     const categories = useSelector((state: RootState)=> state.formData.categories)
//     const colours = useSelector((state: RootState)=> state.formData.allcoloursId)
//     const selectedImages = useSelector((state: RootState)=> state.formData.arrObjMod)
//     const price =  useSelector((state: RootState)=> state.formData.price)
//     const quantity =  useSelector((state: RootState)=> state.formData.quantity)
//     const netImage =  useSelector((state: RootState)=> state.formData.netData)
//     const allsizes =  useSelector((state: RootState)=> state.formData.allsizes)

//    let  objDataSend = {
//         images: imagesData,
//         title: title,
//         description: description,
//         sizeChartImageDescription: sizeChartImageDescription,
//         categories: categories,
//         colours: colours,
//         selectedImages: selectedImages,
//         price: price,
//         quantity: quantity,
//        // allcoloursId: colours,
//         allsizes: allsizes,
//         netImage: netFile
//    }

// //    console.log('objDataSend', objDataSend)
  

//     const dispatch = useAppDispatch()

//     console.log('imagesData', imagesData)


//     function sendFormData({images, title, description, sizeChartImageDescription, categories, colours, selectedImages, price, quantity, allcoloursId, allsizes, netImage  }: formDataType){

//         const formData = new FormData();
//         //images
//         for(let i = 0;  i < images.length; i++){
//             formData.append('images', images[i])
//         }
//         //title
//         formData.append('title', JSON.stringify(title))
//         //description
//         formData.append('description', JSON.stringify(description))
//         //sizeChartImageDescription
//         formData.append('sizeChartImageDescription', JSON.stringify(sizeChartImageDescription))
//         //categories
//         formData.append('categories', JSON.stringify(categories))
//         //colours
//         formData.append('colours', JSON.stringify(colours))
//         //selectedImages
//         formData.append('selectedImages', JSON.stringify(selectedImages))
//         //price
//         formData.append('price', price.toString());
//         //quantity
//         formData.append('quantity', quantity.toString())
//         //allsizes
//         formData.append('sizes', JSON.stringify(allsizes))
//         //sizeChartImage
//         formData.append('sizeChartImage', netImage)

//         fetch('/product/create_product', {
//             method: 'POST',
//             body: formData
//         })
//         .then(response => {
//             if (!response.ok) {
//             throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log(data);
//         })
//         .catch(error => {
//             console.error('There was an error!', error);
//         });

//         console.log('formData', formData)

//     }

//     const SizeChartArr = [
//         {id: 1, title: ' Описание размерной сетки UA', placeholder: 'Введите описание размерной сетки', leng: "ua"},
//         {id: 2, title: ' Описание размерной сетки RU', placeholder: 'Введите описание размерной сетки', leng: "ru"},
//         {id: 3, title: ' Описание размерной сетки SRB', placeholder: 'Введите описание размерной сетки', leng: "rs"},
//         {id: 4, title: ' Описание размерной сетки ENG', placeholder: 'Введите описание размерной сетки', leng: "en"},
//     ]


//     // const [netData, setNetData] = React.useState<null | string>(null)

 


//     // console.log('titleen', titleen)
//     // console.log('netData', NetData)
//     // console.log('setNetFile', netFile)
//     // console.log('title', title)

   

//     const  [inputs, setInputs] = React.useState([
//         { id: 0, type: 'text', text: 'Название товара RU', placeholder: 'Введите название кнопки', name: 'titleRU', disable: false,  },
//         { id: 1, type: 'text', text: 'Название товара UA', placeholder: 'Введите название кнопки', name: 'titleUA', disable: false },
//         { id: 2, type: 'text', text: 'Название товара SRB', placeholder: 'Введите название кнопки', name: 'titleSRB',  disable: false },
//         { id: 3, type: 'text', text: 'Название товара ENG', placeholder: 'Введите название кнопки', name: 'titleENG',disable: false },
//         { id: 4, type: 'text', text: 'Описание товара RU', placeholder: 'Введите описание товара', name: 'descriptionRU',disable: false },
//         { id: 5, type: 'text', text: 'Описание товара UA', placeholder: 'Введите описание товара', name: 'descriptionUA',disable: false },
//         { id: 6, type: 'text', text: 'Описание товара SRB', placeholder: 'Введите описание товара', name: 'descriptionSRB',disable: false },
//         { id: 7, type: 'text', text: 'Описание товара ENG', placeholder: 'Введите описание товара', name: 'descriptionENG',disable: false },
//         { id: 8, type: 'select', text: 'Категория товара', placeholder: 'Выберите категорию товара ', name: 'text', disable: false },
//         { id: 9, type: 'text', text: 'Цена в долларах', placeholder: 'Введите цену', name: 'price', disable: false },
//         { id: 10, type: 'text', text: 'Количество товара', placeholder: 'Введите количество товаров', name: 'quantity', disable: false },
//         // { id: 8, type: 'text', text: 'Цвет', placeholder: 'Выбрать один цвет фотографии', name: 'text', disable: true, colors: colors },
//         //{ id: 9, type: 'text', text: 'Выберите существующий товар', placeholder: 'Выберите существующий товар', label: 'text', disable: true },
   
//     ])

//     const inputsFistWrapper_1 = inputs?.slice(0, 2)
//     const inputsFistWrapper_2 = inputs?.slice(2, 4)
//     const inputsFistWrapper_3 = inputs?.slice(4, 6)
//     const inputsFistWrapper_4 = inputs?.slice(6, 8)
//     const inputsFistWrapper_5 = inputs?.slice(8, 10)
//     const inputsFistWrapper_6 = inputs?.slice(10, 11)
    
//     // const inputsSecondWrapper = inputs?.slice(inputs.length - 1, inputs.length)




    
//     return (

// <main className='content'>
// <div className='container'>
        
//     <div className={s.wrapper}>
            

//                 <div className='page_coordinator'>
//                     <Link href='/cabinet'>.../Личный кабинет | </Link> <span>Выдать роль</span>
//                 </div>
                
//               <div className={s.wrapper_inner_main}>
                
//               {modalAddPhoto
//               //@ts-ignore
//                ? <div className={s.backround_window}></div>: '' } 
//               {modalAddPhoto
//               //@ts-ignore
//                ? <ModuleWindiw /> : '' }  
//             <form className={s.from} action="/submit-form" method="post">
//             <div className={s.inputs_text}>

//                 <div className={s.inputs_wrapper}>
//                     <div className={s.wrapper_inner }>
//                         {inputsFistWrapper_1?.map((obj) => {
//                             return <InputTextItem  
//                             name={obj.name}
//                             disable={obj.disable} 
//                             key={obj.id} id={obj.id} 
//                             type={obj.type} 
//                             text={obj.text} 
//                             placeholder={obj.placeholder} />
//                         })}
//                     </div>

//                     <div className={s.wrapper_inner }>
//                         {inputsFistWrapper_2?.map((obj) => {
//                             return <InputTextItem  
//                             name={obj.name}
//                             disable={obj.disable} 
//                             key={obj.id} 
//                             id={obj.id} 
//                             type={obj.type} 
//                             text={obj.text} 
//                             placeholder={obj.placeholder}
//                             setModalAddColor={setModalAddColor}
//                             modalAddColor={modalAddColor} />
//                         })}
//                     </div>
//                 </div>

//                 <div className={s.inputs_wrapper}>
//                     <div className={s.wrapper_inner }>
//                         {inputsFistWrapper_3?.map((obj) => {
//                             return <InputTextItem  
//                             name={obj.name}
//                             disable={obj.disable} 
//                             key={obj.id} id={obj.id} 
//                             type={obj.type} 
//                             text={obj.text} 
//                             placeholder={obj.placeholder}
//                             setModalAddColor={setModalAddColor}
//                             modalAddColor={modalAddColor} />
//                         })}
//                     </div>

//                     <div className={s.wrapper_inner }>
//                         {inputsFistWrapper_4?.map((obj) => {
//                             return <InputTextItem
//                             name={obj.name}
//                              setModalAddColor={setModalAddColor}
//                              modalAddColor={modalAddColor} 
//                              disable={obj.disable} 
//                              key={obj.id} id={obj.id} 
//                              type={obj.type} 
//                              text={obj.text} 
//                              placeholder={obj.placeholder}
//                              modalAddCAtegory={modalAddCAtegory}
                            
//                              />
//                         })}
//                     </div>

//                 </div>

//                 <div className={s.inputs_wrapper}>

//                     <div className={s.wrapper_inner }>
//                         {inputsFistWrapper_5?.map((obj) => {
//                             return <InputTextItem   
//                             name={obj.name}
//                             disable={obj.disable} 
//                             key={obj.id} 
//                             id={obj.id}
//                             type={obj.type} 
//                             text={obj.text} 
//                             placeholder={obj.placeholder}
//                             setModalAddColor={setModalAddColor}
//                             modalAddColor={modalAddColor}
//                             modalAddCAtegory={modalAddCAtegory}
//                               />
                            
                            
//                         })}
//                     </div>

//                     <div className={s.wrapper_inner }>
//                         {inputsFistWrapper_6?.map((obj) => {
//                             return <InputTextItem  
//                             name={obj.name} 
//                             disable={obj.disable} 
//                             key={obj.id} 
//                             id={obj.id}
//                             type={obj.type} 
//                             text={obj.text} 
//                             placeholder={obj.placeholder}
//                             setModalAddColor={setModalAddColor}
//                             modalAddColor={modalAddColor}
//                             modalAddCAtegory={modalAddCAtegory}
//                               />
                           
                            
//                         })}
//                     </div>

         


//                 </div>

//                 {/* <div className={s.second_wrapper}>
//                     {inputsSecondWrapper?.map((obj) => {
//                         return <InputTextItem key={obj.id} id={obj.id} type={obj.type} text={obj.text} placeholder={obj.placeholder} />
//                     })}
//                 </div> */}
//             </div>

//                 <div className={s.addphoto_wrapper}>
//                     <div className={s.descriprion}>
//                         <span className={s.title}>Добавить фото товара</span>
//                         <span onClick={()=>{
//                         //    setCountPhoto(addPhotoState.length)
//                         //    @ts-ignore
//                            dispatch(setAddPhotoState());
                        

//                         } } className={s.btn}>
//                         <svg className={s.img} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path d="M3.75 12H20.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//                             <path d="M12 3.75V20.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//                         </svg>

//                         </span>
//                     </div>
//                     <div className={s.addphoto}>  
//                     {addPhotoState?.map((el, ind)=>{
//                         return <div key={ind} onClick={()=> dispatch(setModalAddPhoto(!modalAddPhoto))} className={s.addphoto_wrapper}>
//                             <div className={s.element_wrapper}>
//                                 <span className={s.id}> {`${el.id}.`}</span>
//                                 <span className={s.text}>Загрузить фото</span>
//                             </div>
//                         </div>
//                     })}
//                     </div>
                  
//                 </div>






//                 <div className={s.net_wrapper}>




//                     {SizeChartArr.map((obj)=>{
//                         return <SizeChart key={obj.id} leng={obj.leng} id={obj.id} placeholder={obj.placeholder} title={obj.title} />
//                     })}
                    
//                     {/* <span className={s.item_wrapper_1}>
//                         Описание размерной сетки
//                         <input onBlur={(e)=>{
//                             dispatch(setNetData(e.target.value))
//                             e.target.value = e.target.value
//                         }}  key={1}  className={s.item_1} placeholder="Введите описание размерной сетки" type="text" />
//                     </span> */}


//                     <span  className={s.item_wrapper_2}>
//                         Загрузите размерную сетку
//                         <label style={{ cursor: 'pointer'}} htmlFor="uploadnet" className={s.label}>
//                             Загрузить размерную сетку
//                         </label>
//                         <input key={2}  onChange={(e)=>{
//                             setNetFile(e.target.files[0])
//                         }} id='uploadnet' className={s.item_2} placeholder="Загрузить размерную сетку" type="file" />
//                     </span> 
//                 </div>


//                 {/* module */}

//                 {/* <div className={s.module_wrapper}>
//                     <div className={s.module_inner}>
//                         <div className={s.title_wrapper}>
//                             <div className={s.title}>Добавить фотографию</div>
//                             <div className={s.subtitle}>Для того, чтобы добавить фотографию</div>
//                         </div>

//                         <div className={s.inputs_wrapper}>
//                             <div className={s.input_inner}>
//                                 <span className={s.title}>Фотография в png и jpg</span>
//                                 <input placeholder='Загрузите фотографию' type="text" />
//                             </div>
//                             <div className={s.input_inner}>
//                                 <span className={s.title}>Размер</span>
//                                 <input placeholder='Выбрать размер фотографии' type="text" />
//                             </div>

//                             <div className={s.sizes}>
//                                 {sizesArr.map((el)=>{
//                                     return <SizeItem size={el.size} />
//                                 })}
//                             </div>
//                         </div>
//                     </div>
//                 </div> */}



                

//                 <div className={s.send_wrapper}>
//                     <button  className={s.btn_cancel}>Отменить</button>
                    
//                     <input onClick={()=>{
//                         //@ts-ignore
//                         sendFormData(objDataSend)
//                     }} className={s.btn_send} value='Добавить товар' name="submit" id="" />
//                 </div>
                
//             </form>
//             </div>  
   

           
//         </div>
// </div>
// </main>


//     )
// }

// export default AddProduct
export default {}