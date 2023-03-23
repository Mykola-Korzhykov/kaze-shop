import { StaticImageData } from 'next/image'

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
}

export interface ImageData {
	imagesPaths: string[] ;
	sizes: string[];
	colour: fetchedColour
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
	images: {
		imagesPaths: string[]
		colour: fetchedColour
		sizes: string[]
	}[]
	sizeChartImage: string
	sizeChartImageDescription: string
	sizes: string[]
	hexes: string[]
	colours: fetchedColour[]
	categories: fetchedCategory[]
	// reviews: ReturnedReview[] | [];
}

export interface CartProduct {
	id: number
	image: string
	hex: string
	size: string
	price: string
	quantity: number
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
}

export interface sendProductToCart {
	id: number
	imageUrl: string
	colourId: number
	size: string
}

export interface GoodsSend {
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
	images: {
		fileNames: string[] | StaticImageData[] | File[]
		colourId: number
		sizes: string[]
	}[]
	sizeChartImage: string
	sizeChartImageDescription?: string
	sizes: string[]
	colours: fetchedColour[]
	categories: fetchedCategory[]
}
