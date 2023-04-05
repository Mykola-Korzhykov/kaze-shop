import React, { FC } from 'react';
import s from './CatalogItems.module.scss';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { selectAuthState, selectUserInfo } from '@/redux/slices/user';
import { addProductToCompare, addProductToCart } from '@/redux/slices/goods';
import Image from 'next/image';
import Link from 'next/link';
import { Goods, sendProductToCart } from '@/types/goods';
import { useRouter } from 'next/router';
import catalogImg from '../../../../assets/images/catalogItem.png';
import catalogImg2 from '../../../../assets/images/catalogImg2.png';
import { Api } from '@/services';
interface ICatalogItemProps {
	product?: Goods;
}
const CatalogItem: FC<ICatalogItemProps> = ({ product }) => {
	const dispatch = useAppDispatch();
	const [isHovering, setIsHovered] = React.useState(false);
	const onMouseEnter = () => setIsHovered(true);
	const onMouseLeave = () => setIsHovered(false);
	const isAuth = useAppSelector(selectAuthState);
	const user = useAppSelector(selectUserInfo);
	const router = useRouter();
	const saveButtonHandler = () => {
		if (isAuth && user?.type === 'USER') {
			try {
				Api().goods.addToFavorites(product?.id);
			} catch (e) {}
		} else if (!isAuth) {
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
			})
		);
		dispatch(addProductToCompare(product));
		router.push('/compare');
	};

	const addToLastViews = () => {
		if (isAuth && user?.type === 'USER') {
			try {
				Api().goods.addToRecentlyViews(product?.id);
			} catch (e) {}
		}
		const recentlyViewedProductsJSON = localStorage.getItem(
			'recentlyViewedProducts'
		);
		const recentlyViewedProducts = JSON.parse(recentlyViewedProductsJSON) || [];
		if (!recentlyViewedProducts?.includes(product?.id)) {
			recentlyViewedProducts.push(product?.id);
			localStorage.setItem(
				'recentlyViewedProducts',
				JSON.stringify(recentlyViewedProducts)
			);
		}
	};

	return (
		<div className={s.catalogItem}>
			<Link href={`/product/${product?.id ?? 'productId'}`}>
				<div
					className={s.imgWrapper}
					onMouseEnter={onMouseEnter}
					onMouseLeave={onMouseLeave}
					onClick={addToLastViews}
				>
					{isHovering ? (
						<Image
							className={s.img}
							src={product.images[1]?.imagesPaths[1] ?? catalogImg}
							width={285}
							height={360}
							alt={product?.title?.en}
							quality={95}
						/>
					) : (
						<Image
							className={s.img}
							src={product?.images[0]?.imagesPaths[2] ?? catalogImg2}
							width={285}
							height={360}
							alt={product?.title?.en}
							quality={95}
						/>
					)}
				</div>
			</Link>
			<div>
				<p className={s.title}>{product?.title?.ua ?? 'Title'}</p>
				<span className={s.price}>{product?.price ?? '0$'}</span>
			</div>
			<div className={s.footer}>
				<button onClick={basketButtonHandler} className={s.footer_button}>
					В корзину
				</button>
				<button onClick={saveButtonHandler} className={s.footer_icon}></button>
			</div>
		</div>
	);
};

export default CatalogItem;
