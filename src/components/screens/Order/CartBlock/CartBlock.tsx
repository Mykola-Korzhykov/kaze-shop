import React, { useEffect, useState } from 'react';
import s from './CartItem.module.scss';
import CartItem from '../CartItem/CartItem';
import { CartBlockProps } from './CartBlock.interface';
import cn from 'classnames';
import { Api } from '@/services';
import { CartType, CartLoadType, ProductPlusType } from '@/types/cartItem';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import FormSpinner from '../FormSpinner/FormSpinner';
import ErrorModal from '@/components/UI/ErrorModal';
import { useAppDispatch } from '@/redux/hooks';
import { setCardId } from '@/redux/slices/order';


const CartBlock = ({ className, ...props }: CartBlockProps): JSX.Element => {
    const [cartLoad, setCartLoad] = useState<CartLoadType>('loading');
    const [cartItem, setCartItem] = useState<null | CartType>();
    const dispatch = useAppDispatch();

    const getCart = async () => {
        try {
            const result: CartType = await Api().goods.getCartProducts();
            setCartItem(result);
            setCartLoad('success');
            dispatch(setCardId(result.cart.id));
        } catch (e) {
            setCartLoad('error');
        }
    }
    const closeError = () => {
        setCartLoad('loading');
        getCart();
    };


    useEffect(() => {
        getCart();
    }, []);


    if (cartItem && !cartItem.cart.cartProducts.length) {
        return (
            <ErrorModal
                title="Ваша корзина пуста"
                buttonText="Перейти в каталог"
                buttonHref="/catalog"
                description="Перейдите в каталог, чтобы купить какой то продукт"
                smallModal={true}
            />
        )
    }

    const productPlus = async (productId: number, product: ProductPlusType) => {
        setCartLoad('loading');
        try {
            await Api().goods.addToCart(productId, product);
            getCart();
        } catch (e) {
            console.log(e);
            setCartLoad('error');
        }
    }

    const productMinus = async (productId: number) => {
        setCartLoad('loading');

        try {
            await Api().goods.deleteProduct(productId);
            getCart();
        } catch (e) {
            console.log(e);
            setCartLoad('error');
        }
    };

    return (
        <>
            <div className={cn(s.cart_block, className)} {...props}>
                <h2>Ваш заказ</h2>

                {cartLoad === 'success' && <>
                    <div>
                        {cartItem.cart.cartProducts.map((item) => <CartItem className={s.item} productPlus={productPlus} productMinus={productMinus} key={item.id} {...item} />)}
                    </div>

                    <div className={s.total}>
                        <span>Вместе</span>
                        <span>{cartItem.cart.totalPrice}</span>
                    </div>
                </>}
                {[cartLoad].includes('loading') && <FormSpinner />}
            </div>
            {[cartLoad].includes('error') && <ErrorMessage closeError={closeError} />}
        </>
    );
};

export default CartBlock;