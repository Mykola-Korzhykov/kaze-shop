import axios from 'axios';
import { STRAPI_API_URL } from '.';

export const StrapiAxios = axios.create();
StrapiAxios.interceptors.request.use((config) => {
	config = {
		...config,
		baseURL: STRAPI_API_URL,
		transformRequest: [
			(data, headers) => {
				return (headers.Authorization = `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`);
			},
		],
	};
	return config;
});
