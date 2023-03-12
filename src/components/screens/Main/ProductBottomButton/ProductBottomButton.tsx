import FavoritesButton from './FavoritesButton/FavoritesButton';
import s from './productBottomButton.module.scss';
import ToCartButton from './ToCardButton/ToCartButton';

const ProductBottomButton = (): JSX.Element => {
    return (
        <div className={s.button_box}>
            <ToCartButton className={s.cart_btn}>В корзину</ToCartButton>
            <FavoritesButton />
        </div>
    )
}

export default ProductBottomButton;