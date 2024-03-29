import React, { FC, useState } from 'react';
import cl from './LogoutModal.module.scss';
import { Api } from '@/services';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
const LogoutModal: FC<{ closeModal: (tab: number) => void }> = ({
	closeModal,
}) => {
	const { t } = useTranslation('cabinet');
	const { t: commonT } = useTranslation('common');
	const { t: signupT } = useTranslation('signup');
	const [requestLoading, setRequestLoading] = useState<boolean>(false);
	const [width, setWidth] = useState<null | number>(null);
	const router = useRouter();
	const closeModalFunc = () => {
		closeModal(1);
	};
	const logout = async () => {
		try {
			setRequestLoading(true);
			await Api().user.logout();
			Cookies.remove('accessToken');
			router.push('/login');
		} catch (e) {
			Cookies.remove('accessToken');
			router.push('/login');
		}
	};

	React.useEffect(() => {
		setWidth(window.innerWidth);
	}, []);

	return (
		<div className={cl.modal}>
			<div className={cl.modal_body}>
				<h1 className={cl.modal_title}>{t('logout_confirmation')}</h1>
				<p className={cl.modal_descr}>{t('logout_button')}</p>
				<div className={cl.modal_btns}>
					{width > 900 ? (
						<button
							disabled={requestLoading}
							onClick={closeModalFunc}
							className={cl.modal_cancel}
						>
							{commonT('cancel')}
						</button>
					) : (
						<Link href={'/cabinet'}>
							<button
								disabled={requestLoading}
								onClick={closeModalFunc}
								className={cl.modal_cancel}
							>
								{commonT('cancel')}
							</button>
						</Link>
					)}

					<button
						disabled={requestLoading}
						onClick={logout}
						className={cl.modal_confirm}
					>
						{requestLoading ? signupT('loading') : t('logout')}
					</button>
				</div>
			</div>
		</div>
	);
};

export default LogoutModal;
