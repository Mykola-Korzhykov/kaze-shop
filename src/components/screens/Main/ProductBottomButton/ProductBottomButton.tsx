import FavoritesButton from './FavoritesButton/FavoritesButton';
import { ProductBottomButtonProps } from './ProductBottomButton.interface';
import s from './productBottomButton.module.scss';
import ToCartButton from './ToCardButton/ToCartButton';

const ProductBottomButton = ({ addToCart, addToFavorites, deleteToFavorites }: ProductBottomButtonProps): JSX.Element => {

    return (
        <div className={s.button_box}>
            <ToCartButton className={s.cart_btn} onClick={addToCart}>В корзину</ToCartButton>
            <FavoritesButton onClick={addToFavorites} />
        </div>
    )
}

export default ProductBottomButton;