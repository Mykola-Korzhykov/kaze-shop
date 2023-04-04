import React, { FC } from 'react';
import s from './Feedback.module.scss';
const FeedbackOption: FC<{
	optionText: string;
	optionId: number;
	selectedOption: number;
	toogleOption: (id: number) => void;
}> = ({ optionId, optionText, selectedOption, toogleOption }) => {
	return (
		<div
			onClick={() => toogleOption(optionId)}
			className={
				optionId === selectedOption
					? `${s.feedback_option} ${s.feedback_optionActive}`
					: `${s.feedback_option}`
			}
		>
			<div className={s.feedback_checkbox}>
				{optionId === selectedOption && (
					<span className={s.feedback_checked}></span>
				)}
			</div>
			<p className={s.feedback_optionText}>{optionText}</p>
		</div>
	);
};

export default FeedbackOption;
