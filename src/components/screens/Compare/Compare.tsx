import React from 'react';
import Spinner from '@/components/Spinner/Spinner';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { fetchCompareOfferProducts } from '@/redux/slices/goods';
import CompareOfferItems from './CompareOfferItems';
import CompareMainItem from './CompareMainItem';
import s from './Compare.module.scss';
import CompareModal from './CompareModal';
import { useRouter } from 'next/router';

const Compare = () => {
	
	const router = useRouter();
	const dispatch = useAppDispatch();
	const compareProduct = useAppSelector((state) => state.goods.compareProduct);
	const loadingStatus = useAppSelector((state) => state.goods.loadingStatus);
	const [showModal, setShowModal] = React.useState<boolean>(false);

	React.useEffect(() => {
		if (!compareProduct) {
			router.push('/catalog');
		} else {
			dispatch(fetchCompareOfferProducts(compareProduct.categories[0].id));
		}
	}, []);
	return (
		<>
			{loadingStatus === 'loading' && <Spinner />}
			{showModal && <CompareModal setShowModal={setShowModal} />}
			<main className="content">
				<div className="container">
					<div className={s.body}>
						<CompareMainItem />
						<CompareOfferItems setShowModal={setShowModal} />
					</div>
				</div>
			</main>
		</>
	);
};

export default Compare;
