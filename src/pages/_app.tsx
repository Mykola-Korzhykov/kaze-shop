import '@/styles/reset.scss'
import '@/styles/common.scss'
import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import Layout from '@/layouts/DefaultLayout'
import { wrapper } from '../redux/store'
import { Api } from '@/services'
import React, { Suspense } from 'react'
import { addUserInfo } from '@/redux/slices/user'
import Spinner from '@/components/Spinner/Spinner'

import { DefaultSeo } from 'next-seo'
import SEO from '../../next-seo.config'

function App({ Component, pageProps }: AppProps) {
	React.useEffect(() => {
		const setUserCartToken = async () => {
			await Api().user.refreshCartToken()
		}
		setUserCartToken()
	}, [])
	return (
		<Suspense fallback={<Spinner />}>
			<DefaultSeo {...SEO} />
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Suspense>
	)
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

export default wrapper.withRedux(App)
