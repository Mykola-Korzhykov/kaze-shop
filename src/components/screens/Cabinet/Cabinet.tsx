import React, { FC } from 'react'
import { Api } from '@/services'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/redux/hooks'
import { RootState } from '@/redux/store'
import { useRouter } from 'next/router'
import { addUserInfo } from '@/redux/slices/user'
import Link from 'next/link'
import { setCookie } from 'nookies'
import s from './screenStyle.module.scss'
//components
import ChangeUserPassword from '@/components/ChangeUserPassword/ChangeUserPassword'
import CabinetTabs from '@/components/screens/Cabinet/CabinetTabs'
import { CabinetOwner } from './CabinetOwner/CabinetOwner'
import {CabinetAdmin} from './CabinetAdmin'
//modal
import {setModalAddPhoto, setModalAddColor} from '../../../redux/slices/modal'
import {ModalAddCategory} from './../Cabinet/CabinetOwner/Display/AddProduct/ModalAddCategory'
import {ModalAddColor} from './../Cabinet/CabinetOwner/Display/AddProduct/ModalAddColor'
import { ModuleWindiw } from './CabinetOwner/Display/AddProduct/ModuleWindow'



const Cabinet: FC = () => {
	const dispatch = useAppDispatch()
	const router = useRouter()
	const user = useSelector((state: RootState) => state.user)
	//states 
	const [countPhoto, setCountPhoto] = React.useState<number>(1)
	const modalAddPhoto = useSelector((state: RootState) => state.modaleSlice.modalAddPhoto)
	const [choiceColor, setChoiceColor] =React.useState<boolean>(false)
	const modalAddCAtegory =  useSelector((state: RootState) => state.modaleSlice.modalAddCAtegory)
	const modalAddColorTurn =  useSelector((state: RootState) => state.modaleSlice.modalAddColor)
	const [images, setImages] = React.useState<File[]>([])

	console.log('modalAddColorTurn', modalAddColorTurn)

	console.log('user', user)
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

		if(!user.user) {
			fetchUserData()
		}
	}, [dispatch])
	return (
		<main className='content'>
			<div className='container'>
				<div className='page_coordinator'>
					<Link href='#'>Главная</Link> | <span>Личный кабинет</span>
				</div>

			 	{user && user.user?.type === 'USER'  ? <CabinetTabs /> : ''}
				{user?.user?.type === 'OWNER' && <CabinetOwner
				modalAddCAtegory={modalAddCAtegory} 
                imagesData={images} setImages={setImages}  
                setCountPhoto={setCountPhoto}  
				modalAddPhoto={modalAddPhoto}
                modalAddColor={modalAddColorTurn} 
                setModalAddColor={setModalAddColor}  
				/>}
				{user?.user?.type === 'ADMIN' && <CabinetAdmin />} 
			

				{/* <CabinetOwner 
				modalAddCAtegory={modalAddCAtegory} 
                imagesData={images} setImages={setImages}  
                setCountPhoto={setCountPhoto}  
				modalAddPhoto={modalAddPhoto}
                modalAddColor={modalAddColorTurn} 
                setModalAddColor={setModalAddColor}   
                />    */}
				{/* <CabinetAdmin /> */}

			{/* <div className={s.backround_module}></div>  */}
			{countPhoto > 0 && modalAddPhoto ? <div style={{height: `${ 1450 +  countPhoto * 125}px` }} className={s.backround_module}></div> : ''}
			{/* {countPhoto > 0 && modalAddPhoto &&  choiceColor === false? <div style={{height: `${ 1450 +  countPhoto * 125}px` }} className={s.backround_module}></div> : ''} */}
            {/* {modalAddPhoto  && countPhoto < 2 ? <div  className={ choiceColor == true ? s.backroundModuleMore : s.backround_module}></div> : ''}  */}
			{/* style={{height: `${ 1450 +  colors.length * 25}px` }} */}
            {/* {choiceColor? <div   className={ s.backround_module}></div> : ''}  */}
            { modalAddCAtegory ?<div style={{height: '1450px'}} className={s.backround_module}></div> : ''}


            {modalAddPhoto ? <ModuleWindiw  imagesData={images} setImages={setImages} setChoiceColor={setChoiceColor} choiceColor={choiceColor} modalAddPhoto={modalAddPhoto} setModalAddPhoto={setModalAddPhoto}  modalAddColor={modalAddColorTurn} setModalAddColor={setModalAddColor} /> : ''}  
            {modalAddCAtegory ? <ModalAddCategory  /> : ''} 
            {modalAddColorTurn ? <ModalAddColor  /> : '' }
			{/* {modalAddPhoto ? <ModuleWindiw  imagesData={images} setImages={setImages} setChoiceColor={setChoiceColor} choiceColor={choiceColor} modalAddPhoto={modalAddPhoto} setModalAddPhoto={setModalAddPhoto}  modalAddColor={modalAddColor} setModalAddColor={setModalAddColor} /> : ''}  */}

			</div>
		</main>
	)
}

export default Cabinet
