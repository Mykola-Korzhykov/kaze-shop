import React from 'react';
import Image from 'next/image';
import ArrowUser from '../../../../../../../assets/icons/ArrowUser.svg';
import s from './UserRole.module.scss';
//icons
import userIcone from '../../../../../../../assets/icons/User/user_icon.svg';
import phoneIcone from '../../../../../../../assets/icons/User/phone_icon.svg';
import emailIcone from '../../../../../../../assets/icons/User/email_icon.svg';
import checkbox_icon from '../../../../../../../assets/icons/User/checkbox_icon.svg';
import { API_URL } from '../../../../../../../services/index';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useAppDispatch } from '@/redux/hooks';
import {
	getUsersAdmin,
	getUsersRole,
} from '../../../../../../../redux/slices/admin';
import { setProductForm } from '@/redux/slices/modal';
// import { useWhyDidYouUpdate } from 'ahooks';

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
	activePaginatoinRole?: number;
}

export const UserRole: React.FC<UserProps> = ({
	activePaginatoinRole,
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
	const openUser = id === idUserOpen ? true : false;
	const [activeCheckbox, setSctiveCheckbox] = React.useState<number | null>(
		null
	);
	const [sizeWindow, setSizeWindow] = React.useState<number>(0);

	React.useEffect(() => {
		setSizeWindow(window.innerWidth);
	}, []);

	const [UserRole, setUserRole] = React.useState<{
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

	const dispatch = useAppDispatch();

	function sendUserRole(role: string, bool: boolean) {
		const cookies = Cookies.get();
		const token = cookies.accessToken;
		const instance = axios.create({
			baseURL: API_URL,
			withCredentials: true,
			headers: {
				Authorization: 'Bearer ' + (token || ''),
			},
		});

		setUserRole({
			...UserRole,
			[role]: bool,
		});

		instance
			.put('/admin/create_admin', {
				...UserRole,
				[role]: bool,
			})

			.then((response) => {
				if (response && response.status === 201)
					dispatch(
						setProductForm({
							turn: true,
							title: 'Пользователь успешно изменен',
							subtitle: `Нажмите 'готово' чтобы продолжить`,
							btntitle: 'готово',
							spiner: false,
							bottom:
								sizeWindow < 500
									? -10
									: sizeWindow < 900
									? -55
									: sizeWindow > 1079
									? 150
									: sizeWindow > 1045
									? 150
									: sizeWindow > 899
									? 350
									: 1,
						})
					);
			})
			.catch((error) => {
				dispatch(
					setProductForm({
						turn: true,
						title: 'Error',
						subtitle: `Error: ${error}`,
						btntitle: 'ok',
						spiner: false,
						bottom:
							sizeWindow < 500
								? -10
								: sizeWindow < 900
								? -55
								: sizeWindow > 1079
								? 150
								: sizeWindow > 1045
								? 150
								: sizeWindow > 899
								? 350
								: 1,
					})
				);
			});
		console.log('sizeWindow', sizeWindow);
		dispatch(
			setProductForm({
				turn: true,
				title: 'Загрузка...',
				subtitle: 'Изменения пользователя',
				btntitle: 'ok',
				spiner: true,
				bottom:
					sizeWindow < 500
						? -10
						: sizeWindow < 900
						? -55
						: sizeWindow > 1079
						? 150
						: sizeWindow > 1045
						? 150
						: sizeWindow > 899
						? 350
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
						onClick={() => {
							setUserOpenOK(idUserOpen === id ? -1 : id);
						}}
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
						{surname} {name}
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
					<label htmlFor={`isAdmin${id}`} className={s.checkbox_wrapper}>
						<input
							checked={UserRole.isAdmin ? true : false}
							onChange={() => {
								sendUserRole('isAdmin', !UserRole.isAdmin);
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
				</div>
			</div>
		</div>
	);
};
