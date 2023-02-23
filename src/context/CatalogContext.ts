import { createContext } from 'react'

interface ICatalogContext {
	filtersOpened: boolean
	setFiltersOpened: React.Dispatch<React.SetStateAction<boolean>>
}

const CatalogContext = createContext<ICatalogContext>({
	filtersOpened: false,
	setFiltersOpened: () => undefined,
})

export default CatalogContext
