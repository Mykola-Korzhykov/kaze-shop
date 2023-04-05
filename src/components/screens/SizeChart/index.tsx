import React from 'react';
import Spinner from '@/components/Spinner/Spinner';
import { Goods } from '@/types/goods';
import { Api } from '@/services';
import s from './sizeChart.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import sizeChartImage from '../../../assets/images/sizeChartImage.png';
const SizeChart = () => {
	const router = useRouter();
	const id = router.query.id + '';
	const [requestLoading, setRequestLoading] = React.useState<boolean>(false);
	const [neededProduct, setNeededProduct] = React.useState<{
		productName: {
			ua: string;
			ru: string;
			rs: string;
			en: string;
		};
		sizeChartImageDescription: {
			ua: string;
			ru: string;
			rs: string;
			en: string;
		};
		sizeChartImage: string;
	} | null>(null);
	React.useEffect(() => {
		const fetchProductData = async () => {
			try {
				setRequestLoading(true);
				const product: Goods = await Api().goods.getSingleProduct(id);
				setNeededProduct({
					productName: product?.title,
					sizeChartImage: product?.sizeChartImage,
					sizeChartImageDescription: product?.sizeChartImageDescription,
				});
				setRequestLoading(false);
			} catch (e) {
				setRequestLoading(false);
				router.push('/catalog');
			}
		};
		fetchProductData();
	}, []);
	return (
		<>
			{requestLoading && <Spinner />}
			<main className="content">
				<div className="container">
					<div className="page_coordinator">
						<Link href="/">Главная</Link> |
						<span>{neededProduct?.productName?.ua}</span> |
						<span> Размерная сетка</span>
					</div>
					<h1 className={s.sizeChart_title}>Размерная сетка</h1>
					<p className={s.sizeChart_descr}>
						{neededProduct?.sizeChartImageDescription.ua}
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
