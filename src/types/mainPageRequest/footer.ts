export interface footersResT {
	data: Daum[];
	meta: Meta;
}

export interface Daum {
	id: number;
	attributes: Attributes;
}

export interface Attributes {
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	locale: string;
	field_1: Field;
	field_2: Field;
	field_3: Field;
	localizations: Localizations;
}

export interface Field {
	id: number;
	label: string;
	link: string;
}

export interface Localizations {
	data: Daum2[];
}

export interface Daum2 {
	id: number;
	attributes: Attributes2;
}

export interface Attributes2 {
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
