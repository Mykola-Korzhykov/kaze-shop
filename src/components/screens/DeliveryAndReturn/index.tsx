import React from 'react';
import Link from 'next/link';
import s from './DeliveryAndReturn.module.scss';
const DeliveryAndReturn = () => {
	return (
		<main className="content">
			<div className="container">
				<div className="page_coordinator">
					<Link href="/">Главная</Link> | <span>Доставка и возврат</span>
				</div>
				<h1 className={s.delivery_title}>Доставка и возврат</h1>
				<p className={s.delivery_descr}>
					Lorem ipsum dolor sit amet consectetur. Volutpat placerat elit magna
					justo eu aliquam. Porttitor at purus urna aenean. Accumsan velit
					vulputate facilisis scelerisque blandit volutpat vel tempus. Fringilla
					dui sed tortor proin. Commodo molestie rutrum aliquam commodo cursus
					integer feugiat arcu et. Tortor accumsan habitant ac felis donec. Elit
					porttitor tempor malesuada ac mauris ut in nunc nunc. Lobortis morbi
					t=dui sed tortor proin. Commodo molestie rutrum aliquam commodo cursus
					integer feugiat arcu et. Tortor accumsan habitant ac felis donec. Elit
					porttitor tempor malesuada ac mauris ut in nunc nunc. Lobortis morbi
					t=integer feugiat arcu et. Tortor accumsan habitant ac felis donec.
					Elit porttitor tempor malesuada ac mauris ut in nunc nunc. Lobortis
					morbi t=
				</p>
				<p className={s.delivery_descr}>
					Lorem ipsum dolor sit amet consectetur. Volutpat placerat elit magna
					justo eu aliquam. Porttitor at purus urna aenean. Accumsan velit
					vulputate facilisis scelerisque blandit volutpat vel tempus. Fringilla
					dui sed tortor proin. Commodo molestie rutrum aliquam commodo cursus
					integer feugiat arcu et. Tortor accumsan habitant ac felis donec. Elit
					porttitor tempor malesuada ac mauris ut in nunc nunc. Lobortis morbi
					t=
				</p>
				<p className={s.delivery_descr}>
					Lorem ipsum dolor sit amet consectetur. Volutpat placerat elit magna
					justo eu aliquam. Porttitor at purus urna aenean. Accumsan velit
					vulputate facilisis scelerisque blandit volutpat vel tempus. Fringilla
					dui sed tortor proin. Commodo molestie rutrum aliquam commodo cursus
					integer feugiat arcu et. Tortor accumsan habitant ac felis donec. Elit
					porttitor tempor malesuada ac mauris ut in nunc nunc. Lobortis morbi
					t=
				</p>
				<p className={s.delivery_descr}>
					Lorem ipsum dolor sit amet consectetur. Volutpat placerat elit magna
					justo eu aliquam. Porttitor at purus urna aenean. Accumsan velit
				</p>
			</div>
		</main>
	);
};

export default DeliveryAndReturn;
