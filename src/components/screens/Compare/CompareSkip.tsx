import React from 'react'
import Link from 'next/link'
import s from './Compare.module.scss'
const CompareSkip = () => {
	return (
		<div className={s.skip_wrapper}>
			<Link href={'/cart'}>
				<button className={s.skip}>Пропустить</button>
			</Link>
		</div>
	)
}

export default CompareSkip
