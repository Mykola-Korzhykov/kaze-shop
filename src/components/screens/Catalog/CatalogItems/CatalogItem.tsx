import React, { FC } from 'react'
import s from './CatalogItems.module.scss'
import { useAppSelector } from '@/redux/hooks'
import { selectAuthState } from '@/redux/slices/user'
import Image from 'next/image'
import Link from 'next/link'
import { Goods } from '@/types/goods'
import { useRouter } from 'next/router'
import catalogImg from '../../../../assets/images/catalogItem.png'
import catalogImg2 from '../../../../assets/images/catalogImg2.png'
interface ICatalogItemProps {
	product?: Goods
}
const CatalogItem: FC<ICatalogItemProps> = ({ product }) => {
	const [isHovering, setIsHovered] = React.useState(false)
	const onMouseEnter = () => setIsHovered(true)
	const onMouseLeave = () => setIsHovered(false)
	const isAuth = useAppSelector(selectAuthState)
	const router = useRouter()
	const saveButtonHandler = () => {
		if (isAuth) {
			console.log('auth')
		} else {
			router.push('/login')
		}
	}
	const basketButtonHandler = () => {
		router.push('/compare')
	}

	return (
		<div className={s.catalogItem}>
			<Link href={`/product/${'productId'}`}>
				<div
					className={s.imgWrapper}
					onMouseEnter={onMouseEnter}
					onMouseLeave={onMouseLeave}
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
				<p className={s.title}>Лосины Тай дай</p>
				<span className={s.price}>78$</span>
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
