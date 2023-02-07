import Image from 'next/image'
import Link from 'next/link'
import cl from './Header.module.scss'
import shopingCartSVG from '../../assets/icons/ShoppingCart.svg'
import accountSVG from '../../assets/icons/User.svg'
import arrowSVG from '../../assets/icons/Arrow.svg'
import { FC } from 'react'

type Props = {
	toggleBurgerFunc: () => void;
	showBurgerMenu: boolean;
}

const HeaderInfo: FC<Props> = ({toggleBurgerFunc, showBurgerMenu}) => {
	return (
		<div className={cl.header__info}>
			<div className={cl.header__language}>
				<span>УКР</span>
				<Image
					src={arrowSVG}
					alt='link to user basket'
					width={18}
					height={18}
				/>
				{/* <div className={cl.header__language_dropdown}>
					<span>УКР</span>
					<span>УКР</span>
					<span>УКР</span>
				</div> */}
			</div>
			<Link href={'/cart'} legacyBehavior>
				<a className={cl.icon}>
					<Image
						src={shopingCartSVG}
						alt='link to user basket'
						width={28}
						height={28}
					/>
				</a>
			</Link>
			<Link href={'/cabinet'} legacyBehavior>
				<a className={cl.icon}>
					<Image
						src={accountSVG}
						alt='link to user cabiner'
						width={28}
						height={28}
						className={cl.header__info_accountSVG}
					/>
				</a>
			</Link>
			<div onClick={toggleBurgerFunc} className={`${cl.header__burger} ${showBurgerMenu ? cl.header__burger_show : ''}`}>
				<span></span>
			</div>
		</div>
	)
}

export default HeaderInfo
