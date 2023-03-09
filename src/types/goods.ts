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
	id: number | null
	ua: string | null
	en: string | null
	rs: string | null
	ru: string | null
	hex: string | null
	type: 'colour' | null
	createdAt: any | null
	updatedAt: any | null
	label: string | null
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
	images: { fileNames: string[], colourId: number; sizes: string[]}[]
	sizeChartImage: string
	sizes: string[]
	colours: fetchedColour[]
	categories: fetchedCategory[]
	// reviews: ReturnedReview[] | [];
}



