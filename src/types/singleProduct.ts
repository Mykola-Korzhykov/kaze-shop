import { Field } from './mainPageRequest/footer';
import { Image as StrapiImageData } from './mainPageRequest/reviews';

export interface SingleProductData {
	product: SingleProductRes;
	reviewsStrapi: ReviewsStrapi;
	footer: {
		field: Field[];
	};
	logo: string;
}

export interface SingleProductRes {
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

interface ReviewsStrapi {
	title: string;
	image: StrapiImage;
}

export interface StrapiImage extends StrapiImageData {}

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
	type: 'category';
	createdAt: any;
	updatedAt: any;
	[key: string]: any;
}

export const LoadStatus = {
	idle: 'idle',
	loading: 'loading',
	error: 'error',
	success: 'success',
} as const;

export interface FormLoadStatusType {
	stepOne: (typeof LoadStatus)[keyof typeof LoadStatus];
	stepTwo: (typeof LoadStatus)[keyof typeof LoadStatus];
	cardId: null | number;
}
