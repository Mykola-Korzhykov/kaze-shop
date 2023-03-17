import React, { FC } from 'react'
import s from './CatalogItems.module.scss'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { selectAuthState } from '@/redux/slices/user'
import { addProductToBasket } from '@/redux/slices/goods'
import Image from 'next/image'
import Link from 'next/link'
import { Goods } from '@/types/goods'
import { useRouter } from 'next/router'
import catalogImg from '../../../../assets/images/catalogItem.png'
import catalogImg2 from '../../../../assets/images/catalogImg2.png'
import { Api } from '@/services'
interface ICatalogItemProps {
	product?: Goods
}
const CatalogItem: FC<ICatalogItemProps> = ({ product }) => {
	const dispatch = useAppDispatch()
	const [isHovering, setIsHovered] = React.useState(false)
	const onMouseEnter = () => setIsHovered(true)
	const onMouseLeave = () => setIsHovered(false)
	const isAuth = useAppSelector(selectAuthState)
	const router = useRouter()
	const saveButtonHandler = () => {
		if (isAuth) {
			try {
				Api().goods.addToFavorites(product?.id)
			} catch (e) {}
		} else {
			router.push('/login')
		}
	}
	const basketButtonHandler = () => {
		dispatch(addProductToBasket(product))
		router.push('/compare')
	}

	const addToLastViews = () => {
		if (isAuth) {
			try {
				Api().goods.addToRecentlyViews(product?.id)
			} catch (e) {}
		}
		const recentlyViewedProductsJSON = localStorage.getItem(
			'recentlyViewedProducts'
		)
		const recentlyViewedProducts = JSON.parse(recentlyViewedProductsJSON)
		if (!recentlyViewedProducts) {
			localStorage.setItem('recentlyViewedProducts', String(product?.id))
		}else {
			localStorage.setItem('recentlyViewedProducts', String(product?.id))
		}
	}

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
							src={catalogImg2}
							alt='Лосины Тай дай'
							quality={95}
						/>
					) : (
						<Image
							className={s.img}
							src={catalogImg}
							alt='Лосины Тай дай'
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
	)
}

export default CatalogItem
