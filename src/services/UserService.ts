import {
	CreateUserDto,
	LoginDto,
	AuthResponse,
	ChangeUserInfoDto,
	ChangeUserPasswordDto,
	ForgotPasswordDto,
	GetCodeDto,
} from '@/types/auth';
import { AxiosInstance, AxiosResponse } from 'axios';
import axios from 'axios';
import { API_URL } from './index';
export const UserApi = (instance: AxiosInstance) => ({
	async login(dto: LoginDto, locale: string) {
		const { data } = await instance.post<LoginDto, { data: AuthResponse }>(
			API_URL + `/auth/login?locale=${locale}`,
			dto
		);
		return data;
	},
	async registration(dto: CreateUserDto, locale: string) {
		const { data } = await instance.post<CreateUserDto, { data: AuthResponse }>(
			API_URL + `/auth/signup?locale=${locale}`,
			dto
		);
		return data;
	},
	async changeInfo(dto: ChangeUserInfoDto) {
		const { data } = await instance.patch<
			ChangeUserInfoDto,
			{ data: AuthResponse }
		>('/user/update', dto);
		return data;
	},
	async changePassword(dto: ChangeUserPasswordDto) {
		const { data } = await instance.patch<
			ChangeUserPasswordDto,
			{ data: AuthResponse }
		>('/auth/change', dto);
		return data;
	},
	async logout() {
		const { data } = await instance.post<
			ChangeUserPasswordDto,
			{ data: AuthResponse }
		>('/auth/logout');
		return data;
	},
	async forgotPassword(dto: ForgotPasswordDto) {
		const { data } = await instance.patch<
			ForgotPasswordDto,
			{ data: AuthResponse }
		>('/auth/reset', dto);
		return data;
	},
	async getForgotPasswordCode(dto: GetCodeDto, locale: string) {
		const { data } = await instance.post<GetCodeDto, { data: AuthResponse }>(
			`/auth/code?locale=${locale}`,
			dto
		);
		return data;
	},
	async getMe(locale: string) {
		const { data } = await instance.patch<GetCodeDto, { data: AuthResponse }>(
			`/auth/refresh?locale=${locale}`
		);
		return data;
	},
	async refreshCartToken() {
		await instance.get('/cart/set-cart');
	},
	async getSavedProducts(page: number) {
		const { data } = await instance.get(
			`user/bookmarkProducts?page=${page}&pageSize=10`
		);
		return data;
	},
	async deleteUserSavedProduct(productId: number) {
		const { data } = await instance.delete(
			`user/deleteBookmarkProduct?productId=${productId}`
		);
		return data;
	},
	async getWatchedProducts(page: number) {
		const { data } = await instance.get(
			`user/watchedProducts?page=${page}&pageSize=10`
		);
		return data;
	},
	async getOrders(page: number) {
		const { data } = await instance.get(`orders/get?page=${page}&pageSize=10`);
		return data;
	},
	async getOrderBasket(orderId: number) {
		const { data } = await instance.get(`orders/${orderId}`);
		return data;
	},
	async getLeftCarts(page: number) {
		const { data } = await instance.get(
			`cart/leftCarts?page=${page}&pageSize=10`
		);
		return data;
	},
});
