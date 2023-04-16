import '@/styles/reset.scss';
import '@/styles/common.scss';
import type { AppProps } from 'next/app';
import CookiePolicy from '@/components/modals/CookiePolicy/CookiePolicy';
import { parseCookies } from 'nookies';
import Cookies from 'js-cookie';
import Layout from '@/layouts/DefaultLayout';
import { wrapper } from '../redux/store';
import { Api } from '@/services';
import React, { Suspense } from 'react';
import { addUserInfo, setAuthState } from '@/redux/slices/user';
import Spinner from '@/components/Spinner/Spinner';
import { setCookie } from 'nookies';
import { useAppDispatch } from '@/redux/hooks';
import { DefaultSeo } from 'next-seo';
import SEO from '../../next-seo.config';
import { useRouter } from 'next/router';

function App({ Component, pageProps }: AppProps) {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [chowUseCookieModal, setChowUseCookieModal] =
		React.useState<boolean>(true);
	React.useEffect(() => {
		const cookies = parseCookies();
		 dispatch(setAuthState(!!cookies.accessToken));
		//get cookie initial state from LS
		let initialValue = false;
		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem('allowCookie');
			if (saved) {
				initialValue = JSON.parse(saved);
			}
		}
		setChowUseCookieModal(initialValue);
		//cart id logic
		
		const cartCookie = cookies['_id'];
		const setUserCartToken = async () => {
			await Api().user.refreshCartToken();
		};
		console.log('cart token', cartCookie);
		console.log('all cookies', cookies);
		if (!cartCookie) {
			setUserCartToken();
		}

		const fetchUserData = async () => {
			try {
				const data = await Api().user.getMe();

				setCookie(null, 'accessToken', data?.accessToken, {
					maxAge: data?.maxAge,
					path: '/',
				});
				if (data?.user) {
					dispatch(addUserInfo(data?.user));
				}
				if (data?.admin) {
					dispatch(addUserInfo(data?.admin));
				}
				if (data?.owner) {
					dispatch(addUserInfo(data?.owner));
				}
			} catch (e) {
				//router.push('/404')
				// if (e?.response?.status === 400) {
				// 	Cookies.remove('accessToken');
				// 	router.push('/login');
				// }
			}
		};
		fetchUserData();
	}, []);

	return (
		<Suspense fallback={<Spinner />}>
			<DefaultSeo {...SEO} />
			<Layout>
				<Component {...pageProps} />
				{!chowUseCookieModal && (
					<CookiePolicy setCookiePolicyState={setChowUseCookieModal} />
				)}
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
