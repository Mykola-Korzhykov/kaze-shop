import React, { FC } from 'react';
import Spinner from '@/components/Spinner/Spinner';
import { Goods } from '@/types/goods';
import { Api } from '@/services';
import s from './sizeChart.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import sizeChartImage from '../../../assets/images/sizeChartImage.png';
import { useTranslation } from 'next-i18next';
const SizeChart: FC<{
	neededProduct: {
		productName: {
			ua: string;
			ru: string;
			rs: string;
			en: string;
			[key: string]: string;
		};
		sizeChartImageDescription: {
			ua: string;
			ru: string;
			rs: string;
			en: string;
			[key: string]: string;
		};
		sizeChartImage: string;
	} | null;
}> = ({ neededProduct }) => {
	const { t } = useTranslation('common');
	const router = useRouter();
	const id = router.query.id + '';
	const [requestLoading, setRequestLoading] = React.useState<boolean>(false);
	// const [neededProduct, setNeededProduct] = React.useState<{
	// 	productName: {
	// 		ua: string;
	// 		ru: string;
	// 		rs: string;
	// 		en: string;
	// 		[key: string]: string;
	// 	};
	// 	sizeChartImageDescription: {
	// 		ua: string;
	// 		ru: string;
	// 		rs: string;
	// 		en: string;
	// 		[key: string]: string;
	// 	};
	// 	sizeChartImage: string;
	// } | null>(null);
	// React.useEffect(() => {
	// 	const fetchProductData = async () => {
	// 		try {
	// 			setRequestLoading(true);
	// 			const product: Goods = await Api().goods.getSingleProduct(id);
	// 			setNeededProduct({
	// 				productName: product?.title,
	// 				sizeChartImage: product?.sizeChartImage,
	// 				sizeChartImageDescription: product?.sizeChartImageDescription,
	// 			});
	// 			setRequestLoading(false);
	// 		} catch (e) {
	// 			setRequestLoading(false);
	// 			router.push('/404');
	// 		}
	// 	};
	// }, []);
	return (
		<>
			{!neededProduct ? <Spinner /> : null}
			<main className="content">
				<div className="container">
					<div className="page_coordinator">
						<Link href="/">{t('Main')}</Link> |
						<span>{neededProduct?.productName?.[router.locale]}</span> |
						<span> {t('sizeChart')}</span>
					</div>
					<h1 className={s.sizeChart_title}>{t('sizeChart')}</h1>
					<p className={s.sizeChart_descr}>
						{neededProduct?.sizeChartImageDescription?.[router.locale]}
					</p>
					<div className={s.sizeChart_imgWrapper}>
						<Image
							alt="sizeChart image"
							width={1230}
							height={240}
							className={s.sizeChart_img}
							src={neededProduct?.sizeChartImage}
						></Image>
					</div>
				</div>
			</main>
		</>
	);
};

export default SizeChart;
