import React from "react";
import { useSelector , } from "react-redux";
import s from './CabinetOwner.module.scss'
import { Button } from './Buttons/Button'
import { UserAdmin } from './UsersRole/UserAdmin'
import { UserRole } from './UserAdmin/UserRole'
import { RootState } from "@/redux/store";
import { useAppDispatch } from "@/redux/hooks";
import Link from "next/link";
import { Api } from "@/services";
import { setCookie } from "nookies";
import { addUserInfo } from "@/redux/slices/user";
import debounce from 'lodash.debounce';
//components 
import { AddProduct } from './Display/AddProduct'
import {EditProduct} from './Display/EditProduct'
import {EditProductItem} from './Display/EditProduct/EditProductItem'
import {setModalAddPhoto, setModalAddColor} from '../../../../redux/slices/modal'

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
//types & redux
import { ButtonType } from '../../../../types/auth'
import { SizeItem } from "./Display/AddProduct/SizesItem";
import {ModuleWindiw} from './Display/AddProduct/ModuleWindow'
import {ModalAddCategory} from './Display/AddProduct/ModalAddCategory'
import {ModalAddColor} from './Display/AddProduct/ModalAddColor'
import {findUsersRole, getUsersRole, getUsersAdmin , findUsersAdmin} from '../../../../redux/slices/admin'
import axios from "axios";
import LogoutModal from "@/components/modals/LogoutModal/LogoutModal";
import ChangeUserPassword from '../../../ChangeUserPassword/ChangeUserPassword'


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
    
    // const [modalAddColor, setModalAddColor] = React.useState<boolean>(false)
    const modalAddColor =  useSelector((state: RootState) => state.modaleSlice.modalAddColor)
    const [choiceColor, setChoiceColor] =React.useState<boolean>(false)
    // const [modalAddPhoto, setModalAddPhoto ] = React.useState<boolean>(false)
    const modalAddPhoto = useSelector((state: RootState) => state.modaleSlice.modalAddPhoto)
    const modalAddCAtegory =  useSelector((state: RootState) => state.modaleSlice.modalAddCAtegory)
    // const [modalAddCAtegory, setModalAddCAtegory ] = React.useState<boolean>(false)
    const [countPhoto, setCountPhoto] = React.useState<number>(1)
    const [images, setImages] = React.useState([])

    const dispatch = useAppDispatch()
   
    // const [backroundModuleMore, setBackroundModuleMore] = React.useState<boolean>(false)
    console.log('ChangeUserPassword', ChangeUserPassword)
    const usersRoleUI = useSelector((state: RootState) => state.admin.usersRole)
    console.log('usersRoleUI', usersRoleUI)
    // console.log('getUsersRole', getUsersRole)
    const usersAdminUI = useSelector((state: RootState) => state.admin.usersAdmin)
    const editProductItemId = useSelector((state: RootState)=>state.admin.editProductItemId )
   // console.log('editProductItemId', editProductItemId)
    const [paginationLendthRole, setPaginationLendthRole] = React.useState<any[]>([])
    const [paginationLendthAdmin, setPaginationLendthAdmin] = React.useState<any[]>([])

    const colors = useSelector((state: RootState) => state.admin.colors)
    const [displayActive, setDisplayActive] = React.useState<number>(1)
    const [activePaginatoinRole, setActivePaginatoinRole] = React.useState<number>(1)
    const [activePaginatoinRoleAdmin, setActivePaginatoinAdmin] = React.useState<number>(1)
    console.log('displayActive', displayActive)
    //refresh
    React.useEffect(() => {
		const fetchUserData = async () => {
			try {
				const data = await Api().user.getMe()
				setCookie(null, 'accessToken', data.accessToken, {
					maxAge: 30 * 24 * 60 * 60,
					path: '/',
				})
				if (data.user) {
					dispatch(addUserInfo(data.user))
				}
                if (data.admin) {
					dispatch(addUserInfo(data.admin))
				}
                if (data.owner) {
					dispatch(addUserInfo(data.owner))
				}
			} catch (e) {
				//router.push('/404')
				console.log(e)
			}
		}

		fetchUserData()
	}, [dispatch])
    // получення юзерів 
    React.useEffect(()=>{
       if( displayActive === 1 ){
        console.log('запыт getUsersRole')
        // dispatch(getUsersRole(activePaginatoinRole))
       }
        
     }, [activePaginatoinRole,  displayActive])
     //получення адмінів 
    React.useEffect(()=>{
        if(displayActive === 2){
            console.log('запыт getUsersAdmin')
            // dispatch(getUsersAdmin(activePaginatoinRoleAdmin))
        }
    }, [ activePaginatoinRoleAdmin, displayActive])
    // вираховування пагінації
    React.useEffect(()=>{
        let countoRolePagination = Math.ceil(usersAdminUI.length / 10)
        let arrRolePagination : number[] = []
        for(let i = 1;  i <  countoRolePagination + 1; i++){
            arrRolePagination.push(i)
        }
        setPaginationLendthRole(arrRolePagination)

        let countAdminPagination = Math.ceil(usersAdminUI.length / 10)
        let arrAdminPagination: number[] = [];
        for(let i = 1;  i <  countAdminPagination + 1; i++){
            arrAdminPagination.push(i)
        }
        setPaginationLendthAdmin(arrAdminPagination)

        // console.log('arrRolePagination', arrRolePagination)
        // console.log('arrAdminPagination', arrAdminPagination)
    }, [usersRoleUI, usersAdminUI])

    // console.log('users', users)

    const [idUserOpen, setUserOpen] = React.useState<number>(0)
    
  
    const debouncedSearchAdmin = debounce((term) => {
        dispatch(findUsersAdmin(term))
      }, 500);

      const debouncedSearchRole = debounce((term) => {
        dispatch(findUsersRole(term))
      }, 500);

    const usersRole = usersRoleUI.map((el, ind) => <UserRole
    name={el.name}
    editContent={el.editContent}
    surname={el.surname}
    phoneNumber={el.phoneNumber}
    email={el.email}
    isAdmin={el.isAdmin}
    editWebSite={el.editWebSite}
    addContent={el.addContent}
    key={ind} 
    setUserOpenOK={setUserOpen} 
    idUserOpen={idUserOpen} 
    id={el.id}
    activePaginatoinRole={activePaginatoinRole}
     
     />)
    const usersAdmin = usersAdminUI.map((el, ind) => <UserAdmin 
    name={el.name}
    editContent={el.editContent}
    surname={el.surname}
    phoneNumber={el.phoneNumber}
    email={el.email}
    isAdmin={el.isAdmin}
    editWebSite={el.editWebSite}
    addContent={el.addContent}
    key={ind} 
    id={el.id}
    setUserOpenOK={setUserOpen} 
    idUserOpen={idUserOpen} 
    activePaginatoinRoleAdmin={activePaginatoinRoleAdmin}
     />)

    // console.log('choiceColor' , choiceColor)

    return (
        <div className={s.wrapper}>

            

            <div className={s.nav_dekstop}>
                {buttonsObj.map((obj, ind) => {
                    return <Button chengeDisplayOK={setDisplayActive} key={ind} id={obj.id} img_white={obj.img_white} img_grey={obj.img_grey} text={obj.text} />
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


                <label htmlFor="findUser" className={displayActive === 1  ? s.input_wrapper_on : s.input_wrapper_off}>
                    Пользователь
                    <div className={s.input_wrapper}>
                        <input onChange={(e)=>{
                            if (e.target.value === '' || e.target.value === ' ') {
                                dispatch(getUsersRole(activePaginatoinRole))
                            }else{
                                debouncedSearchRole(e.target.value.toLowerCase().split(' ').join(','))
                                console.log('debouncedSearchRole', e.target.value.toLowerCase().split(' ').join(','))
                            }
                           
                        }} className={s.input} id='findUser' type="findUser" />
                        <Image src={findUser} alt='findUser' />
                    </div>

                </label>
                        {/* при дісплеї 2 ( роль поиск) */}
                <label htmlFor="findUser" className={ displayActive === 2 ? s.input_wrapper_on : s.input_wrapper_off}>
                    Пользователь
                    <div className={s.input_wrapper}>
                        <input onChange={(e)=>{
                          if (e.target.value === '' || e.target.value === ' ') {
                            dispatch(getUsersAdmin(activePaginatoinRoleAdmin))
                          }else{
                            debouncedSearchAdmin(e.target.value.toLowerCase().split(' ').join(','))
                            
                            console.log('debouncedSearchAdmin', e.target.value.toLowerCase().split(' ').join(','))
                          }
                           
                        }} className={s.input} id='findUser' type="findUser" />
                        <Image src={findUser} alt='findUser' />
                    </div>

                </label>
              
                {/* <div style={{ backround-color: `${props.color}`}}></div> */}
                {displayActive === 1 ? usersAdmin : ''}
                {displayActive === 2 ? usersRole : ''} 
                {displayActive === 3 ? <AddProduct 
                modalAddCAtegory={modalAddCAtegory} 
                imagesData={images} setImages={setImages}  
                setCountPhoto={setCountPhoto}  
                modalAddColor={modalAddColor} 
                setModalAddColor={setModalAddColor}   
                modalAddPhoto={modalAddPhoto} /> : ''}
                {displayActive === 4? <EditProduct /> : '' }
                {displayActive === 5 ?  <ChangeUserPassword /> : ''} 
                {displayActive === 6 ? <LogoutModal closeModal={setDisplayActive}  /> : ''} 
                
                
                {displayActive === 1 ?
                <div className={s.pagination_wrapper}>
                    {paginationLendthRole.map((el)=>{
                        return <span key={el} onClick={()=>{
                            setActivePaginatoinRole(el)
                            
                        }} className={ activePaginatoinRole === el ?  s.item_active : s.item}>{el}</span>
                    })}
                </div> : ''
                }
                {displayActive === 2 ?
                <div className={s.pagination_wrapper}>
                    {paginationLendthAdmin.map((el)=>{
                        return <span key={el} onClick={()=>{
                            setActivePaginatoinAdmin(el)

                        }} className={ activePaginatoinRoleAdmin === el ?  s.item_active : s.item}>{el}</span>
                    })}
                </div> : ''
                }
               
                
            </div >
            {countPhoto > 0 && modalAddPhoto &&  choiceColor === false? <div style={{height: `${ 1450 +  countPhoto * 125}px` }} className={s.backround_module}></div> : ''}
            {/* {modalAddPhoto  && countPhoto < 2 ? <div  className={ choiceColor == true ? s.backroundModuleMore : s.backround_module}></div> : ''}  */}
            {choiceColor? <div   style={{height: `${ 1450 +  colors.length * 25}px` }} className={ s.backround_module}></div> : ''} 
            { modalAddCAtegory ?<div style={{height: '1450px'}} className={s.backround_module}></div> : ''}


            {modalAddPhoto ? <ModuleWindiw  imagesData={images} setImages={setImages} setChoiceColor={setChoiceColor} choiceColor={choiceColor} modalAddPhoto={modalAddPhoto} setModalAddPhoto={setModalAddPhoto}  modalAddColor={modalAddColor} setModalAddColor={setModalAddColor} /> : ''}  
            {modalAddCAtegory ? <ModalAddCategory  /> : ''} 
            {modalAddColor ? <ModalAddColor  /> : '' }
            
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
                                        <  path d="M26 12L16 22L6 12" stroke="black" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
                                        < path d="M26 12L16 22L6 12" stroke="black" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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

