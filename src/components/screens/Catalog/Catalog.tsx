import React, { FC } from 'react'
import Link from 'next/link'
import CatalogHeader from './CatalogHeader'
import CatalogItems from './CatalogItems'
import CatalogFilters from './CatalogFilters'
const Catalog: FC = () => {
	return (
		<main className='content'>
			<div className='container'>
				<div className='page_coordinator'>
					<Link href='/'>Главная</Link> | <span>Каталог</span>
				</div>
				<CatalogHeader />
				<CatalogFilters/>
				<CatalogItems />
			</div>
		</main>
	)
}

export default Catalog
