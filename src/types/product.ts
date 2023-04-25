import { Image as StrapiImageData } from './mainPageRequest/reviews';

export interface SingleProductData {
	product: SingleProductRes;
	reviewsStrapi: ReviewsStrapi;
}

export interface ManyProductRes {
	products: SingleProductRes[];
	totalProducts: number;
}

export interface SingleProductRes {
	isSaved: boolean;
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
	reviews: Reviews[];
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

export interface Reviews {
	id: number;
	name: string;
	surname: string;
	review: string;
	rating: number;
	imageUrl: string;
	createdAt: string;
	updatedAt: string;
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
