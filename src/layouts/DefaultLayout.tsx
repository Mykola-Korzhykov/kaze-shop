import React, { FC, useState, useRef, useEffect } from 'react'
import { Russo_One } from '@next/font/google'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import Head from 'next/head'
const RussoOne = Russo_One({
	weight: '400',
	subsets: ['latin', 'cyrillic'],
})
const DefaultLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
	const [isSticky, setIsSticky] = useState<boolean>(false)
	const [headerHeight, setHeaderHeight] = useState<number | undefined>(0)

	const headerRef = useRef<HTMLElement>(null)

	useEffect(() => {
		window.addEventListener('scroll', () => {
			setHeaderHeight(headerRef.current?.offsetHeight)

			if (window.scrollY > 0) {
				setIsSticky(true)
			} else {
				setIsSticky(false)
			}
		})
	}, [])

	return (
		<>
			<Head>
				<title>Kaze shop</title>
				<meta name='description' content='Generated by create next app' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link rel='preconnect' href='https://fonts.gstatic.com' />
				{/* above links gives build error. Now they are in _document.tsx */}
				{/* <link
					href='https://fonts.googleapis.com/css2?family=Russo+One&display=swap'
					rel='stylesheet'
				/>
				<link
					href='https://fonts.googleapis.com/css2?family=Georama:wght@300;400&display=swap'
					rel='stylesheet'
				></link> */}
			</Head>

			<div className='wrapper'>
				<Header isSticky={isSticky} headerRef={headerRef} />
				{children}
				{/* <Footer /> */}
			</div>
		</>
	)
}

export default DefaultLayout
