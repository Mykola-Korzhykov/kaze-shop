import React, { FC } from 'react';
import s from '../../../components/screens/Cart/CartItems/CartItems.module.scss';
import Image from 'next/image';
import cartImage from '../../../assets/images/cartItem.png';
import { CartProductItem } from '@/types/goods';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
const CabinetOrdersModalItem: FC<{ product: CartProductItem }> = ({
	product,
}) => {
	const { locale } = useRouter();
	const { t } = useTranslation('cabinet');
	return (
		<div className={s.block}>
			<div className={s.imgWrapper}>
				<Image
					src={product?.imageUrl ?? cartImage}
					width={94}
					height={153}
					alt="Cart image"
					className={s.img}
					priority={true}
					quality={95}
				/>
			</div>
			<div className={s.content}>
				<div className={s.text}>
					<p className={s.title}>{product?.title?.[locale]}</p>
					<p className={s.descr}>{product?.description?.[locale]}</p>
					<div className={s.size}>
						<div className={s.checkbox}>
							<p style={{ backgroundColor: product?.colour?.hex }}></p>
						</div>
						<p className={s.format}>
							{t('size')} - <span>{product?.size}</span>
						</p>
					</div>
				</div>
				<div className={s.addition}>
					<p className={s.price}>{product?.price}</p>
				</div>
			</div>
		</div>
	);
};

export default CabinetOrdersModalItem;
