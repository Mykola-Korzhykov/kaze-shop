import {} from '@/types/auth'
import { AxiosInstance, AxiosResponse } from 'axios'
import { API_URL } from './index'
export const GoodsApi = (instance: AxiosInstance) => ({
	async getGoods() {
		const { data } = await instance.get('/goods')
		return data
	},
	async filterGoods() {
		const { data } = await instance.get('/filter')
		return data
	},
})
