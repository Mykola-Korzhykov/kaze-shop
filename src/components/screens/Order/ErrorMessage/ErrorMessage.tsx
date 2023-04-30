import React from 'react';
import s from './ErrorMessage.module.scss';
import { ErrorMessageProps } from './ErrorMessage.interface';
import { useTranslation } from 'next-i18next';
const ErrorMessage = ({ closeError }: ErrorMessageProps) => {
	const { t } = useTranslation('order');
	const { t: commonT } = useTranslation('common');
	return (
		<div className={s.layout}>
			<div className={s.error}>
				<h1>😕</h1>
				<h2>{commonT('error')}</h2>
				<p>{t('tryAgainLater')}</p>
				<svg
					onClick={closeError}
					className={s.icon_close}
					width="32"
					height="32"
					viewBox="0 0 32 32"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M25 7L7 25"
						stroke="#0B0B0B"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						d="M25 25L7 7"
						stroke="#0B0B0B"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</div>
		</div>
	);
};

export default ErrorMessage;
