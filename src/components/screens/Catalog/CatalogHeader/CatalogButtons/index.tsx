import React, { FC } from 'react';
import FilterButton from './FilterButton';
import SortButton from './SortButton';
import s from './CatalogButtons.module.scss';
import { useTranslation } from 'next-i18next';
const CatalogButtons: FC = () => {
	const { t } = useTranslation('catalog');
	return (
		<div className={s.buttonsWrapper}>
			<SortButton text={t('sortBy')} />
			<FilterButton text={t('filter')} />
		</div>
	);
};

export default CatalogButtons;
