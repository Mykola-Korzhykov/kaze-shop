import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import s from './AddProduct.module.scss'
//comonets
import { InputTextItem } from './InputText'

export const AddProduct = () => {

    // const inputs = useSelector((state: RootState) => state.admin.inputs)

    const  [inputs, setInputs] = React.useState([
        { id: 0, type: 'text', text: 'Название товара RU', placeholder: 'Введите название кнопки', label: 'text' },
        { id: 1, type: 'text', text: 'Название товара UA', placeholder: 'Введите название кнопки', label: 'text' },
        { id: 2, type: 'text', text: 'Название товара SRB', placeholder: 'Введите название кнопки', label: 'text' },
        { id: 3, type: 'text', text: 'Название товара ENG', placeholder: 'Введите название кнопки', label: 'text' },
        { id: 5, type: 'select', text: 'Категория товара', placeholder: 'Выберите категорию товара ', label: 'text' },
        { id: 6, type: 'text', text: 'Цена в долларах', placeholder: 'Введите цену', label: 'text' },
        { id: 7, type: 'text', text: 'Количество товара', placeholder: 'Введите количество товаров', label: 'text' }
    ])

    const inputsFistWrapper_1 = inputs?.slice(0, 2)
    const inputsFistWrapper_2 = inputs?.slice(2, 4)
    const inputsFistWrapper_3 = inputs?.slice(4, 6)
    const inputsFistWrapper_4 = inputs?.slice(6, 7)
    
    const inputsSecondWrapper = inputs?.slice(inputs.length - 1, inputs.length)

    return (
        <div className={s.wrapper}>

            <div className={s.inputs_text}>

                <div className={s.inputs_wrapper}>
                    <div className={s.wrapper_inner }>
                        {inputsFistWrapper_1?.map((obj) => {
                            return <InputTextItem key={obj.id} id={obj.id} type={obj.type} text={obj.text} placeholder={obj.placeholder} />
                        })}
                    </div>
                    <div className={s.wrapper_inner }>
                        {inputsFistWrapper_2?.map((obj) => {
                            return <InputTextItem key={obj.id} id={obj.id} type={obj.type} text={obj.text} placeholder={obj.placeholder} />
                        })}
                    </div>
                </div>

                <div className={s.inputs_wrapper}>
                    <div className={s.wrapper_inner }>
                        {inputsFistWrapper_3?.map((obj) => {
                            return <InputTextItem key={obj.id} id={obj.id} type={obj.type} text={obj.text} placeholder={obj.placeholder} />
                        })}
                    </div>

                    <div className={s.wrapper_inner }>
                        {inputsFistWrapper_4?.map((obj) => {
                            return <InputTextItem key={obj.id} id={obj.id} type={obj.type} text={obj.text} placeholder={obj.placeholder} />
                        })}
                    </div>

                </div>



                
                {/* <div className={s.second_wrapper}>
                    {inputsSecondWrapper?.map((obj) => {
                        return <InputTextItem key={obj.id} id={obj.id} type={obj.type} text={obj.text} placeholder={obj.placeholder} />
                    })}
                </div> */}


            </div>
        </div>
    )
}