import Main from '@/components/screens/Main/Main';
import SpinnerLayout from '@/layouts/SpinnerLayout';

import '../i18next/18n';

export default function Home() {
	return (
		<SpinnerLayout>
			<Main />
		</SpinnerLayout>
	);
}
