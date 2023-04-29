import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import { selectFetchedColours } from '@/redux/slices/goods';
import s from './CatalogFilters.module.scss';
import { useRouter } from 'next/router';
import FiltersCheckbox from './FiltersCheckbox';
import { useTranslation } from 'next-i18next';
const FiltersColours = () => {
	const { t } = useTranslation('catalog');
	const { locale } = useRouter();
	const fetchedColours = useAppSelector(selectFetchedColours);

	return (
		<div className={s.colors_wrapper}>
			<p className={s.filters_title}>{t('color')}</p>
			<div className={s.filters_body}>
				{fetchedColours?.map((el) => {
					return (
						<FiltersCheckbox
							label={el?.[locale]}
							color={el?.hex}
							key={el?.id + el?.createdAt + el?.hex}
							type="colour"
							itemId={el?.id}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default FiltersColours;
