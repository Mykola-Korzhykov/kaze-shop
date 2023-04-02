import {} from '@/types/auth'
import { CartProduct, sendProductToCart } from '@/types/goods'
import { AxiosInstance, AxiosResponse } from 'axios'
import { API_URL } from './index'
export const GoodsApi = (instance: AxiosInstance) => ({
	async getGoods(page: number) {
		const { data } = await instance.get(`/product?page=${page}&pageSize=10`);
		return data;
	},
	async getGategories() {
		const { data } = await instance.get('/categories/get_categoties');
		return data;
	},
	async getColours() {
		const { data } = await instance.get('colours/get_colours');
		return data;
	},
	async getGoodsByCategory(page: number, categoryId: number) {
		const { data } = await instance.get(
			`/product/categories?page=${page}&pageSize=10&categories=${categoryId}`
		);
		return data;
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
		);
		return data;
	},
	async getProductsWithAnotherCategory(page: number, categoryId: number) {
		const { data } = await instance.get(
			`product/compare?page=${page}&pageSize=10&categories=${categoryId}`
		);
		return data;
	},
	async getProduct(productId: number) {
		const { data } = await instance.get(`product/productId=${productId}`);
		return data;
	},
	async addToCart(
		productId: number,
		product: { imageUrl: string; colourId: number; size: string }
	) {
		const { data } = await instance.post(
			`cart/addProduct?productId=${productId}`,
			product
		);
		return data;
	},
	async updateProduct(
		cartProductId: number,
		product: { imageUrl: string; colourId: number; size: string }
	) {
		const { data } = await instance.patch(
			`cart/updateProduct?cartProductId=${cartProductId}`,
			product
		);
		return data;
	},
	async deleteProduct(cartProductId: number) {
		const { data } = await instance.delete(
			`cart/deleteProduct?cartProductId=${cartProductId}`
		);
		return data;
	},
	async getCartProducts() {
		const { data } = await instance.get(`cart/`);
		return data;
	},
	async addToFavorites(productId: number) {
		const { data } = await instance.post(
			`product/addBookmarkProduct?productId=${productId}`
		);
		return data;
	},
	async addToRecentlyViews(productId: number) {
		const { data } = await instance.post(
			`product/addWatchedProduct?productId=${productId}`
		);
		return data;
	},
	async getSingleProduct(productId: number) {
		const { data } = await instance.get(`product/${productId}`);
		return data;
	},
	async deleteSingleProduct(productId: number) {
		const { data } = await instance.delete(`product/${productId}`);
		return data;
	},
});
