import { SingleProductRes } from './singleProduct';

export interface AllCategoryData {
	data: AllCategory[];
}

export interface AllCategory {
	id: number;
	ua: string;
	en: string;
	rs: string;
	ru: string;
	type: string;
	createdAt: string;
	updatedAt: string;
	products: SingleProductRes[];
}
