import {
	CreateUserDto,
	LoginDto,
	AuthResponse,
	ChangeUserInfoDto,
	ChangeUserPasswordDto,
	ForgotPasswordDto,
	GetCodeDto,
} from '@/types/auth'
import { AxiosInstance, AxiosResponse } from 'axios'
import axios from 'axios'
import { API_URL } from './index'
export const UserApi = (instance: AxiosInstance) => ({
	async login(dto: LoginDto) {
		const { data } = await instance.post<LoginDto, { data: AuthResponse }>(
			API_URL + '/auth/login',
			dto
		)
		return data
	},
	async registration(dto: CreateUserDto) {
		const { data } = await instance.post<CreateUserDto, { data: AuthResponse }>(
			API_URL + '/auth/signup',
			dto
		)
		return data
	},
	async changeInfo(dto: ChangeUserInfoDto) {
		const { data } = await instance.patch<
			ChangeUserInfoDto,
			{ data: AuthResponse }
		>('/user/update', dto)
		return data
	},
	async changePassword(dto: ChangeUserPasswordDto) {
		const { data } = await instance.patch<
			ChangeUserPasswordDto,
			{ data: AuthResponse }
		>('/auth/change', dto)
		return data
	},
	async logout() {
		const { data } = await instance.post<
			ChangeUserPasswordDto,
			{ data: AuthResponse }
		>('/auth/logout')
		return data
	},
	async forgotPassword(dto: ForgotPasswordDto) {
		const { data } = await instance.patch<
			ForgotPasswordDto,
			{ data: AuthResponse }
		>('/auth/reset', dto)
		return data
	},
	async getForgotPasswordCode(dto: GetCodeDto) {
		const { data } = await instance.post<GetCodeDto, { data: AuthResponse }>(
			'/auth/code?locale=ua',
			dto
		)
		return data
	},
	async getMe() {
		const { data } = await instance.patch<GetCodeDto, { data: AuthResponse }>(
			'/auth/refresh'
		)
		return data
	},
	// async getMe() {
	// 	const { data } = await axios.patch<GetCodeDto, { data: AuthResponse }>(
	// 		'https://jsonplaceholder.typicode.com/users/1'
	// 	)
	// 	return data
	// },
})
