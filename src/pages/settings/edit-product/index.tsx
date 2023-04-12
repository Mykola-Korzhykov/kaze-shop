import React from 'react';
import SpinnerLayout from '@/layouts/SpinnerLayout';
import { NextPage } from 'next';
import Link from 'next/link';
import s from './EditProduct.module.scss';
import { EditProduct } from '../../../components/screens/Cabinet/CabinetOwner/Display/EditProduct';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { ModalEditProduct } from '@/components/screens/Cabinet/CabinetOwner/Display/AddProduct/ModalEditProduct';

// state.modalAddEditProduct
const EdirProduct: NextPage = () => {
	//imagesData
	const [images, setImages] = React.useState<File[]>([]);
	const modalTurn = useSelector(
		(state: RootState) => state.modaleSlice.modalAddEditProduct
	);
	const [innerHidth, setInnerHidth] = React.useState<number>(0);
	const refRoot = React.useRef(null);
	React.useEffect(() => {
		if (refRoot.current) {
			setInnerHidth(refRoot.current.clientHeight);
		}
	});

	return (
		<div ref={refRoot}>
			<SpinnerLayout>
				<main className="content">
					{modalTurn && (
						<div
							className={s.backround_for_modal}
							style={{ height: `${innerHidth + 350}px` }}
						></div>
					)}
					{modalTurn && <ModalEditProduct />}
					<div className="container">
						<div className="page_coordinator">
							<Link href="/cabinet">.../Личный кабинет | </Link>
							<span>Редактировать товар</span>
						</div>

						<div className={s.local_container}>
							<EditProduct imagesData={images} setImages={setImages} />
						</div>
					</div>
				</main>
			</SpinnerLayout>
		</div>
	);
};

export default EdirProduct;
