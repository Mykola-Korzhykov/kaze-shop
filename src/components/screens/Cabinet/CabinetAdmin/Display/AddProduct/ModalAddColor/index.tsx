import React from "react"
import s from './ModalAddColor.module.scss'
//redux
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { useAppDispatch } from '@/redux/hooks'


interface ModalAddColorProps {
    setModalAddColor: (n: boolean)=> void,
    modalAddColor: boolean,
}



export const ModalAddColor: React.FC<ModalAddColorProps> = ({setModalAddColor, modalAddColor }) => {

    const coloursArr = [
        {id: 0, text: 'Название цвета UA', placeholder: 'Введите название цвета', leng: 'ua'},
        {id: 1, text: 'Название цвета RU', placeholder: 'Введите название цвета', leng: 'ru'},
        {id: 2, text: 'Название цвета EN', placeholder: 'Введите название цвета', leng: 'en'},
        {id: 3, text: 'Название цвета SRB', placeholder: 'Введите название цвета', leng: 'rs'},
    ]

    interface  inputsStateType {
        ua: string;
        ru: string;
        rs: string;
        en: string;
        hex: string
    }

    function sendInputsState(obj: inputsStateType){

        fetch('colours/create_colour',{
            method: 'PUT',
            body: JSON.stringify(obj)
        }) .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));

    }

    const [inputsState, setInputsState] = React.useState<inputsStateType>({ua: '',  ru: '', rs: '', en: '', hex: '' })

    const dispatch = useAppDispatch()

    return (
        <div className={s.module_wrapper}>
            <div className={s.module_inner}>

            <div onClick={()=> setModalAddColor(false)} className={s.close_modal}>

                <svg className={s.open_icon} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25 7L7 25" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M25 25L7 7" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>


                <div className={s.title_wrapper}>
                    <div className={s.title}>Добавить цвет</div>
                    <div className={s.subtitle}>Для того, чтобы добавить новый цвет, просто напишите его название сюда, и введите цветовой код</div>
                </div>

                <div className={s.inputs_wrapper}>

                {coloursArr.map((obj, ind)=>{
                    return <div key={ind} className={s.input_inner}>
                            <span className={s.title}>{obj.text}</span>
                            <label className={s.label_input_file} htmlFor={`colorname${obj.id}`}>
                                <input onBlur={(e)=> {
                                      
                                    setInputsState(prevState=>({...prevState, [obj.leng]: e.target.value}))
                                    console.log('inputsState', inputsState)
                                }}  key={ind} id={`colorname${obj.id}`} className={s.input_file} placeholder={obj.placeholder} type="text" />
                            </label>
                         </div>
                })}


                    

                    <div className={s.input_inner}>
                        <span className={s.title}>Цветовой код</span>
                        <label className={s.label_input_file} htmlFor="choosecategoryRU">
                            <input onBlur={(e)=>{
                                 setInputsState(prevState=>({...prevState, hex: e.target.value}))
                                 console.log('inputsState', inputsState)
                            }} id="choosecategoryRU" className={s.input_file} placeholder='#000000' type="text" />
                        </label>
                    </div>

                    <button onClick={()=>{
                        sendInputsState(inputsState)
                        console.log('inputsStateColors', inputsState)
                    }} className={s.btn_add}>
                        Добавить цветовой код
                    </button>

                </div>
            </div>
        </div>
    )
}