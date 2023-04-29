import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import { selectFetchedCategories } from '@/redux/slices/goods';
import s from './CatalogFilters.module.scss';
import FiltersCheckbox from './FiltersCheckbox';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
const FiltersCategories = () => {
	const { t } = useTranslation('catalog');
	const { locale } = useRouter();
	const fetchedCategories = useAppSelector(selectFetchedCategories);

	return (
		<div className={s.colors_wrapper}>
			<p className={s.filters_title}>{t('categories')}</p>
			<div className={s.filters_body}>
				{fetchedCategories?.map((el) => {
					return (
						<FiltersCheckbox
							key={el?.id + el?.createdAt + el?.rs}
							label={el?.[locale]}
							color={'white'}
							type="category"
							itemId={el?.id}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default FiltersCategories;
