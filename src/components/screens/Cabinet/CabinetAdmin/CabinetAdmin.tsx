import React from "react";
import { useSelector } from "react-redux";
import s from './CabinetAdmine.module.scss'
import { Button } from './Buttons/Button'
import { UserRole } from './UsersRole/UserRole'
import { UserAdmin } from './UserAdmin/UserAdmin'
import { RootState } from "@/redux/store";
import Link from "next/link";
//components 
import { AddProduct } from './Display/AddProduct'

import Image from 'next/image';
//icons
import icon1 from '../../../../assets/icons/cabinetAdmin/icon1_grey.svg'
import icon2 from '../../../../assets/icons/cabinetAdmin/icon2_grey.svg'
import icon3 from '../../../../assets/icons/cabinetAdmin/icon3_grey.svg'
import icon4 from '../../../../assets/icons/cabinetAdmin/icon4_grey.svg'
import icon5 from '../../../../assets/icons/cabinetAdmin/icon5_grey.svg'
import icon6 from '../../../../assets/icons/cabinetAdmin/icon6_gray.svg'
import icon7 from '../../../../assets/icons/cabinetAdmin/icon7_grey.svg'
//white
import icon_white1 from '../../../../assets/icons/cabinetAdmin/icon1_white.svg'
import icon_white2 from '../../../../assets/icons/cabinetAdmin/icon2_white.svg'
import icon_white3 from '../../../../assets/icons/cabinetAdmin/icon3_white.svg'
import icon_white4 from '../../../../assets/icons/cabinetAdmin/icon4_white.svg'
import icon_white5 from '../../../../assets/icons/cabinetAdmin/icon5_white.svg'
import icon_white6 from '../../../../assets/icons/cabinetAdmin/icon6_white.svg'
import icon_white7 from '../../../../assets/icons/cabinetAdmin/icon7_white.svg'
import findUser from '../../../../assets/icons/cabinetAdmin/findUser.svg'
//types
import { ButtonType } from '../../../../types/auth'
import { SizeItem } from "./Display/AddProduct/SizesItem";
import {ModuleWindiw} from './Display/AddProduct/ModuleWindow'
import {ModalAddCategory} from '../../Cabinet/CabinetAdmin/Display/AddProduct/ModalAddCategory'
import {ModalAddColor} from '../../Cabinet/CabinetAdmin/Display/AddProduct/ModalAddColor'

// export const heidthcal = 9;

const buttonsObj: ButtonType[] = [
    { id: 1, img_grey: icon1, img_white: icon_white1, text: 'Выдать роль', url: '/admin-settings/role-settings' },
    { id: 2, img_grey: icon2, img_white: icon_white2, text: 'Администраторы', url: '/admin-settings/admin-settings' },
    // { id: 3, img_grey: icon3, img_white: icon_white3, text: 'Редактировать сайт' },
    { id: 3, img_grey: icon4, img_white: icon_white4, text: 'Добавить товар', url: '/admin-settings/add-product' },
    { id: 4, img_grey: icon5, img_white: icon_white5, text: 'Редактировать товар' },
    { id: 5, img_grey: icon6, img_white: icon_white6, text: 'Настройки' },
    { id: 6, img_grey: icon7, img_white: icon_white7, text: 'Выход' }
]

// const sizesItems = [
//     { id: 0, size: 'XS'},
//     { id: 1, size: 'S'},
//     { id: 2, size: 'XS'},
//     { id: 3, size: 'XS'},
//     { id: 4, size: 'XS'},
//     { id: 5, size: 'XS'},
//  ]
//  let sizesArr = [{ id: 0, size: 'XS'}, { id: 1, size: 'S'},]
//  const [sizesState, setSizesState] = React.useState(null)

