import { CartProduct, ProductPlusType } from '@/types/cartItem';

export interface CartItemProps extends CartProduct {
	className?: string;
	productPlus: (productId: number, product: ProductPlusType) => void;
	productMinus: (productId: number) => void;
}
