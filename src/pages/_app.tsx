import '@/styles/reset.scss';
import '@/styles/common.scss';
import { appWithTranslation } from 'next-i18next';

import type { AppProps } from 'next/app';
import CookiePolicy from '@/components/modals/CookiePolicy/CookiePolicy';
import { parseCookies } from 'nookies';
import Cookies from 'js-cookie';
import Layout from '@/layouts/DefaultLayout';
import { wrapper } from '../redux/store';
import { Api } from '@/services';
import React, { Suspense, useEffect } from 'react';
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
		// set auth state to redux
		dispatch(setAuthState(!!cookies?.accessToken));

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

		const setUserCartToken = async () => {
			try {
				await Api().user.refreshCartToken();
			} catch (e) {}
		};

		setUserCartToken();

		const fetchUserData = async () => {
			try {
				const data = await Api().user.getMe(router?.locale);
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
		if (cookies?.accessToken) {
			fetchUserData();
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('defaultLocale', JSON.stringify(router?.locale));
	}, [router?.locale]);

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

export default wrapper.withRedux(appWithTranslation(App));
