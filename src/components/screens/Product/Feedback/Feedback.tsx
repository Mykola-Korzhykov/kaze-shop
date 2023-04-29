import Link from 'next/link';
import React from 'react';
import Button from '../../Main/Button/Button';
import s from './feedback.module.scss';
import { FeedbackProps } from './Feedback.interface';
import { useTranslation } from 'next-i18next';

const Feedback = ({ id }: FeedbackProps) => {
	const { t } = useTranslation('product');
	return (
		<div className="container">
			<div className={s.feedback}>
				<h2>{t('wantGiveReview')}</h2>
				<p>{t('reviewThanks')}</p>
				<Link href={`/feedback/${id}`}>
					<Button color="black" arrow={false}>
						{t('leaveReview')}
					</Button>
				</Link>
			</div>
		</div>
	);
};

export default Feedback;
