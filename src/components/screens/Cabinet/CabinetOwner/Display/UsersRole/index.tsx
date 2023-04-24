import { useAppDispatch } from '@/redux/hooks';
import { findUsersRole, getUsersRole } from '@/redux/slices/admin';
import { RootState } from '@/redux/store';
import debounce from 'lodash.debounce';
import React from 'react';
import { useSelector } from 'react-redux';
import { UserRole } from './UsersRole/UserRole';
import s from './UsersRole.module.scss';
import Image from 'next/image';
import findUser from '../../../../../../assets/icons/cabinetAdmin/findUser.svg';

export const UsersRole: React.FC = () => {
	// UserRole
	const dispatch = useAppDispatch();
	const usersRoleUI = useSelector((state: RootState) => state.admin.usersRole);
	const [activePaginatoinRole, setActivePaginatoinRole] =
		React.useState<number>(1);
	const [idUserOpen, setUserOpen] = React.useState<number>(0);
	const [paginationLendthRole, setPaginationLendthRole] = React.useState<any[]>(
		[]
	);
	const usersRoleStatus = useSelector(
		(state: RootState) => state.admin.usersRoleStatus
	);

	React.useEffect(() => {
		let countoRolePagination = Math.ceil(usersRoleUI.length / 10);
		let arrRolePagination: number[] = [];
		for (let i = 1; i < countoRolePagination + 1; i++) {
			arrRolePagination.push(i);
		}
		setPaginationLendthRole(arrRolePagination);
	}, []);

	const debouncedSearchRole = debounce((term) => {
		dispatch(findUsersRole(term));
	}, 500);

	// React.useEffect(() => {
	// 	// console.log('запыт getUsersRole')
	// 	dispatch(getUsersRole(activePaginatoinRole));
	// }, [activePaginatoinRole]);

	return (
		<>
			<label htmlFor="findUser" className={s.input_wrapper_on}>
				<span className={s.text}> Пользователь </span>
				<div className={s.input_wrapper}>
					<input
						onChange={(e) => {
							if (e.target.value === '' || e.target.value === ' ') {
								dispatch(getUsersRole(activePaginatoinRole));
							} else {
								debouncedSearchRole(
									e.target.value.toLowerCase().split(' ').join(',')
								);
								console.log(
									'debouncedSearchRole',
									e.target.value.toLowerCase().split(' ').join(',')
								);
							}
						}}
						className={s.input}
						id="findUser"
						type="findUser"
					/>
					<Image src={findUser} alt="findUser" />
				</div>
			</label>

			{/* Успешный ответ и есть юзеры */}
			{usersRoleStatus === 'success' &&
				usersRoleUI.length > 0 &&
				usersRoleUI.map((el, ind) => {
					return (
						<UserRole
							name={el.name}
							editContent={el.editContent}
							surname={el.surname}
							phoneNumber={el.phoneNumber}
							email={el.email}
							isAdmin={el.isAdmin}
							editWebsite={el.editWebsite}
							addContent={el.addContent}
							key={ind}
							setUserOpenOK={setUserOpen}
							idUserOpen={idUserOpen}
							id={el.id}
						/>
					);
				})}

			{usersRoleStatus === 'success' && usersRoleUI.length < 1 && (
				<div className={s.title_wrapper}>
					<div className={s.title}> Пользователей не найдено </div>
					<p className={s.description}>
						В Вашем интернет магазине пока не зарегистрированных пользователей
					</p>
				</div>
			)}

			{usersRoleStatus === 'error' && (
				<div className={s.title_wrapper}>
					<div className={s.title}> Ошибка </div>
					{/* <p className={s.description}>
                            В Вашем интернет магазине пока не зарегистрированных пользователей
                        </p> */}
				</div>
			)}

			{usersRoleStatus === 'error403' && (
				<div className={s.title_wrapper}>
					<div className={s.title}> Администратор не подтвердил права </div>
					<p className={s.description}>
						Для того, чтобы администратор начал работать с сайтом, он должен
						подтвердить права на почте
					</p>
				</div>
			)}

			{usersRoleStatus === 'pending' && (
				<div className={s.spinner_wrapper}>
					<div className={s.spinner_title}>Загрузка пользователей</div>
					<div className={s.spinner}>
						<div className={s.bounce1}></div>
						<div className={s.bounce2}></div>
						<div className={s.bounce3}></div>
					</div>
				</div>
			)}

			{usersRoleStatus === 'success' && usersRoleUI.length > 1 && (
				<div className={s.pagination_wrapper}>
					{paginationLendthRole.map((el) => {
						return (
							<span
								key={el}
								onClick={() => {
									setActivePaginatoinRole(el);
								}}
								className={activePaginatoinRole === el ? s.item_active : s.item}
							>
								{el}
							</span>
						);
					})}
				</div>
			)}
		</>
	);
};
