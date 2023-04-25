import { SingleProductRes } from '../product';

export interface LastAddedProduct {
	products: SingleProductRes[];
	totalProducts: number;
}
