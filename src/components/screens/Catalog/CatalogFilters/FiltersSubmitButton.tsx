import React from 'react';
import { filterGoods } from '@/redux/slices/goods';
import { useAppDispatch } from '@/redux/hooks';
import s from './CatalogFilters.module.scss';
import { useTranslation } from 'next-i18next';
const FiltersButton = () => {
	const { t } = useTranslation('catalog');
	const dispatch = useAppDispatch();
	const submitFilter = () => {
		dispatch(filterGoods());
	};
	return (
		<div className={s.filters_buttonWrapper}>
			<button onClick={submitFilter} className={s.filters_submitBtn}>
				{t('applyFilter')}
			</button>
		</div>
	);
};

export default FiltersButton;
