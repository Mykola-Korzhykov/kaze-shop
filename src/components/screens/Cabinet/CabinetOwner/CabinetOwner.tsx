import React from 'react';
import { useSelector } from 'react-redux';
import s from './CabinetOwner.module.scss';
import { Button } from './Buttons/Button';
import { UserRole } from './Display/UsersRole/UsersRole/UserRole';
import { UserAdmin } from './Display/UsersAdmin/UserAdmin/UserAdmin';
import { RootState } from '@/redux/store';
import { useAppDispatch } from '@/redux/hooks';
import Link from 'next/link';
import { Api } from '@/services';
import { setCookie } from 'nookies';
import { addUserInfo } from '@/redux/slices/user';
import debounce from 'lodash.debounce';
//components
import { AddProduct } from './Display/AddProduct';
import { EditProduct } from './Display/EditProduct';
import { EditProductItem } from './Display/EditProduct/EditProductItem';
import ChangePasswordSetting from './Display/ChangePasswordSetting';
import { fetchCategories } from '../../../../redux/slices/goods';

import Image from 'next/image';
//icons
import icon1 from '../../../../assets/icons/cabinetAdmin/icon1_grey.svg';
import icon2 from '../../../../assets/icons/cabinetAdmin/icon2_grey.svg';
import icon3 from '../../../../assets/icons/cabinetAdmin/icon3_grey.svg';
import icon4 from '../../../../assets/icons/cabinetAdmin/icon4_grey.svg';
import icon5 from '../../../../assets/icons/cabinetAdmin/icon5_grey.svg';
import icon6 from '../../../../assets/icons/cabinetAdmin/icon6_gray.svg';
import icon7 from '../../../../assets/icons/cabinetAdmin/icon7_grey.svg';
//white
import icon_white1 from '../../../../assets/icons/cabinetAdmin/icon1_white.svg';
import icon_white2 from '../../../../assets/icons/cabinetAdmin/icon2_white.svg';
import icon_white3 from '../../../../assets/icons/cabinetAdmin/icon3_white.svg';
import icon_white4 from '../../../../assets/icons/cabinetAdmin/icon4_white.svg';
import icon_white5 from '../../../../assets/icons/cabinetAdmin/icon5_white.svg';
import icon_white6 from '../../../../assets/icons/cabinetAdmin/icon6_white.svg';
import icon_white7 from '../../../../assets/icons/cabinetAdmin/icon7_white.svg';

import findUser from '../../../../assets/icons/cabinetAdmin/findUser.svg';
//types & redux
import { ButtonType } from '../../../../types/auth';
import { SizeItem } from './Display/AddProduct/SizesItem';
import { ModuleWindiw } from './Display/AddProduct/ModuleWindow';

import {
	findUsersRole,
	getUsersRole,
	getUsersAdmin,
	findUsersAdmin,
} from '../../../../redux/slices/admin';
import axios from 'axios';
import LogoutModal from '@/components/modals/LogoutModal/LogoutModal';
import ChangeUserPassword from '../../../UserCabinet/ChangeUserPassword/ChangeUserPassword';
import { UsersAdmin } from '../../../../components/screens/Cabinet/CabinetOwner/Display/UsersAdmin';
import { UsersRole } from '../../../../components/screens/Cabinet/CabinetOwner/Display/UsersRole';
import { ModalSentForm } from './Display/AddProduct/ModalSentForm';

interface CabinetOwnerProps {
	modalAddPhoto: boolean;
	modalAddCAtegory: boolean;
	imagesData: File[];
	setImages: (n: any) => void;
	setCountPhoto: (n: number) => void;
	modalAddColor: boolean;
	setModalAddColor: (n: boolean) => void;
	role: 'OWNER' | 'ADMIN' | 'USER';
	setFiles: (a: any) => void;
	setPngImageShow: (a: any) => void;
	setJpgImagesShow: (a: any) => void;
}

