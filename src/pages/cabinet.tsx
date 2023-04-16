import Cabinet from '@/components/screens/Cabinet/Cabinet';
import SpinnerLayout from '@/layouts/SpinnerLayout';
import { useAppSelector } from '@/redux/hooks';
import { NextPage } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const CabinetPage: NextPage = () => {
	const router = useRouter();
	const isAuth = useAppSelector((state) => state.user.isAuth);
	useEffect(() => {
		if (!isAuth) {
			router.push('/login');
		}
	}, []);
	return (
		<SpinnerLayout>
			<Cabinet />
		</SpinnerLayout>
	);
};

// export const getServerSideProps = withAuth(async (context) => {
//   return { props: {} };
// });

export default CabinetPage;
