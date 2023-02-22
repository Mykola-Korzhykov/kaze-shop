import React from 'react'
import SpinnerLayout from '../layouts/SpinnerLayout'
import Catalog from '@/components/screens/Catalog/Catalog'
const catalog = () => {
	return (
		<SpinnerLayout>
			<Catalog />
		</SpinnerLayout>
	)
}

export default catalog
