import React, { FC } from 'react';
import s from './CatalogItems.module.scss';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import {
	selectAuthState,
	selectUserInfo,
	deleteSavedProduct,
	addUserInfo,
} from '@/redux/slices/user';
import { useTranslation } from 'next-i18next';
import {
	addProductToCompare,
	addProductToCart,
	addToSavedProducts,
	deleteCatalogSavedProduct,
} from '@/redux/slices/goods';
import { setLoadingStatus } from '@/redux/slices/goods';
import Image from 'next/image';
import Link from 'next/link';
import { Goods, sendProductToCart } from '@/types/goods';
import { useRouter } from 'next/router';
import catalogImg from '../../../../assets/images/catalogItem.png';
import catalogImg2 from '../../../../assets/images/catalogImg2.png';
import { setCookie } from 'nookies';
import Cookies from 'js-cookie';
import { Api } from '@/services';
interface ICatalogItemProps {
	product?: Goods;
}
const CatalogItem: FC<ICatalogItemProps> = ({ product }) => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation('catalog');
	const [isHovering, setIsHovered] = React.useState(false);
	const onMouseEnter = () => setIsHovered(true);
	const onMouseLeave = () => setIsHovered(false);
	const isAuth = useAppSelector(selectAuthState);
	const user = useAppSelector(selectUserInfo);
	const savedProducts = useAppSelector(
		(state) => state.goods.catalogSavedProducts
	);
	const isSavedProductsTab = useAppSelector(
		(state) => state.user.isSavedProductsTab
	);
	const router = useRouter();

	const fetchUserData = async () => {
		try {
			const data = await Api().user.getMe(router?.locale);

			setCookie(null, 'accessToken', data?.accessToken, {
				expires: data?.maxAge,
				path: '/',
			});
			if (data?.user) {
				dispatch(addUserInfo(data?.user));
			}
			if (data?.admin) {
				dispatch(addUserInfo(data?.admin));
			}
			if (data?.owner) {
				dispatch(addUserInfo(data?.owner));
			}
		} catch (e) {
			//router.push('/404')
			if (e?.response?.status === 400 || e?.response?.status === 404) {
				Cookies.remove('accessToken');
				router.push('/login');
			}
		}
	};

	const saveButtonHandler = () => {
		if (
			isSavedProductsTab ||
			savedProducts.includes(product?.id) ||
			product?.isSaved
		) {
			deleteSavedProductFunc();
		} else {
			addSavedProduct();
		}
	};

	const addSavedProduct = () => {
		// if (isAuth && user?.type === 'USER') {
		// 	try {
		// 		Api().goods.addToFavorites(product?.id);
		// 		dispatch(addToSavedProducts(product?.id));
		// 	} catch (e) {
		// 		router.push('/404');
		// 	}
		// } else if (!isAuth) {
		// 	router.push('/login');
		// }
		if (isAuth) {
			if (!user) {
				fetchUserData();
			}
			try {
				Api().goods.addToFavorites(product?.id);
				dispatch(addToSavedProducts(product?.id));
			} catch (e) {
				router.push('/404');
			}
		} else {
			router.push('/login');
		}
	};

	const deleteSavedProductFunc = () => {
		// if (isAuth && user?.type === 'USER') {
		// 	dispatch(deleteSavedProduct(product?.id));
		// 	dispatch(deleteCatalogSavedProduct(product?.id));
		// 	try {
		// 		Api().user.deleteUserSavedProduct(product?.id);
		// 	} catch (e) {
		// 		router.push('/404');
		// 	}
		// } else if (!isAuth) {
		// 	router.push('/login');
		// }

		if (isAuth) {
			if (!user) {
				fetchUserData();
			}
			dispatch(deleteSavedProduct(product?.id));
			dispatch(deleteCatalogSavedProduct(product?.id));
			try {
				Api().user.deleteUserSavedProduct(product?.id);
			} catch (e) {
				router.push('/404');
			}
		} else {
			router.push('/login');
		}
	};

	const basketButtonHandler = () => {
		dispatch(
			addProductToCart({
				id: product?.id,
				imageUrl: product?.images[0]?.imagesPaths[0],
				colourId: product?.images[0]?.colour?.id,
				size: product?.sizes[0],
				fromCatalog: true,
			})
		);
		dispatch(addProductToCompare(product));
		router.push('/compare');
	};

	const addToLastViews = () => {
		dispatch(setLoadingStatus('loading'));
		if (isAuth && user?.type === 'USER') {
			try {
				Api().goods.addToRecentlyViews(product?.id);
			} catch (e) {}
		}
		const recentlyViewedProductsJSON = localStorage.getItem(
			'recentlyViewedProducts'
		);
		const recentlyViewedProducts = JSON.parse(recentlyViewedProductsJSON) || [];
		if (product && recentlyViewedProducts?.indexOf(product?.id) === -1) {
			recentlyViewedProducts?.push(product?.id);
			localStorage.setItem(
				'recentlyViewedProducts',
				JSON.stringify(recentlyViewedProducts)
			);
		}
	};

	return (
		<div className={s.catalogItem}>
			<Link href={`/product/${product?.id}`}>
				<div
					className={s.imgWrapper}
					onMouseEnter={onMouseEnter}
					onMouseLeave={onMouseLeave}
					onClick={addToLastViews}
				>
					{isHovering ? (
						<Image
							className={s.img}
							src={product?.images?.[0]?.imagesPaths?.[1] ?? catalogImg}
							width={285}
							height={360}
							alt={product?.title?.en ?? 'catalog image'}
							quality={95}
						/>
					) : (
						<Image
							className={s.img}
							src={product?.images?.[0]?.imagesPaths?.[0] ?? catalogImg2}
							width={285}
							height={360}
							alt={product?.title?.en ?? 'catalog img'}
							quality={95}
						/>
					)}
				</div>
			</Link>
			<div>
				<p className={s.title}>
					{product?.title?.[router.locale].substring(0, 22) ?? 'Title'}
				</p>
				<span className={s.price}>{product?.price ?? '0$'}</span>
			</div>
			<div className={s.footer}>
				<button onClick={basketButtonHandler} className={s.footer_button}>
					{t('addToCart')}
				</button>
				<button
					onClick={saveButtonHandler}
					className={
						isSavedProductsTab ||
						product?.isSaved ||
						savedProducts.includes(product?.id)
							? s.footer_iconActive
							: s.footer_icon
					}
				></button>
			</div>
		</div>
	);
};

export default CatalogItem;
