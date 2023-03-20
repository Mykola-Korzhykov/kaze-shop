import React from 'react'
import Link from 'next/link'
import { useAppDispatch } from '@/redux/hooks'
import { updateCartProduct } from '@/redux/slices/goods'
import s from './Compare.module.scss'
const CompareSkip = () => {
	const dispatch = useAppDispatch()
	const skipButtonHandler = () => {
		dispatch(updateCartProduct())
	}
	return (
		<div className={s.skip_wrapper}>
			<Link href={'/cart'}>
				<button onClick={skipButtonHandler} className={s.skip}>
					Пропустить
				</button>
			</Link>
		</div>
	)
}

export default CompareSkip
