import React from 'react';
import SpinnerLayout from '@/layouts/SpinnerLayout';
import { NextPage } from 'next';
import Link from 'next/link';
import s from './EditProduct.module.scss';
import { EditProduct } from '../../../components/screens/Cabinet/CabinetOwner/Display/EditProduct';

const EdirProduct: NextPage = () => {
	return (
		<SpinnerLayout>
			<main className="content">
				<div className="container">
					<div className="page_coordinator">
						<Link href="/cabinet">.../Личный кабинет | </Link>
						<span>Редактировать товар</span>
					</div>
					<div className={s.local_container}>
						<EditProduct />
					</div>
				</div>
			</main>
		</SpinnerLayout>
	);
};

export default EdirProduct;
