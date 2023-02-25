export interface fetchedCategory {
	id: number
	ua: string
	en: string
	rs: string
	ru: string
	type: 'category'
	createdAt: any
	updatedAt: any
}

export interface fetchedColour {
	id: number
	ua: string
	en: string
	rs: string
	ru: string
	hex: string
	type: 'colour'
	createdAt: any
	updatedAt: any
}
export interface Goods {
	id: number
	title: {
		ua: string
		ru: string
		rs: string
		en: string
	}
	description: {
		ua: string
		ru: string
		rs: string
		en: string
	}
	price: number
	quantity: number
	images: string[]
	sizeChartImage: string
	sizes: string[]
	colours: fetchedColour[]
	categories: fetchedCategory[]
	// reviews: ReturnedReview[] | [];
}
