import Cookies, { parseCookies } from 'nookies'
import axios from 'axios'
import { GetServerSidePropsContext, NextPageContext } from 'next'
import { UserApi } from './UserService'
import { GoodsApi } from './CatalogService'
import { AuthResponse } from '@/types/auth'
import { setCookie } from 'nookies'
export type ApiReturnType = {
	user: ReturnType<typeof UserApi>
	goods: ReturnType<typeof GoodsApi>
}
export const API_URL = 'https://api.kaze-shop.online/'

export const Api = (
	ctx?: NextPageContext | GetServerSidePropsContext
): ApiReturnType => {
	const cookies = ctx ? Cookies.get(ctx) : parseCookies()
	const token = cookies.accessToken

	const instance = axios.create({
		baseURL: API_URL,
		withCredentials: true,
		headers: {
			Authorization: 'Bearer ' + (token || ''),
		},
	})
	instance.interceptors.response.use(
		config => {
			return config
		},
		async error => {
			const originalRequest = error.config
			if (
				error.response.status == 401 &&
				error.config &&
				!error.config._isRetry
			) {
				originalRequest._isRetry = true
				try {
					const response = await axios.patch<AuthResponse>(
						`${API_URL}/auth/refresh`,
						{
							withCredentials: true,
						}
					)
					setCookie(null, 'accessToken', response.data.accessToken, {
						maxAge: 30 * 24 * 60 * 60,
						path: '/',
					})
					// localStorage.setItem('token', response.data.accessToken)
					return instance.request(originalRequest)
				} catch (e) {
					console.log('NOT AUTH')
				}
			}
			throw error
		}
	)

	const apis = {
		user: UserApi,
		goods: GoodsApi,
	}

	const result = Object.entries(apis).reduce((prev, [key, f]) => {
		return {
			...prev,
			[key]: f(instance),
		}
	}, {} as ApiReturnType)

	return result
}
