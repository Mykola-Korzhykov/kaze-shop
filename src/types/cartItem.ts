import { OrderFormStepTwoData } from '@/utils/validation';
import { sendProductToCart } from './goods';
import { LoadStatus } from './product';

export interface CartType {
	cart: CartData;
}

export interface CartData {
	id: number;
	cartStatus: string;
	totalPrice: string;
	cartProducts: CartProduct[];
}

export interface CartProduct {
	id: number;
	title: Title;
	description: Description;
	size: string;
	price: string;
	imageUrl: string;
	colourId: number;
	colour: Colour;
	productId: number;
	quantity: number;
}

export interface Title {
	ua: string;
	ru: string;
	rs: string;
	en: string;
}

export interface Description {
	ua: string;
	ru: string;
	rs: string;
	en: string;
}

export interface Colour {
	id: number;
	ua: string;
	en: string;
	rs: string;
	ru: string;
	hex: string;
	type: string;
	createdAt: string;
	updatedAt: string;
}

export interface ProductPlusType extends Omit<sendProductToCart, 'id'> {}

export interface FormStepTwoData
	extends Omit<OrderFormStepTwoData, 'anotherDate'> {
	payByCard: boolean;
	postalDelivery: boolean;
}

export type CartLoadType = typeof LoadStatus[keyof typeof LoadStatus];
