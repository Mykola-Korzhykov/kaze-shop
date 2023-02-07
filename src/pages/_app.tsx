import '@/styles/reset.scss'
import '@/styles/common.scss'
import type { AppProps } from 'next/app'
import Layout from '@/layouts/DefaultLayout'
import { wrapper } from '../redux/store'
import { Api } from '@/services'
import { Suspense } from 'react'
import { addUserInfo } from '@/redux/slices/user'
import Spinner from '@/components/Spinner/Spinner'
function App({ Component, pageProps }: AppProps) {
	return (
		<Suspense fallback={<Spinner />}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Suspense>
	)
}

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
