import React, { FC } from 'react';
import { Api } from '@/services';
import { useSelector } from 'react-redux';
import Spinner from '@/components/Spinner/Spinner';
import { useAppDispatch } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { fetchColours } from '@/redux/slices/goods';
import { useRouter } from 'next/router';
import { addUserInfo } from '@/redux/slices/user';
import Link from 'next/link';
import { setCookie, destroyCookie } from 'nookies';
import s from './screenStyle.module.scss';
//components
import ChangeUserPassword from '@/components/UserCabinet/ChangeUserPassword/ChangeUserPassword';
import CabinetTabs from '@/components/screens/Cabinet/CabinetTabs';
import { CabinetOwner } from './CabinetOwner/CabinetOwner';
import { CabinetAdmin } from './CabinetAdmin';

//modal
import {
	setModalAddPhoto,
	setModalAddColor,
} from '../../../redux/slices/modal';
import { ModalAddCategory } from './../Cabinet/CabinetOwner/Display/AddProduct/ModalAddCategory';
import { ModalAddColor } from './../Cabinet/CabinetOwner/Display/AddProduct/ModalAddColor';
import { ModuleWindiw } from './CabinetOwner/Display/AddProduct/ModuleWindow';
import { ModalEditProduct } from '../../../components/screens/Cabinet/CabinetOwner/Display/AddProduct/ModalEditProduct/index';
import { divide } from 'lodash';
import { ModalSentForm } from './CabinetOwner/Display/AddProduct/ModalSentForm';

