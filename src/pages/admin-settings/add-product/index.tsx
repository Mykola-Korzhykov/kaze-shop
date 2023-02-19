import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import s from './addProduct.module.scss'
//comonets
import { InputTextItem } from '../../../components/screens/Cabinet/CabinetAdmin/Display/AddProduct/InputText'
import Link from "next/link"

const AddProduct = () => {

    const inputs = useSelector((state: RootState) => state.admin.inputs)

    const inputsFistWrapper_1 = inputs?.slice(0, 2)
    const inputsFistWrapper_2 = inputs?.slice(2, 4)
    const inputsSecondWrapper = inputs?.slice(inputs.length - 1, inputs.length)

    return (

        <main className='content'>
            <div className='container'>


                <div className='page_coordinator'>
                    <Link href='/cabinet'>.../Личный кабинет |</Link> <span>Добавить товарь</span>
                </div>

                <div className={s.wrapper}>

                    <div className={s.inputs_text}>
                        <div className={s.first_wrapper}>
                            <div className={s.first_wrapper_1}>
                                {inputsFistWrapper_1?.map((obj) => {
                                    return <InputTextItem key={obj.id} id={obj.id} type={obj.type} text={obj.text} placeholder={obj.placeholder} />
                                })}
                            </div>
                            <div className={s.first_wrapper_2}>
                                {inputsFistWrapper_2?.map((obj) => {
                                    return <InputTextItem key={obj.id} id={obj.id} type={obj.type} text={obj.text} placeholder={obj.placeholder} />
                                })}
                            </div>

                        </div>
                        <div className={s.second_wrapper}>
                            {inputsSecondWrapper?.map((obj) => {
                                return <InputTextItem key={obj.id} id={obj.id} type={obj.type} text={obj.text} placeholder={obj.placeholder} />
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </main >




    )
}

export default AddProduct