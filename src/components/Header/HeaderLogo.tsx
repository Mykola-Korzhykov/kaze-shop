import cl from './Header.module.scss'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import { StrapiAxios } from '@/services/strapiAxios'
import { LogoResT } from '@/types/mainPageRequest/logo'
import { useRouter } from 'next/router'
import FormSpinner from '../screens/Order/FormSpinner/FormSpinner'
const HeaderLogo: FC = () => {
	const [logo, setLogo] = useState<null | string>(null);
	const { locale } = useRouter();
	let myLocale = locale === 'ua' ? 'uk' : locale;
	myLocale = myLocale === 'rs' ? 'sr' : myLocale;

	useEffect(() => {
		StrapiAxios.get<LogoResT>('/api/logos?populate=deep&locale=' + myLocale)
			.then(res => setLogo(res.data.data[0].attributes.logo))
			.catch(err => setLogo('Kaze Shop'));
	}, []);

	return (
		<Link href={'/'} className={cl.header__logo}>
			{logo ? logo : <FormSpinner />}
		</Link>
	)
}

export default HeaderLogo
