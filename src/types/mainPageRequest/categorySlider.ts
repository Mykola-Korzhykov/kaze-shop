export interface CategorySlider {
	products: Product[];
	totalProducts: number;
}

export interface Product {
	id: number;
	title: Title;
	description: Description;
	sizeChartImageDescription: SizeChartImageDescription;
	price: string;
	quantity: number;
	images: Image[];
	hexes: string[];
	sizeChartImage: string;
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

export interface SizeChartImageDescription {
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
	id: number | null;
	ua: string | null;
	en: string | null;
	rs: string | null;
	ru: string | null;
	hex: string | null;
	type: 'colour' | null;
	createdAt: any | null;
	updatedAt: any | null;
	[key: string]: any;
}

export interface Category {
	id: number;
	ua: string;
	en: string;
	rs: string;
	ru: string;
	type: 'category';
	createdAt: any;
	updatedAt: any;
	[key: string]: any;
}