export const CabinetAdmin: React.FC = () => {
    
    const [modalAddColor, setModalAddColor] = React.useState<boolean>(false)
    const [choiceColor, setChoiceColor] =React.useState<boolean>(false)
    const [modalAddPhoto, setModalAddPhoto ] = React.useState<boolean>(false)
    const [modalAddCAtegory, setModalAddCAtegory ] = React.useState<boolean>(false)
    // const [backroundModuleMore, setBackroundModuleMore] = React.useState<boolean>(false)

    const users = useSelector((state: RootState) => state.admin.users)

    const [idUserOpen, setUserOpen] = React.useState<number>(0)
    const [displayActive, setDisplayActive] = React.useState<number>(1)

    const usersRole = users.map((el) => <UserRole key={el.id} setUserOpenOK={setUserOpen} idUserOpen={idUserOpen} id={el.id} />)
    const usersAdmin = users.map((el) => <UserAdmin key={el.id} setUserOpenOK={setUserOpen} idUserOpen={idUserOpen} id={el.id} />)

    console.log('choiceColor' , choiceColor)

    return (
        <div className={s.wrapper}>

            <div className={s.nav_dekstop}>
                {buttonsObj.map((obj, ind) => {
                    return <Button chengeDisplayOK={setDisplayActive} key={obj.id} id={obj.id} img_white={obj.img_white} img_grey={obj.img_grey} text={obj.text} />
                })}
            </div>

            <div className={s.nav_mobile}>
                {buttonsObj.map((obj, ind) => {

                    return <Link className={s.link} href={`${obj.url}`} key={ind}>
                        <Button chengeDisplayOK={setDisplayActive} key={obj.id} id={obj.id} img_white={obj.img_white} img_grey={obj.img_grey} text={obj.text} />
                    </Link>
                })}
            </div>

            <div className={s.display}>
                <label htmlFor="findUser" className={displayActive === 1 || displayActive === 2 ? s.input_wrapper_on : s.input_wrapper_off}>
                    Пользователь
                    <div className={s.input_wrapper}>
                        <input className={s.input} id='findUser' type="findUser" />
                        <Image src={findUser} alt='findUser' />
                    </div>

                </label>

            
                {/* <div style={{ backround-color: `${props.color}`}}></div> */}
                {displayActive === 1 ? usersRole : ''}
                {displayActive === 2 ? usersAdmin : ''}
                {displayActive === 3 ? <AddProduct  modalAddPhoto={modalAddPhoto} setModalAddPhoto={setModalAddPhoto} /> : ''}
            </div >

            {modalAddPhoto ? <div className={ choiceColor == true ? s.backroundModuleMore : s.backround_module}></div> : ''} 
            {modalAddCAtegory ? <div className={ choiceColor == true ? s.backroundModuleMore : s.backround_module}></div> : ''} 
            {modalAddCAtegory ? <div className={ choiceColor == true ? s.backroundModuleMore : s.backround_module}></div> : ''} 
            {modalAddPhoto ? <ModuleWindiw setChoiceColor={setChoiceColor} choiceColor={choiceColor} modalAddPhoto={modalAddPhoto} setModalAddPhoto={setModalAddPhoto}  modalAddColor={modalAddColor} setModalAddColor={setModalAddColor} /> : ''}  
            {/* {modalAddCAtegory ? <ModalAddCategory modalAddCAtegory={modalAddCAtegory} setModalAddCAtegory={setModalAddCAtegory} /> : ''}  */}
            {modalAddColor ? <ModalAddColor  modalAddColor={modalAddColor} setModalAddColor={setModalAddColor} /> : '' }
            {/* <div className={s.module_wrapper}>
                    <div className={s.module_inner}>
                        <div className={s.title_wrapper}>
                            <div className={s.title}>Добавить фотографию</div>
                            <div className={s.subtitle}>Для того, чтобы добавить фотографию</div>
                        </div>

                        <div className={s.inputs_wrapper}>
                            <div className={s.input_inner}>
                                <span className={s.title}>Фотография в png и jpg</span>
                                <label className={s.label_input_file} htmlFor="uploadfileaddphoto">
                                    Загрузите фотографию
                                    <input id="uploadfileaddphoto" className={s.input_file} placeholder='Загрузите фотографию' type="file" />
                                </label>
                               
                            </div>
                            <div className={s.input_inner}>
                                <span className={s.title}>Размер</span>
                                <span className={s.input_choice_photo}>
                                    Выбрать размер фотографии
                                    <svg className={s.open_icon} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <  path d="M26 12L16 22L6 12" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>


                                
                                </span>
                            </div>

                            <div className={s.sizes}>
                                {sizesArr.map((el)=>{
                                    return <SizeItem size={el.size} />
                                })}
                            </div>

                            <div className={s.input_inner}>
                                <span className={s.title}>Цвет</span>
                                <span className={s.input_choice_color}>
                                    Выбрать размер фотографии
                                    <svg className={s.open_icon} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        < path d="M26 12L16 22L6 12" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </span>
                            </div>

                            <div className={s.btn}>
                                Добавить фотографию
                            </div>
                        </div>
                    </div>
                </div>
 */}
          
           
        </div >
    )
}

