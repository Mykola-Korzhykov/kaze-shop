export interface ReviewsResT {
	data: Daum[];
	meta: Meta;
}

export interface Daum {
	id: number;
	attributes: Attributes;
}

export interface Attributes {
	title: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	locale: string;
	image: Image;
	localizations: Localizations;
}

export interface Image {
	data: Data;
}

export interface Data {
	id: number;
	attributes: Attributes2;
}

export interface Attributes2 {
	name: string;
	alternativeText: any;
	caption: any;
	width: number;
	height: number;
	formats: Formats;
	hash: string;
	ext: string;
	mime: string;
	size: number;
	url: string;
	previewUrl: any;
	provider: string;
	provider_metadata: any;
	createdAt: string;
	updatedAt: string;
}

export interface Formats {
	small: Small;
	thumbnail: Thumbnail;
}

export interface Small {
	ext: string;
	url: string;
	hash: string;
	mime: string;
	name: string;
	path: any;
	size: number;
	width: number;
	height: number;
}

export interface Thumbnail {
	ext: string;
	url: string;
	hash: string;
	mime: string;
	name: string;
	path: any;
	size: number;
	width: number;
	height: number;
}

export interface Localizations {
	data: Daum2[];
}

export interface Daum2 {
	id: number;
	attributes: Attributes3;
}

export interface Attributes3 {
	title: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	locale: string;
}

export interface Meta {
	pagination: Pagination;
}

export interface Pagination {
	page: number;
	pageSize: number;
	pageCount: number;
	total: number;
}
