import React, { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Goods } from '@/types/goods'
import CompareSkip from './CompareSkip'
import { addCompareProductToModal } from '@/redux/slices/goods'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import cartImage from '../../../assets/images/cartItem.png'
import s from './Compare.module.scss'
const CompareOfferItems: FC<{ setShowModal: (state: boolean) => void }> = ({
	setShowModal,
}) => {
	const dispatch = useAppDispatch()
	const compareOfferProducts = useAppSelector(
		state => state.goods.compareOfferProducts
	)
	const compareModalHandler = (product: Goods) => {
		dispatch(addCompareProductToModal(product))
		setShowModal(true)
	}
	return (
		<div className={s.items}>
			{compareOfferProducts?.map(product => {
				return (
					<div className={s.item} key={product?.id}>
						<div className={s.imgWrapper}>
							<Image
								src={product?.images[0]?.imagesPaths[1] ?? cartImage}
								fill
								alt='Cart image'
								className={s.img}
								priority={true}
								quality={95}
							/>
						</div>
						<div className={s.content}>
							<div className={s.text}>
								<p className={s.title}>{product?.title.ua}</p>
								<p className={s.descr}>{product?.description?.ua}</p>
								<p className={s.price}>{product?.price}</p>
							</div>

							<button
								onClick={() => compareModalHandler(product)}
								className={s.plus}
							></button>
						</div>
					</div>
				)
			})}

			<CompareSkip />
		</div>
	)
}

export default CompareOfferItems
