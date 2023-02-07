import { GetServerSideProps, GetServerSidePropsContext } from 'next'
export function withAuth(gssp: GetServerSideProps) {
	return async (context: GetServerSidePropsContext) => {
		const { req } = context
		const token = req.cookies.accessToken

		if (!token) {
			return {
				redirect: {
					destination: '/login',
					statusCode: 302,
				},
			}
		}

		return await gssp(context)
	}
}
