import React from 'react';
import Image from 'next/image';
import ArrowUser from '../../../../../../../assets/icons/ArrowUser.svg';
import s from './UserAdmin.module.scss';
//icons
// import userIcone from '../../../../../../../../../';
import userIcone from '../../../../../../../assets/icons/User/user_icon.svg';
import phoneIcone from '../../../../../../../assets/icons/User/phone_icon.svg';
import emailIcone from '../../../../../../../assets/icons/User/email_icon.svg';
import checkbox_icon from '../../../../../../../assets/icons/User/checkbox_icon.svg';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { API_URL } from '@/services';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { useAppDispatch } from '@/redux/hooks';
import {
	getUsersAdmin,
	getUsersRole,
} from '../../../../../../../redux/slices/admin';
import { setChangeCheckbox } from '../../../../../../../redux/slices/admin';
import { setProductForm } from '@/redux/slices/modal';

interface UserProps {
	idUserOpen?: number;
	id: number;
	setUserOpenOK?: (n: number) => void;
	addContent: boolean;
	editContent: boolean;
	editWebsite: boolean;
	isAdmin: boolean;
	email: string;
	phoneNumber: string;
	surname: string;
	name: string;
	activePaginatoinAdmin?: number;
}

export const UserAdmin: React.FC<UserProps> = ({
	activePaginatoinAdmin,
	setUserOpenOK,
	idUserOpen,
	id,
	addContent,
	editContent,
	editWebsite,
	isAdmin,
	email,
	phoneNumber,
	surname,
	name,
}) => {
	// const [openUserMy, setOpenUserMy] = React.useState<boolean>(false)
	const openUser = id === idUserOpen ? true : false;

	// console.log(`check user editContent${id}`, addContent )
	const localUser = useSelector(
		(state: RootState) => state.admin.usersRole[id - 1]
	);
	// console.log('UserAdminfekfekflkwefnwklenrflwerfnwlenfklnelfnlkenklfnklenrfnwelnflkernfnweklnklenflknwkfnwkfr')

	const [activeCheckbox, setSctiveCheckbox] = React.useState<number | null>(
		null
	);
	const usersRole = useSelector((state: RootState) => state.admin.usersRole);

	const [UserAdmin, setUserAdmin] = React.useState<{
		addContent: boolean;
		editContent: boolean;
		editWebsite: boolean;
		isAdmin: boolean;
		email: string;
		phoneNumber: string;
		surname: string;
		name: string;
		id: number;
	}>({
		id: id,
		name: name,
		surname: surname,
		email: email,
		phoneNumber: phoneNumber,
		isAdmin: isAdmin,
		addContent: addContent,
		editContent: editContent,
		editWebsite: editWebsite,
	});

	//  console.log('UserAdmin', UserAdmin)

	function changeUserAdmin(role: string, bool: boolean) {
		setUserAdmin({
			...UserAdmin,
			[role]: bool,
		});
	}

	const dispatch = useAppDispatch();
	const [sizeWindow, setSizeWindow] = React.useState<number>(0);

	React.useEffect(() => {
		setSizeWindow(window.innerWidth);
	}, []);

	function sendUserAdmin() {
		// console.log('clickfnnfnfnfnnfnfnffnfnnfnfnfnfnnfnfnfnfnnfnfnnfnfnfnnfnnfnfnfnfnfnfnfn')
		const cookies = parseCookies();
		const token = cookies.accessToken;

		const instance = axios.create({
			baseURL: API_URL,
			withCredentials: true,
			headers: {
				Authorization: 'Bearer ' + (token || ''),
			},
		});
		instance
			.patch('/admin/update_admin', {
				...UserAdmin,
			})
			.then(() => {})
			.catch((error) => {
				console.error('Error while updating user role:', error);
			});

		dispatch(
			setProductForm({
				turn: true,
				title: 'Загрузка...',
				subtitle: 'Цвет создается',
				btntitle: 'Ok',
				spiner: true,
				bottom:
					sizeWindow < 500
						? -750
						: sizeWindow < 900
						? -800
						: sizeWindow > 1079
						? 450
						: sizeWindow > 1049
						? 550
						: sizeWindow > 899
						? 550
						: 1,
			})
		);
	}

	return (
		<div
			onClick={() => {
				setUserOpenOK(idUserOpen === id ? -1 : id);
			}}
			className={s.wrapper}
		>
			<div className={s.info}>
				<div className={s.user}>
					<div className={s.user_id}>User {id}</div>
					<Image
						className={
							openUser ? `${s.ArrowUser_open}` : `${s.ArrowUser_close}`
						}
						src={ArrowUser}
						alt="user"
					/>
				</div>

				<div className={s.user_info}>
					<span className={`${s.name} ${s.user_inner}`}>
						<Image src={userIcone} alt="user" />
						{name} {surname}
					</span>

					<span className={`${s.email} ${s.user_inner}`}>
						<Image src={emailIcone} alt="phone" />
						{email}
					</span>

					<span className={`${s.phone} ${s.user_inner}`}>
						<Image src={phoneIcone} alt="email" />
						{phoneNumber}
					</span>
				</div>
			</div>

			<div
				className={
					openUser
						? `${s.roles} ${s.roles__open}`
						: `${s.roles} ${s.roles__false}`
				}
			>
				<div className={s.checkbox_wrapper_first}>
					{/* <label htmlFor={`makeAdmin${id}`} className={s.checkbox_wrapper}>
                        <input onClick={() => setSctiveCheckbox(1)} id={`makeAdmin${id}`} className={s.checkbox} type="checkbox" />
                        <span className={s.checkbox_label}>
                            <Image className={s.checkbox_icon} src={checkbox_icon} alt='checkbox_icon' />
                        </span>
                        <span className={s.checkbox_text}> Сделать администратором</span>
                    </label> */}

					<label htmlFor={`editContent${id}`} className={s.checkbox_wrapper}>
						<input
							checked={UserAdmin.editContent ? true : false}
							onChange={() => {
								changeUserAdmin('editContent', !UserAdmin.editContent);
								// setSctiveCheckbox(2)
								// dispatch(setChangeCheckbox({id: id, branch: 'editContent', bool: !UserAdmin.editContent }))
							}}
							id={`editContent${id}`}
							className={s.checkbox}
							type="checkbox"
						/>
						<span className={s.checkbox_label}>
							<Image
								className={s.checkbox_icon}
								src={checkbox_icon}
								alt="checkbox_icon"
							/>
						</span>
						<span className={s.checkbox_text}> Редактирование товара</span>
					</label>
				</div>

				<div className={s.checkbox_wrapper_second}>
					<label htmlFor={`addContent${id}`} className={s.checkbox_wrapper}>
						<input
							checked={UserAdmin.addContent ? true : false}
							onChange={() => {
								changeUserAdmin('addContent', !UserAdmin.addContent);
								// setUserAdmin(prevState => ({ ...prevState, ['addContent']: !prevState.addContent }))
								// dispatch(setChangeCheckbox({id: id, branch: 'addContent', bool: !UserAdmin.addContent }))
								// setSctiveCheckbox(3)
							}}
							id={`addContent${id}`}
							className={s.checkbox}
							type="checkbox"
						/>
						<span className={s.checkbox_label}>
							<Image
								className={s.checkbox_icon}
								src={checkbox_icon}
								alt="checkbox_icon"
							/>
						</span>
						<span className={s.checkbox_text}> Добавление товара</span>
					</label>

					<label htmlFor={`editWebsite${id}`} className={s.checkbox_wrapper}>
						<input
							checked={UserAdmin.editWebsite ? true : false}
							onChange={() => {
								changeUserAdmin('editWebsite', !UserAdmin.editWebsite);
								//setUserAdmin(prevState => ({ ...prevState, ['editWebSite']: !prevState.editWebSite }))
								// dispatch(setChangeCheckbox({id: id, branch: 'editWebSite', bool: !UserAdmin.editWebSite }))
								// setSctiveCheckbox(4)
							}}
							id={`editWebsite${id}`}
							className={s.checkbox}
							type="checkbox"
						/>
						<span className={s.checkbox_label}>
							<Image
								className={s.checkbox_icon}
								src={checkbox_icon}
								alt="checkbox_icon"
							/>
						</span>
						<span className={s.checkbox_text}> Редактирование сайта</span>
					</label>

					<label htmlFor={`isAdmin${id}`} className={s.checkbox_wrapper}>
						<input
							checked={UserAdmin.isAdmin ? true : false}
							onChange={() => {
								changeUserAdmin('isAdmin', !UserAdmin.isAdmin);
								//    console.log(`user ${id}`, !UserAdmin.isAdmin)
								//    dispatch(setChangeCheckbox({id: id, branch: 'isAdmin', bool: !UserAdmin.isAdmin }))
							}}
							onClick={() => setSctiveCheckbox(1)}
							id={`isAdmin${id}`}
							className={s.checkbox}
							type="checkbox"
						/>
						<span className={s.checkbox_label}>
							<Image
								className={s.checkbox_icon}
								src={checkbox_icon}
								alt="checkbox_icon"
							/>
						</span>
						<span className={s.checkbox_text}> Сделать администратором</span>
					</label>

					{/* <label htmlFor={`editSite${id}`} className={s.checkbox_wrapper}>
                        <input onClick={() => setSctiveCheckbox(4)} id={`editSite${id}`} className={s.checkbox} type="checkbox" />
                        <span className={s.checkbox_label}>
                            <Image className={s.checkbox_icon} src={checkbox_icon} alt='checkbox_icon' />
                        </span>
                        <span className={s.checkbox_text}> Редактирование сайта</span>
                    </label> */}
				</div>

				<div
					onClick={(e) => {
						//  console.log('UserAdmin', UserAdmin)
						e.preventDefault();
						e.stopPropagation();
						setUserOpenOK(id);
						sendUserAdmin();
					}}
					className={openUser ? s.btn_save : s.btn_save_off}
				>
					Сохранить
				</div>
			</div>
		</div>
	);
};
