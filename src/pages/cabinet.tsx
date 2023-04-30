import Cabinet from '@/components/screens/Cabinet/Cabinet';
import SpinnerLayout from '@/layouts/SpinnerLayout';
import { useAppSelector } from '@/redux/hooks';
import { NextPage } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { withAuth } from '@/hoc/RequiredAuth';
import s from './pagesStyles.module.scss';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import React from 'react';

const CabinetPage: NextPage = () => {
	const cookies = parseCookies();
	const router = useRouter();
	const isAuth = useAppSelector((state) => state.user.isAuth);
	const sentProductForm = useSelector(
		(state: RootState) => state.modaleSlice.sentProductForm
	);
	const modalEditProductTurn = useSelector(
		(state: RootState) => state.modaleSlice.modalAddEditProduct
	);
	const modalAddCAtegoryTurn = useSelector(
		(state: RootState) => state.modaleSlice.modalAddCAtegory
	);
	const modalAddPhotoTurn = useSelector(
		(state: RootState) => state.modaleSlice.modalAddPhoto
	);
	const [windowHidth, setWindowHidth] = React.useState<number>(0);
	const contentMain = React.useRef();

	useEffect(() => {
		const handleResize = () => {
			if (contentMain.current) {
				//@ts-ignore
				setWindowHidth(contentMain.current.clientHeight);
			}
		};

		handleResize(); // получить высоту при монтировании

		window.addEventListener('resize', handleResize); // добавить обработчик

		return () => window.removeEventListener('resize', handleResize); // удалить обработчик при размонтировании
	});

	useEffect(() => {
		// if (!cookies?.accessToken) {
		// 	router.push('/login');
		// }
	}, []);
	return (
		<div className={s.wrapper} ref={contentMain}>
			{modalAddCAtegoryTurn && (
				<div
					style={{
						height: `${windowHidth}px`,
					}}
					className={s.backround_for_modal}
				></div>
			)}
			{modalEditProductTurn && (
				<div
					style={{
						height: `${windowHidth}px`,
					}}
					className={s.backround_for_modal}
				></div>
			)}
			{modalAddPhotoTurn && (
				<div
					style={{
						height: `${windowHidth + 100}px`,
					}}
					className={s.backround_for_modal}
				></div>
			)}
			{sentProductForm.turn && (
				<div
					style={{
						height: `${windowHidth}px`,
					}}
					className={s.backround_for_modal}
				></div>
			)}
			<SpinnerLayout>
				<Cabinet />
			</SpinnerLayout>
		</div>
	);
};

export const getServerSideProps = withAuth(async (context) => {
	return {
		props: {
			...(await serverSideTranslations(context.locale, [
				'common',
				'cabinet',
				'signup',
				'login',
			])),
		},
	};
});

export default CabinetPage;
