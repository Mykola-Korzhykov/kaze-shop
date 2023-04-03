import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import Link from 'next/link';
import Spinner from '@/components/Spinner/Spinner';
import { Api } from '@/services';
import Image from 'next/image';
import { yupResolver } from '@hookform/resolvers/yup';
import { FeedbackFormSchema } from '@/utils/validation';
import { useForm } from 'react-hook-form';
import s from './Feedback.module.scss';
import { useRouter } from 'next/router';
import FeedbackOption from './FeedbackOption';
import { object } from 'yup';
const FeedBack = () => {
	const [selectedOption, setSelectedOption] = React.useState<number>(4);
	const [requestLoading, setRequestLoading] = React.useState<boolean>(false);
	const toogleOption = (id: number) => {
		setSelectedOption(id);
	};
	const router = useRouter();
	const feedbackProduct = useAppSelector(
		(state) => state.goods.feedbackProduct
	);

	const feedBackInfoForm = useForm<{
		name: string;
		surname: string;
		review: string;
	}>({
		mode: 'onChange',
		resolver: yupResolver(FeedbackFormSchema),
	});

	const onSubmit = async (dto: {
		name: string;
		surname: string;
		review: string;
	}) => {
		try {
			setRequestLoading(true);
			const data = await Api().goods.sendFeedback(
				{ ...dto, rating: selectedOption },
				feedbackProduct?.productId
			);
			feedBackInfoForm.reset()
			router.push(`/product/${feedbackProduct?.productId}`)
			setRequestLoading(false);
		} catch (err) {
			setRequestLoading(false);
			router.push('/404');
		}
	};
	React.useEffect(() => {
		if (!feedbackProduct) {
			router.push('/');
		}
	}, [feedbackProduct]);
	const FeedBacks = [
		{ id: 1, optionText: 'Оцениваю на одну звездочку, все плохо!' },
		{ id: 2, optionText: 'Недоволен работой(' },
		{
			id: 3,
			optionText:
				'Оцениваю все на троечку, и не очень классно, и не очень плохо',
		},
		{ id: 4, optionText: 'Просто доволен покупкой)' },
		{ id: 5, optionText: 'Очень доволен! Все понравилось! Все идеально!' },
	];
	return (
		<main className="content">
			<div className="container">
				<div className="page_coordinator">
					<Link href="/">Главная</Link> | <Link href="/сatalog">Каталог</Link> |{' '}
					<span>Лосины Тай Дай</span> | <span>Оставить отзыв</span>
				</div>
				<div className={s.feedback_content}>
					<div className={s.feedback_imgWrapper}>
						<Image
							src={
								'https://distribution.faceit-cdn.net/images/a18d674f-727b-4017-8dc3-a546876459e0.jpeg'
							}
							className={s.feedback_img}
							width={390}
							height={460}
							alt="feed back img"
						/>
					</div>
					<form
						onSubmit={feedBackInfoForm.handleSubmit(onSubmit)}
						className={s.feedback_text}
					>
						<div className={s.feedback_inputs}>
							<div className={s.feedback_field}>
								<label className={s.feedback_label} htmlFor="email">
									Имя
								</label>
								<div className={s.feedback_input}>
									<input
										placeholder="Введите Имя"
										type="text"
										className=""
										name="email"
										{...feedBackInfoForm.register('name')}
									/>
								</div>
								<span className="auth_error">
									{feedBackInfoForm.formState.errors.name &&
										feedBackInfoForm.formState.errors.name.message}
								</span>
							</div>
							<div className={s.feedback_field}>
								<label className={s.feedback_label} htmlFor="email">
									Фамилия
								</label>
								<div className={s.feedback_input}>
									<input
										placeholder="Введите Фамилию"
										type="text"
										className=""
										name="email"
										{...feedBackInfoForm.register('surname')}
									/>
								</div>
								<span className="auth_error">
									{feedBackInfoForm.formState.errors.surname &&
										feedBackInfoForm.formState.errors.surname.message}
								</span>
							</div>
							<div className={s.feedback_field}>
								<label className={s.feedback_label} htmlFor="email">
									Напишите отзыв
								</label>
								<div className={s.feedback_input}>
									<input
										placeholder="Что вы думаете о нашем магазине?"
										type="text"
										className=""
										name="email"
										{...feedBackInfoForm.register('review')}
									/>
								</div>
								<span className="auth_error">
									{feedBackInfoForm.formState.errors.review &&
										feedBackInfoForm.formState.errors.review.message}
								</span>
							</div>
						</div>
						<div className={s.feedback_options}>
							<p className={s.feedback_descr}>
								На сколько вы довольны нашим интернет магазином?
							</p>
							{FeedBacks.map((el) => {
								return (
									<FeedbackOption
										optionId={el.id}
										key={new Date() + '' + el.id}
										optionText={el.optionText}
										selectedOption={selectedOption}
										toogleOption={toogleOption}
									/>
								);
							})}
						</div>
						<div className={s.feedback_btns}>
							<button className={s.feedback_skip} type="submit">
								Отмена
							</button>
							<button className={s.feedback_submit} type="submit">
								Отправить отзыв
							</button>
						</div>
					</form>
				</div>
			</div>
		</main>
	);
};

export default FeedBack;
