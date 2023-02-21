import React from 'react'
import s from './Main.module.scss'
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Product from './BuyProducts/Product'
//imgs
import { CSSTransition } from 'react-transition-group';

import product1 from '../../../assets/images/main/products/product1.svg'
import product2 from '../../../assets/images/main/products/product2.svg'
import product3 from '../../../assets/images/main/products/product3.svg'
//components
import BuyProducts from './BuyProducts';
import ProductFitnes from './ProductFitnes'
import About from './About'

const Main = () => {

	return (
		<div className={s.wrapper}>
			<BuyProducts />
			<ProductFitnes />
			<About />
		</div>

	)
}

export default Main
