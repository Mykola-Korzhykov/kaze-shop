export interface initialState {
	id: number;
	title: Title;
	description: Description;
	sizeChartImageDescription: SizeChartImageDescription;
	price: string;
	quantity: number;
	images: Image[];
	sizeChartImage: string;
	sizes: string[];
	hexes: string[];
	colours: Colour2[];
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

export interface Colour2 {
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
