import React, { FC, useState } from 'react';
import LoginForm from '@/components/Forms/LoginForm';
import { NotAuthorized } from '@/hoc/OnlyNotAuthorized';
import Link from 'next/link';
import Image from 'next/image';
import AuthImg from '../assets/images/auth_photo.png';
import SpinnerLayout from '@/layouts/SpinnerLayout';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import MetaHead from '@/components/MetaHead';
import { useTranslation } from 'next-i18next';
const Login: NextPage = () => {
	const { t } = useTranslation('login');
	const { t: commonT } = useTranslation('common');
	return (
		<SpinnerLayout>
			<MetaHead
				pageTitle="Login"
				title="Login"
				description="Login - page"
				preview="https://kaze-shop.online/previews/login-preview.png"
			/>
			<main className="content">
				<div className="container">
					<div className="page_coordinator">
						<Link href={'/'}> {commonT('Main')}</Link> |{' '}
						<span>{t('login')}</span>
					</div>
					<div className="auth_block">
						<div className="auth_image">
							<Image
								src={AuthImg}
								alt="link to user basket"
								width={390}
								height={550}
								quality={90}
								priority={true}
							/>
						</div>
						<div className="auth_form">
							<h3 className="auth_title">{t('login')}</h3>
							<LoginForm />
						</div>
					</div>
				</div>
			</main>
		</SpinnerLayout>
	);
};

export const getServerSideProps = NotAuthorized(async (context) => {
	return {
		props: {
			...(await serverSideTranslations(
				context.locale,
				['common', 'login'],
				require('../../i18next.config')
			)),
		},
	};
});

export default Login;
