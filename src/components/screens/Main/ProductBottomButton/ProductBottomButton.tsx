import FavoritesButton from './FavoritesButton/FavoritesButton';
import { ProductBottomButtonProps } from './ProductBottomButton.interface';
import s from './productBottomButton.module.scss';
import ToCartButton from './ToCardButton/ToCartButton';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
const ProductBottomButton = ({
	addToCart,
	addToFavorites,
	deleteToFavorites,
	isSaved,
}: ProductBottomButtonProps): JSX.Element => {
	const { t } = useTranslation('product');
	const toggleFavorite = () => {
		if (isSaved) {
			deleteToFavorites();
			return;
		}
		addToFavorites();
	};

	return (
		<div className={s.button_box}>
			<ToCartButton className={s.cart_btn} onClick={addToCart}>
				{t('addToCart')}
			</ToCartButton>
			<FavoritesButton
				className={cn({
					[s.added]: isSaved,
				})}
				onClick={toggleFavorite}
			/>
		</div>
	);
};

export default ProductBottomButton;
