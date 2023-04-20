export interface LastAddedProduct {
	products: Product[];
	totalProducts: number;
}

export interface Product {
	id: number;
	title: Title;
	description: Description;
	price: string;
	quantity: number;
	images: Image[];
	hexes: string[];
	sizeChartImage: string;
	sizeChartImageDescription: SizeChartImageDescription;
	sizes: string[];
	colours: any[];
	categories: Category[];
	reviews: any[];
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

export interface Image {
	imagesPaths: string[];
	sizes: string[];
	colour: Colour;
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

export interface SizeChartImageDescription {
	ua: string;
	ru: string;
	rs: string;
	en: string;
}

export interface Category {
	id: number;
	ua: string;
	en: string;
	rs: string;
	ru: string;
	type: string;
	createdAt: string;
	updatedAt: string;
}
