import React, { FC, useState, createContext } from 'react'
import Link from 'next/link'
import CatalogContext from '@/context/CatalogContext'
import CatalogHeader from './CatalogHeader'
import CatalogItems from './CatalogItems'
import CatalogFilters from './CatalogFilters'
const Catalog: FC = () => {
	const [filtersOpened, setFiltersOpened] = useState<boolean>(false)
	return (
		<CatalogContext.Provider value={{ filtersOpened, setFiltersOpened }}>
			<main className='content'>
				<div className='container'>
					<div className='page_coordinator'>
						<Link href='/'>Главная</Link> | <span>Каталог</span>
					</div>
					<CatalogHeader />
					{filtersOpened && <CatalogFilters />}
					<CatalogItems />
				</div>
			</main>
		</CatalogContext.Provider>
	)
}

export default Catalog
