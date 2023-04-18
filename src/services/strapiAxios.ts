import axios from 'axios';

export const StrapiAxios = axios.create();
StrapiAxios.interceptors.request.use((config) => {
	config = {
		...config,
		baseURL: process.env.NEXT_STRAPI_URL,
		transformRequest: [
			(data, headers) => {
				return (headers.Authorization = `Bearer ${process.env.NEXT_STRAPI_TOKEN}`);
			},
		],
	};
	return config;
});
