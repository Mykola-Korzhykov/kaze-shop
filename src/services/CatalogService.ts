import {} from '@/types/auth';
import { CartProduct, EditProduct, sendProductToCart } from '@/types/goods';
import { AxiosInstance, AxiosResponse } from 'axios';
import { API_URL } from './index';
import { OrderFormStepOneData } from '@/utils/validation';
import { FormStepTwoData } from '@/types/cartItem';


export const GoodsApi = (instance: AxiosInstance) => ({
	async getGoods(page: number, categoryId?: number) {
		let url;
		if (categoryId) {
			url = `/product/categories?page=${page}&pageSize=10&categories=${categoryId}`;
		} else {
			url = `/product?page=${page}&pageSize=10`;
		}
		const { data } = await instance.get(url);
		return data;
	},
	async getGoodsByCategory<T>(page: number, categoryId: number) {
		const { data } = await instance.get<T>(
			`/product/categories?page=${page}&pageSize=10&categories=${categoryId}`
		);
		return data;
	},
	async getEditGoods(page: number) {
		const { data } = await instance.get(
			`admin/update_products?page=${page}&pageSize=1`
		);
		return data;
	},
	async getGategories() {
		const { data } = await instance.get('/categories/get_categories');
		return data;
	},
	async getColours() {
		const { data } = await instance.get('colours/get_colours');
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
	async updateEditProduct(productId: number, product: EditProduct) {
		const { data } = await instance.patch(
			`product/update_product?productId=${productId}`,
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
	async getSingleProduct(productId: number | string) {
		const { data } = await instance.get(`product/${productId}`);
		return data;
	},

	async getSingleEditProduct(productId: number | string) {
		const { data } = await instance.get(`product/edit/${productId}`);

		return data;
	},
	async deleteSingleProduct(productId: number) {
		const res = await instance.delete(
			`product/delete_product?productId=${productId}`
		);
		return res;
	},
	async sendFeedback(
		feedback: {
			name: string;
			surname: string;
			review: string;
			rating: number;
		},
		productId: number
	) {
		const { data } = await instance.put(
			`reviews/create_review?productId=${productId}`,
			feedback
		);
		return data;
	},
	async sendFormStepOne(cartId: number, formData: OrderFormStepOneData) {
		const { data } = await instance.post('orders/create_order', formData, {
			params: { cartId },
		});
		return data;
	},
	async sendFormStepTwo(formData: FormStepTwoData, locale: string) {
		const { data } = await instance.put(
			`orders/continue_order?locale=${locale}`,
			formData
		);
		return data;
	},

	async checkOrderSuccess<T>(orderNum: string, orderToken: string) {
		const { data } = await instance.get<T>(
			`orders/status?orderId=${orderNum}&orderToken=${orderToken}`
		);
		return data;
	},
	async getManyProduct<T>(productId: Array<number>) {
		const id = productId.join(',');
		const { data } = await instance.get<T>(
			'product/get?page=1&pageSize=1&productIds=' + id
		);
		return data;
	},

	async deleteReviews(id: number) {
		const { data } = await instance.delete(
			'reviews/delete_review?reviewId=' + id
		);
		return data;
	},
});
