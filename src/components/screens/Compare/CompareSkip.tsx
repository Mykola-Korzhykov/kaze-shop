import React from 'react'
import Link from 'next/link'
import { Router, useRouter } from 'next/router'
import { useAppDispatch } from '@/redux/hooks'
import { updateCartProduct } from '@/redux/slices/goods'
import s from './Compare.module.scss'
const CompareSkip = () => {
	const router = useRouter()
	const dispatch = useAppDispatch()
	const skipButtonHandler = () => {
		dispatch(updateCartProduct())
		router.push('/cart')
	}
	return (
		<div className={s.skip_wrapper}>
			<button onClick={skipButtonHandler} className={s.skip}>
				Пропустить
			</button>
		</div>
	)
}

export default CompareSkip
