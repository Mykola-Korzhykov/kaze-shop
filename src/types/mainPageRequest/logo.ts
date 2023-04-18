export interface LogoResT {
	data: Daum[];
	meta: Meta;
}

export interface Daum {
	id: number;
	attributes: Attributes;
}

export interface Attributes {
	logo: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	locale: string;
	localizations: Localizations;
}

export interface Localizations {
	data: Daum2[];
}

export interface Daum2 {
	id: number;
	attributes: Attributes2;
}

export interface Attributes2 {
	logo: string;
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
