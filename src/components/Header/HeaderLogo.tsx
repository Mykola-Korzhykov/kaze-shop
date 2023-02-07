import cl from './Header.module.scss'
import Link from 'next/link'
import { FC } from 'react'
const HeaderLogo:FC = () => {
	return (
		<Link href={'/'} className={cl.header__logo}>
			Kaze Sport
		</Link>
	)
}

export default HeaderLogo
