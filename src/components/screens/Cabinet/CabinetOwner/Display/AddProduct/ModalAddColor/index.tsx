import React from "react"
import s from './ModalAddColor.module.scss'
//redux
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { useAppDispatch } from '@/redux/hooks'
import {setModalAddColor} from '../../../../../../../redux/slices/modal'
import axios from "axios"
import { API_URL } from "@/services"
import { parseCookies } from "nookies"

interface ModalAddColorProps {
    setChoiceColor: (n: boolean) => void
}

export const ModalAddColor: React.FC<ModalAddColorProps> = ({setChoiceColor}: ModalAddColorProps) => {

    interface coloursArrType {
        id: number,
        text: string,
        placeholder: string, 
        leng: "ua" | "ru" | "en" | "rs"
    }

    const coloursArr: coloursArrType[] = [
        {id: 0, text: 'Название цвета UA', placeholder: 'Введите название цвета', leng: 'ua'},
        {id: 1, text: 'Название цвета RU', placeholder: 'Введите название цвета', leng: 'ru'},
        {id: 2, text: 'Название цвета EN', placeholder: 'Введите название цвета', leng: 'en'},
        {id: 3, text: 'Название цвета SRB', placeholder: 'Введите название цвета', leng: 'rs'},
    ]

    const modalAddColor = useSelector((state: RootState)=> state.modaleSlice.modalAddColor )

    interface  inputsStateType {
        ua: string;
        ru: string;
        rs: string;
        en: string;
        hex: string
    }

    // function sendInputsState(obj: inputsStateType){
    //     fetch('colours/create_colour',{
    //         method: 'PUT',
    //         body: JSON.stringify(obj)
    //     }) .then(response => response.json())
    //     .then(data => console.log(data))
    //     .catch(error => console.error(error));
    // }

    function sendInputsState(obj: inputsStateType) {
        const cookies = parseCookies();
        const token = cookies.accessToken;
        
        axios({
        method: 'PUT',
        url: 'colours/create_colour',
        baseURL: API_URL,
        withCredentials: true,
        headers: {
        Authorization: 'Bearer ' + (token || ''),
        },
        // data: JSON.stringify(obj),
        data: obj,
        })
        .then(response => console.log(response.data))
        .catch(error => console.error(error));
        }

    const [inputsState, setInputsState] = React.useState<inputsStateType>({ua: '',  ru: '', rs: '', en: '', hex: '' })
    const [validateHex, setValidateHex] = React.useState<boolean>(true)
    const [checkForm, setCheckForm] = React.useState<boolean>(false)
    const dispatch = useAppDispatch()

    const [validationErrors, setValidationErrors] = React.useState({
        ua: false,
        ru: false,
        en: false,
        rs: false,
        hex: false,
    });


    console.log('inputsState', inputsState)
    console.log('validationErrors', validationErrors)
    //   const [stateInputs, setStateInputs] = React.useState({
    //     choosecategoryUA: '',
    //     choosecategoryRU: '',
    //     choosecategoryEN: '',
    //     choosecategoryRS: ''
    //   });

    function validateHexInput(input: string) {
        //Проверяем, что строка соответствует формату HEX
        const regex =  /#([a-f0-9]{6}|[a-f0-9]{3})/gi;
        return regex.test(input);
      }

      const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        
        const { id, value } = e.target;
        setInputsState(prevState => ({ ...prevState, [id]: value.trim() }));
        //check input hex or title
        if(id === 'hex'){
          if(validateHexInput(e.target.value) && e.target.value.length > 6){
            setValidationErrors(prevState => ({ ...prevState, hex: false }));
          }else{
            setValidationErrors(prevState => ({ ...prevState, hex: true }));
          }
        }else{
            if (value.length < 1) {
                setValidationErrors(prevState => ({ ...prevState, [id]: true }));
                
            } else {
                setValidationErrors(prevState => ({ ...prevState, [id]: false }));
            }
        }

        console.log('validationErrors', validationErrors)
    };

    return (
        <div className={s.module_wrapper}>
            <div className={s.module_inner}>

            <div onClick={()=> dispatch(setModalAddColor(false)) } className={s.close_modal}>

                <svg onClick={()=> setChoiceColor(false)} className={s.open_icon} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25 7L7 25" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M25 25L7 7" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>


                <div className={s.title_wrapper}>
                    <div className={s.title}>Добавить цвет</div>
                    <div className={s.subtitle}>Для того, чтобы добавить новый цвет, просто напишите его название сюда, и введите цветовой код</div>
                </div>

                <div className={s.inputs_wrapper}>

                {coloursArr.map((obj, ind)=>{
                    return <div key={ind} className={s.input_inner}>
                            <span className={s.title}>{obj.text} 
                            {/* {validationErrors[obj.leng] && <span 
                            style={{ 
                                color: '#e73232',
                                fontSize: '17px',
                                marginLeft: '5px'
                            }}
                            
                            
                            > Это поле не может быть пустым </span> }  */}
                            
                            </span>
                                
                            <label 
                            className={s.label_input_file} 
                            htmlFor={`colorname${obj.id}`}
                            style={{ border: validationErrors[obj.leng] ? '#e73232 solid 1.5px' : '' }}
                            >

                                <input 
                                onChange={(e)=> {
                                    handleInput(e)
                                }}   key={ind}
                                id={obj.leng} 
                                className={  validationErrors[obj.leng] ? `${s.input_file} ${s.input_file_invalid}`  : s.input_file} 
                                placeholder={obj.placeholder} 
                                type="text"
                                />
                            </label>
                        </div>
                })}

                    <div className={s.input_inner}>
                        <span className={s.title}>
                            Цветовой код <span style={{
                                display: validationErrors.hex  ? 'inline' : 'none',
                                color: '#e73232',
                                fontSize: '17px',
                                marginLeft: '5px',
                                
                                }}> Не верный код   </span>
                        </span>
                        <label  
                            style={{ border: validationErrors.hex ? '#e73232 solid 1.5px' : '' }}
                          className={s.label_input_file} htmlFor="hex">
                            <input onChange={(e)=>{
                                handleInput(e)

                                //setInputsState(prevState=>({...prevState, hex: e.target.value}))
                                console.log('inputsState', inputsState)
                            }} id="hex" 
                            className={s.input_file}
                            placeholder='#000000'
                            type="text" />
                        </label>
                    </div>

                    <div 
                        className={s.btn_wrapper}
                        >
                        
                        {checkForm && 
                            <div className={s.check_form}>
                                Чтобы добавить цвет, полностью заполните форму
                            </div>
                        }

                    <button 
                        style={{marginTop: checkForm ? '0px' : '20px' }}
                        onClick={()=>{
                            const valied = Object.values(validationErrors).every((el)=>{
                                return el !== true 
                            }) && Object.values(inputsState).every((el)=>{
                                return el !== ''
                            })

                            if(valied){
                                dispatch(setModalAddColor(false))
                                sendInputsState(inputsState)
                            }else{
                                for(const key in inputsState){
                                    if(inputsState[key as keyof inputsStateType] === '' ){
                                        setValidationErrors((prevState)=>{
                                            const copyObj = {...prevState, [key]: true}
                                            return copyObj
                                        })
                                    }
                                }
                                setCheckForm(true)
                            }
                        }} className={s.btn_add}>
                            Добавить цветовой код
                    </button>


                    </div>
                


                </div>
            </div>
        </div>
    )
}