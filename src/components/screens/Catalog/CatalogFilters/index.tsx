import React, { FC } from 'react';
import { motion } from 'framer-motion';
import s from './CatalogFilters.module.scss';
import FiltersColors from './FiltersColours';
import FiltersSizes from './FiltersSizes';
import FiltersButton from './FiltersSubmitButton';
import FiltersCategories from './FiltersCategories';

const CatalogFilters: FC = () => {
	return (
		<motion.div
			className={s.filters_wrapper}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0, transition: { duration: 0.5 } }}
			onAnimationComplete={() =>
				window.scrollTo({ top: 0, behavior: 'smooth' })
			}
		>
			<FiltersColors />
			<FiltersCategories />
			<FiltersSizes />
			<FiltersButton />
		</motion.div>
	);
};

export default CatalogFilters;
