import { useAppSelector } from '@/redux/hooks'
import cl from './Header.module.scss'
import Link from 'next/link'
import { FC } from 'react'
const HeaderLogo: FC = () => {
	const logo = useAppSelector(store => store.strapiValues.logo);
	return (
		<Link href={'/'} className={cl.header__logo}>
			{logo}
		</Link>
	)
}

export default HeaderLogo
