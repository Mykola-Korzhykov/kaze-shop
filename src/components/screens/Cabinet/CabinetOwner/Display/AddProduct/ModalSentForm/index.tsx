import React from 'react';
import s from './ModalSentForm.module.scss';
import { setProductForm } from '@/redux/slices/modal';
import { useAppDispatch } from '@/redux/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface PropsInterface {
	title: string;
	subtitle: string;
	btntitle: string;
}

export const ModalSentForm = ({
	title,
	subtitle,
	btntitle,
}: PropsInterface) => {
	const dispatch = useAppDispatch();
	const sentProductForm = useSelector(
		(state: RootState) => state.modaleSlice.sentProductForm
	);
	return (
		<div
			style={{
				bottom: `${sentProductForm.bottom}px`,
			}}
			className={s.wrapper}
		>
			<div className={s.content}>
				<div className={s.text_wrapper}>
					<h2 className={s.title}>{title}</h2>
					<p className={s.text}>{subtitle}</p>
				</div>
				<div
					onClick={() =>
						dispatch(
							setProductForm({
								turn: false,
								title: '',
								subtitle: '',
								btntitle: '',
								spiner: false,
								bottom: 0,
							})
						)
					}
					className={s.btn}
				>
					{btntitle}
				</div>
			</div>
		</div>
	);
};
