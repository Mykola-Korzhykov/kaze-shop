export interface MainPageResT {
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
	Vertical_text: VerticalText;
	button: Button;
	localizations: Localizations;
}

export interface VerticalText {
	id: number;
	field_1: MainField;
	field_2: MainField;
}

export interface MainField {
	id: number;
	text: string;
	link: string;
}

export interface Button {
	id: number;
	text: string;
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
