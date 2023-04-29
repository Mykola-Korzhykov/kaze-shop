import { StaticImageData } from 'next/image';

export interface fetchedCategory {
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

export interface fetchedColour {
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

export interface ImageData {
	imagesPaths: string[];
	sizes: string[];
	colour: fetchedColour;
}

export interface Goods {
	id: number;
	title: {
		ua: string;
		ru: string;
		rs: string;
		en: string;
		[key: string]: string;
	};
	description: {
		ua: string;
		ru: string;
		rs: string;
		en: string;
		[key: string]: string;
	};
	price: string;
	quantity: number;
	images: {
		imagesPaths: string[];
		colour: fetchedColour;
		sizes: string[];
	}[];
	sizeChartImage: string;
	sizeChartImageDescription: {
		ua: string;
		ru: string;
		rs: string;
		en: string;
	};
	sizes: string[];
	hexes: string[];
	isSaved: boolean;
	colours: fetchedColour[];
	categories: fetchedCategory[];
	// reviews: ReturnedReview[] | [];
}

// id: number;
// 	title: Title;
// 	description: Description;
// 	price: string;
// 	quantity: number;
// 	images: Image[];
// 	sizeChartImage: string;
// 	sizeChartImageDescription: SizeChartImageDescription;
// 	sizes: string[];
// 	hexes: string[];
// 	colours: any[];
// 	categories: Category[];
// 	reviews: any[];
export interface GoodsEditTest {
	id: number;
	title: {
		ua: string;
		ru: string;
		rs: string;
		en: string;
	};
	description: {
		ua: string;
		ru: string;
		rs: string;
		en: string;
	};
	price: number;
	quantity: number;
	images: {
		imagesPaths: string[] | File[] | StaticImageData[];
		colour: fetchedColour;
		sizes: string[];
	}[];
	sizeChartImage: string;
	sizeChartImageDescription: string;
	sizes: string[];
	hexes: string[];
	colours: fetchedColour[];
	categories: fetchedCategory[];
	// reviews: ReturnedReview[] | [];
	reviews: any[];
}

export interface CartProductItem {
	id: number;
	size: string;
	price: string;
	imageUrl: string;
	colourId: number;
	title: {
		ua: string;
		ru: string;
		rs: string;
		en: string;
		[key: string]: any;
	};
	description: {
		ua: string;
		ru: string;
		rs: string;
		en: string;
		[key: string]: any;
	};
	colour: {
		id: number;
		ua: string;
		en: string;
		rs: string;
		ru: string;
		hex: string;
		type: string;
		createdAt: any;
		updatedAt: any;
	};
	productId: number;
	quantity: number;
}
export interface CartProduct {
	id: number;
	cartStatus: 'Canceled' | 'Submitted' | 'Completed' | 'Processing' | 'Paid';
	createdAt: Date;
	updatedAt: Date;
	statusDate: string;
	totalPrice: string;
	cartProducts: CartProductItem[];
}
export type OrderItem = {
	id: number;
	totalPrice: string;
	orderStatus: 'Canceled' | 'Submitted' | 'Completed' | 'Processing' | 'Paid';
	imageUrl: string;
};

export interface UserOrders {
	totalOrders: number;
	orders: OrderItem[];
}
export interface UserOrderItems {
	id: number;
	totalPrice: string;
	orderStatus: 'Canceled' | 'Submitted' | 'Completed' | 'Processing' | 'Paid';
	orderProducts: {
		id: number;
		title: {
			ua: string;
			ru: string;
			rs: string;
			en: string;
		};
		description: {
			ua: string;
			ru: string;
			rs: string;
			en: string;
		};
		size: string;
		price: string;
		imageUrl: string;
		colourId: number;
		colour: {
			id: number;
			ua: string;
			en: string;
			rs: string;
			ru: string;
			hex: string;
			type: string;
			createdAt: Date;
			updatedAt: Date;
		};
		productId: number;
		quantity: number;
	}[];
}

export interface sendProductToCart {
	id: number;
	imageUrl: string;
	colourId: number;
	size: string;
	fromCatalog?: boolean;
}

export interface GoodsSend {
	id: number;
	title: {
		ua: string;
		ru: string;
		rs: string;
		en: string;
	};
	description: {
		ua: string;
		ru: string;
		rs: string;
		en: string;
	};
	price: number;
	quantity: number;
	images: {
		fileNames: string[] | StaticImageData[];
		colourId: number;
		sizes: string[];
	}[];
	sizeChartImage: string;
	sizeChartImageDescription?: string;
	sizes: string[];
	colours: fetchedColour[];
	categories: fetchedCategory[];
}

export interface EditProduct {
	title: {
		ua: string;
		ru: string;
		rs: string;
		en: string;
	};
	description: {
		ua: string;
		ru: string;
		rs: string;
		en: string;
	};
	price: number;
	sizes: string[];
	colours: number[];
	quantity: number;
	categories: number[];
	selectedImages?: {
		fileNames: string[];
		colourId: number;
		sizes: string[];
	}[];
	sizeChartImageDescription: {
		ua: string;
		ru: string;
		rs: string;
		en: string;
	};
	sizeChartImage?: File | string;
	deletedImages: number[];
}