export const CabinetOwner = ({
	modalAddCAtegory,
	imagesData,
	setCountPhoto,
	modalAddColor,
	setModalAddColor,
	setImages,
	modalAddPhoto,
	role,
	setFiles,
	setPngImageShow,
	setJpgImagesShow,
}: CabinetOwnerProps) => {
	const buttonsObj: ButtonType[] =
		role === 'OWNER'
			? [
					{
						id: 1,
						img_grey: icon1,
						img_white: icon_white1,
						text: 'Выдать роль',
						url: '/settings/role-settings',
					},
					{
						id: 2,
						img_grey: icon2,
						img_white: icon_white2,
						text: 'Администраторы',
						url: '/settings/admin-settings',
					},
					{
						id: 3,
						img_grey: icon4,
						img_white: icon_white4,
						text: 'Добавить товар',
						url: '/settings/add-product',
					},
					{
						id: 4,
						img_grey: icon5,
						img_white: icon_white5,
						text: 'Редактировать товар',
						url: '/settings/edit-product',
					},
					{
						id: 5,
						img_grey: icon6,
						img_white: icon_white6,
						text: 'Настройки',
						url: '/settings/settings-password',
					},
					{
						id: 6,
						img_grey: icon7,
						img_white: icon_white7,
						text: 'Выход',
						url: '/settings/logout-modal',
					},
			  ]
			: [
					{
						id: 3,
						img_grey: icon4,
						img_white: icon_white4,
						text: 'Добавить товар',
						url: '/settings/add-product',
					},
					{
						id: 4,
						img_grey: icon5,
						img_white: icon_white5,
						text: 'Редактировать товар',
						url: '/settings/edit-product',
					},
					{
						id: 5,
						img_grey: icon6,
						img_white: icon_white6,
						text: 'Настройки',
						url: '/settings/settings-password',
					},
					{
						id: 6,
						img_grey: icon7,
						img_white: icon_white7,
						text: 'Выход',
						url: '/settings/logout-modal',
					},
			  ];

	const dispatch = useAppDispatch();

	const modalAddPhotoTurn = useSelector(
		(state: RootState) => state.modaleSlice.modalAddPhoto
	);
	const [choiceColor, setChoiceColor] = React.useState<boolean>(false);
	const modalAddCAtegoryTurn = useSelector(
		(state: RootState) => state.modaleSlice.modalAddCAtegory
	);
	const modalAddColorTurn = useSelector(
		(state: RootState) => state.modaleSlice.modalAddColor
	);
	const modalEditProductTurn = useSelector(
		(state: RootState) => state.modaleSlice.modalAddEditProduct
	);
	const sentProductForm = useSelector(
		(state: RootState) => state.modaleSlice.sentProductForm
	);
	const [displayActive, setDisplayActive] = React.useState<number>(1);
	const [netFile, setNetFile] = React.useState<null | any>(null);
	const [netFileShow, setNetFileShow] = React.useState<null | string>(null);

	React.useEffect(() => {
		dispatch(fetchCategories());
	}, []);

	return (
		<div className={s.wrapper}>
			{/* {modalAddCAtegoryTurn && <div className={s.backround_for_modal}></div>}
			{modalEditProductTurn && <div className={s.backround_for_modal}></div>}
			{modalAddPhotoTurn && <div className={s.backround_for_modal}></div>} */}
			{/* {sentProductForm.turn && <div className={s.backround_for_modal}></div>}
			{sentProductForm.turn && (
				<ModalSentForm
					title={sentProductForm.title}
					subtitle={sentProductForm.subtitle}
					btntitle={sentProductForm.btntitle}
				/>
			)} */}

			<div className={s.nav_dekstop}>
				{buttonsObj.map((obj, ind) => {
					return (
						<Button
							displayActive={displayActive}
							chengeDisplayOK={setDisplayActive}
							key={ind}
							id={obj.id}
							img_white={obj.img_white}
							img_grey={obj.img_grey}
							text={obj.text}
							setNetFile={setNetFile}
							setNetFileShow={setNetFileShow}
							setImages={setImages}
							setFiles={setFiles}
							setPngImageShow={setPngImageShow}
							setJpgImagesShow={setJpgImagesShow}
						/>
					);
				})}
			</div>

			<div className={s.nav_mobile}>
				{buttonsObj.map((obj, ind) => {
					return (
						<Link className={s.link} href={`${obj.url}`} key={ind}>
							<Button
								displayActive={displayActive}
								chengeDisplayOK={setDisplayActive}
								key={obj.id}
								id={obj.id}
								img_white={obj.img_white}
								img_grey={obj.img_grey}
								text={obj.text}
								setNetFile={setNetFile}
								setNetFileShow={setNetFileShow}
								setImages={setImages}
								setFiles={setFiles}
								setPngImageShow={setPngImageShow}
								setJpgImagesShow={setJpgImagesShow}
							/>
						</Link>
					);
				})}
			</div>

			<div className={s.display}>
				{displayActive === 1 ? <UsersRole /> : ''}
				{displayActive === 2 ? <UsersAdmin /> : ''}
				{displayActive === 3 ? (
					<AddProduct
						modalAddCAtegory={modalAddCAtegory}
						imagesData={imagesData}
						setImages={setImages}
						setCountPhoto={setCountPhoto}
						modalAddColor={modalAddColor}
						setModalAddColor={setModalAddColor}
						modalAddPhoto={modalAddPhoto}
						netFile={netFile}
						setNetFile={setNetFile}
						netFileShow={netFileShow}
						setNetFileShow={setNetFileShow}
					/>
				) : (
					''
				)}
				{displayActive === 4 ? (
					<EditProduct imagesData={imagesData} setImages={setImages} />
				) : (
					''
				)}
				{displayActive === 5 ? (
					<div>
						{' '}
						<ChangePasswordSetting />{' '}
					</div>
				) : (
					''
				)}
				{displayActive === 6 ? (
					<LogoutModal closeModal={setDisplayActive} />
				) : (
					''
				)}
			</div>
		</div>
	);
};
