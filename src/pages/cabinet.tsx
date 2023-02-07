import Cabinet from '@/components/screens/Cabinet/Cabinet'
import SpinnerLayout from '@/layouts/SpinnerLayout'
import { wrapper } from '@/redux/store'
import { addUserInfo } from '@/redux/slices/user'
import { withAuth } from '@/hoc/RequiredAuth'
import { NextPage } from 'next'
import { Api } from '@/services'
import axios from 'axios'
const CabinetPage: NextPage = () => {
	return (
		<SpinnerLayout>
			<Cabinet />
		</SpinnerLayout>
	)
}


export const getServerSideProps = withAuth(async context => {
	return { props: {} }
})

// export const getServerSideProps = wrapper.getServerSideProps(
// 	store => async context => {
// 		if (!context.req.cookies.accessToken) {
// 			return {
// 				redirect: {
// 					permanent: false,
// 					destination: '/login',
// 				},
// 				props: {},
// 			}
// 		}

// 		try {
// 			const data = await Api(context).user.getMe()

// 			if (data.user) {
// 				store.dispatch(addUserInfo(data.user))
// 			}
// 		} catch (e) {
// 			return {
// 				redirect: {
// 					permanent: false,
// 					destination: '/login',
// 				},
// 				props: {},
// 			}
// 		}

// 		return { props: {} }
// 	}
// )

export default CabinetPage

