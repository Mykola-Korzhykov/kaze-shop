import {} from '@/types/auth'
import { AxiosInstance, AxiosResponse } from 'axios'
import { API_URL } from './index'
export const GoodsApi = (instance: AxiosInstance) => ({
	async getGoods(page: number) {
		const { data } = await instance.get(`/product?page=${page}&pageSize=10`)
		return data
	},
	async getGategories() {
		const { data } = await instance.get('/categories/get_categoties')
		return data
	},
	async getColours() {
		const { data } = await instance.get('colours/get_colours')
		return data
	},
	async getGoodsByCategory(page: number, categoryId: number) {
		const { data } = await instance.get(
			`/product?page=${page}&pageSize=10&categoryId=${categoryId}`
		)
		return data
	},
	async filterGoods(
		page: number,
		sizes: string,
		categories: string,
		colours: string,
		sortBy: string
	) {
		const { data } = await instance.get(
			`/product/filter?page=${page}&pageSize=10${
				categories && `&categories=${categories}`
			}${colours && `&colours=${colours}`}${sizes && `&sizes=${sizes}`}${
				sortBy && `&order=${sortBy}`
			}`
		)
		return data
	},
	async getProductsWithAnotherCategory(categoryId: number) {
		const { data } = await instance.post(`product?categoryId${categoryId}`)
		return data
	},
	async addToBasket(productId: number) {
		const { data } = await instance.post(
			`product/addBasket?productId${productId}`
		)
		return data
	},
	async addToFavorites(productId: number) {
		const { data } = await instance.post(
			`product/addFavourite?productId${productId}`
		)
		return data
	},
})
