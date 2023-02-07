import { GetServerSideProps, GetServerSidePropsContext } from 'next'
export function NotAuthorized(gssp: GetServerSideProps) {
	return async (context: GetServerSidePropsContext) => {
		const { req } = context
		const token = req.cookies.accessToken

		if (token) {
			return {
				redirect: {
					destination: '/',
					statusCode: 302,
				},
			}
		}

		return await gssp(context)
	}
}