const Cabinet: FC = () => {
	const dispatch = useAppDispatch();
	const loadingStatus = useSelector(
		(state: RootState) => state.goods.loadingStatus
	);
	const router = useRouter();
	const user: RootState['user'] = useSelector((state: RootState) => state.user);
	//states
	const [countPhoto, setCountPhoto] = React.useState<number>(1);
	const modalAddPhoto = useSelector(
		(state: RootState) => state.modaleSlice.modalAddPhoto
	);
	const sentProductForm = useSelector(
		(state: RootState) => state.modaleSlice.sentProductForm
	);
	const [choiceColor, setChoiceColor] = React.useState<boolean>(false);
	const modalAddCAtegory = useSelector(
		(state: RootState) => state.modaleSlice.modalAddCAtegory
	);
	const modalAddColorTurn = useSelector(
		(state: RootState) => state.modaleSlice.modalAddColor
	);
	const modalEditProductTurn = useSelector(
		(state: RootState) => state.modaleSlice.modalAddEditProduct
	);
	//imagesData
	const [images, setImages] = React.useState<File[]>([]);
	const [files, setFiles] = React.useState<File[]>([]);
	const [pngImageShow, setPngImageShow] = React.useState<File | null>(null);
	const [jpgImagesShow, setJpgImagesShow] = React.useState<File[]>([]);

	console.log('modalAddColorTurn', modalAddColorTurn);
	React.useEffect(() => {
		dispatch(fetchColours());
	}, [dispatch]);
	console.log('user', user);
	React.useEffect(() => {
		const fetchUserData = async () => {
			try {
				const data = await Api().user.getMe();
				const expireDate = new Date(localStorage.getItem('expireDate'));
				setCookie(null, 'accessToken', data.accessToken, {
					maxAge: Number(new Date(expireDate)) - Number(new Date()),
					path: '/',
				});
				if (data.user) {
					dispatch(addUserInfo(data.user));
				}
				if (data.admin) {
					dispatch(addUserInfo(data.admin));
				}
				if (data.owner) {
					dispatch(addUserInfo(data.owner));
				}
			} catch (e) {
				//router.push('/404')
				// if (e?.response?.status === 400) {
				// 	destroyCookie(undefined, 'accessToken');
				// 	router.push('/');
				// }
			}
		};

		// if (!user?.user) {
		// 	fetchUserData();
		// }
	}, [dispatch]);

	return (
		<>
			{loadingStatus === 'loading' && <Spinner />}
			<main className="content">
				<div className={s.container}>
					<div className="page_coordinator">
						<Link href="/">Главная</Link> | <span>Личный кабинет</span>
					</div>

					{user?.user?.type === 'USER' && <CabinetTabs />}
					{user?.user?.type === 'OWNER' ||
						(user?.user?.type === 'ADMIN' && (
							<CabinetOwner
								role={user?.user?.type}
								modalAddCAtegory={modalAddCAtegory}
								imagesData={images}
								setImages={setImages}
								setCountPhoto={setCountPhoto}
								modalAddPhoto={modalAddPhoto}
								modalAddColor={modalAddColorTurn}
								setModalAddColor={setModalAddColor}
								setFiles={setFiles}
								setPngImageShow={setPngImageShow}
								setJpgImagesShow={setJpgImagesShow}
							/>
						))}

					{/* {user?.user?.type === 'ADMIN' && <CabinetAdmin />} */}

					{/* <CabinetTabs />  */}
					<CabinetOwner
						role={'OWNER'}
						modalAddCAtegory={modalAddCAtegory}
						imagesData={images}
						setImages={setImages}
						setCountPhoto={setCountPhoto}
						modalAddPhoto={modalAddPhoto}
						modalAddColor={modalAddColorTurn}
						setModalAddColor={setModalAddColor}
						setFiles={setFiles}
						setPngImageShow={setPngImageShow}
						setJpgImagesShow={setJpgImagesShow}
					/>

					{/* <CabinetAdmin /> */}

					{/* <div className={s.backround_module}></div>  */}
					{/* {countPhoto > 0 && modalAddPhoto ? (
					<div
						// style={{ height: `${1450 + countPhoto * 125}px` }}
						className={s.backround_module}
					></div>
				) : (
					''
				)} */}
					{/* {countPhoto > 0 && modalAddPhoto &&  choiceColor === false? <div style={{height: `${ 1450 +  countPhoto * 125}px` }} className={s.backround_module}></div> : ''} */}
					{/* {modalAddPhoto  && countPhoto < 2 ? <div  className={ choiceColor == true ? s.backroundModuleMore : s.backround_module}></div> : ''}  */}
					{/* style={{height: `${ 1450 +  colors.length * 25}px` }} */}
					{/* {choiceColor? <div   className={ s.backround_module}></div> : ''}  */}
					{/* {modalAddCAtegory ? (
					<div
						// style={{ height: '1450px' }}
						className={s.backround_module}
					></div>
				) : (
					''
				)} */}
					{/* {choiceColor ? <div style={{height: '1450px'}} className={s.backround_module}></div> : ''} */}

					{modalAddPhoto ? (
						<ModuleWindiw
							imagesData={images}
							setImages={setImages}
							setChoiceColor={setChoiceColor}
							choiceColor={choiceColor}
							modalAddPhoto={modalAddPhoto}
							setModalAddPhoto={setModalAddPhoto}
							modalAddColor={modalAddColorTurn}
							setModalAddColor={setModalAddColor}
							files={files}
							setFiles={setFiles}
							pngImageShow={pngImageShow}
							setPngImageShow={setPngImageShow}
							jpgImagesShow={jpgImagesShow}
							setJpgImagesShow={setJpgImagesShow}
						/>
					) : (
						''
					)}
					{modalAddCAtegory ? <ModalAddCategory /> : ''}
					{modalAddColorTurn ? (
						<ModalAddColor setChoiceColor={setChoiceColor} />
					) : (
						''
					)}

					{modalEditProductTurn && (
						<ModalEditProduct
							imagesData={images}
							setImages={setImages}
							setChoiceColor={setChoiceColor}
							choiceColor={choiceColor}
							modalAddPhoto={modalAddPhoto}
							setModalAddPhoto={setModalAddPhoto}
							modalAddColor={modalAddColorTurn}
							setModalAddColor={setModalAddColor}
							// files={files}
							// setFiles={setFiles}
							// pngImageShow={pngImageShow}
							// setPngImageShow={setPngImageShow}
							// jpgImagesShow={jpgImagesShow}
							// setJpgImagesShow={setJpgImagesShow}
						/>
					)}

					{/* {modalAddPhoto ? <ModuleWindiw  imagesData={images} setImages={setImages} setChoiceColor={setChoiceColor} choiceColor={choiceColor} modalAddPhoto={modalAddPhoto} setModalAddPhoto={setModalAddPhoto}  modalAddColor={modalAddColor} setModalAddColor={setModalAddColor} /> : ''}  */}
				</div>
			</main>
		</>
	);
};

export default Cabinet;
