import React from 'react'
import { useRouter } from 'next/router'
import { useAppDispatch } from '@/redux/hooks'
import {
	updateCartProduct,
	filterGoods,
} from '@/redux/slices/goods'
import s from './Compare.module.scss'

const CompareSkip = () => {
	const router = useRouter()
	const dispatch = useAppDispatch()
	const skipButtonHandler = () => {
		dispatch(updateCartProduct())
		console.log('button clicked')
	}
	return (
		<div className={s.skip_wrapper}>
			<button
				onClick={() => {
					console.log('func')
					dispatch(updateCartProduct())
				}}
				className={s.skip}
			>
				Пропустить
			</button>
		</div>
	)
}

export default CompareSkip
