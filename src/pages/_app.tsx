import '@/styles/reset.scss';
import '@/styles/common.scss';
import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Cookies from 'js-cookie';
import Layout from '@/layouts/DefaultLayout';
import { wrapper } from '../redux/store';
import { Api } from '@/services';
import React, { Suspense } from 'react';
import { addUserInfo } from '@/redux/slices/user';
import Spinner from '@/components/Spinner/Spinner';
import { setCookie } from 'nookies';
import { useAppDispatch } from '@/redux/hooks';
import { DefaultSeo } from 'next-seo';
import SEO from '../../next-seo.config';

function App({ Component, pageProps }: AppProps) {
	const dispatch = useAppDispatch()
	React.useEffect(() => {
		const cartCookie = Cookies.get('_id');
		const setUserCartToken = async () => {
			await Api().user.refreshCartToken();
		};
		if (!cartCookie) {
			setUserCartToken();
		}
		const fetchUserData = async () => {
			try {
				const data = await Api().user.getMe();
				const expireDate = new Date(localStorage.getItem('expireDate'));
				setCookie(null, 'accessToken', data.accessToken, {
					maxAge: Number(new Date(expireDate)) - Number(new Date()),
					path: '/',
				});
				if (data.user) {
					dispatch(addUserInfo(data.user));
				}
				if (data.admin) {
					dispatch(addUserInfo(data.admin));
				}
				if (data.owner) {
					dispatch(addUserInfo(data.owner));
				}
			} catch (e) {
				//router.push('/404')
				// if (e?.response?.status === 400) {
				// 	destroyCookie(undefined, 'accessToken');
				// 	router.push('/');
				// }
			}
		};
	}, []);
	
	return (
		<Suspense fallback={<Spinner />}>
			<DefaultSeo {...SEO} />
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Suspense>
	);
}

// App.getInitialProps = async () => {
// 	const res = await fetch('https://api.github.com/repos/vercel/next.js')
// 	const json = await res.json()
// 	return { props: {} }
// }
// App.getInitialProps = wrapper.getInitialAppProps(
// 	store =>
// 		async ({ ctx, Component }) => {
// 			try {
// 				const { data } = await Api(ctx).user.getMe()
// 				if (data.user) {
// 					store.dispatch(addUserInfo(data.user))
// 				}
// 			} catch (err) {
// 				if (ctx.res && err.response) {
// 					ctx.res.writeHead(302, {
// 						Location: '/login',
// 					})
// 					ctx.res.end()
// 				}
// 			}

// 			return {
// 				pageProps: Component.getInitialProps
// 					? await Component.getInitialProps({ ...ctx, store })
// 					: {},
// 			}
// 		}
// )

export default wrapper.withRedux(App);
