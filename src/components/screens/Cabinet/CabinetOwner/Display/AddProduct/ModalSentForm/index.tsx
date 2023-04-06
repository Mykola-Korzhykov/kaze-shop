import React from 'react';
import s from './ModalSentForm.module.scss';
import { setProductForm } from '@/redux/slices/modal';
import { useAppDispatch } from '@/redux/hooks';

export const ModalSentForm = () => {
	const dispatch = useAppDispatch();
	return (
		<div className={s.wrapper}>
			<div className={s.content}>
				<div className={s.text_wrapper}>
					<h2 className={s.title}>Товар успешно добавлен</h2>
					<p className={s.text}>Нажмите “Готово” для того. чтобы продолжить</p>
				</div>
				<div onClick={() => dispatch(setProductForm(false))} className={s.btn}>
					готово
				</div>
			</div>
		</div>
	);
};
