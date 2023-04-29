import React from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
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
import { setFeedbackProduct } from '@/redux/slices/goods';
import { Goods } from '@/types/goods';
import { useTranslation } from 'next-i18next';
const FeedBack = () => {
	const { t } = useTranslation('feedback');
	const { t: commonT } = useTranslation('common');
	const { t: validationT } = useTranslation('signup');
	const dispatch = useAppDispatch();
	const [selectedOption, setSelectedOption] = React.useState<number>(5);
	const [requestLoading, setRequestLoading] = React.useState<boolean>(false);

	const toogleOption = (id: number) => {
		setSelectedOption(id);
	};
	const feedbackProduct = useAppSelector(
		(state) => state.goods.feedbackProduct
	);
	const router = useRouter();
	const { id } = router.query;
	React.useEffect(() => {
		const fetchProductData = async () => {
			try {
				setRequestLoading(true);
				const product: Goods = await Api().goods.getSingleProduct(id + '');

				dispatch(
					setFeedbackProduct({
						imageUrl: product?.images[0]?.imagesPaths[0],
						productId: product?.id,
						productName: product?.title,
					})
				);

				setRequestLoading(false);
			} catch (e) {
				setRequestLoading(false);
				router.push('/');
			}
		};
		fetchProductData();
	}, []);

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
			feedBackInfoForm.reset();
			router.push(`/product/${feedbackProduct?.productId}`);
			setRequestLoading(false);
		} catch (err) {
			setRequestLoading(false);
			router.push('/404');
		}
	};

	const FeedBacks = [
		{ id: 1, optionText: t('1star') },
		{ id: 2, optionText: t('2star') },
		{
			id: 3,
			optionText: t('3star'),
		},
		{ id: 4, optionText: t('4star') },
		{ id: 5, optionText: t('5star') },
	];
	return (
		<>
			{requestLoading && <Spinner />}
			<main className="content">
				<div className="container">
					<div className="page_coordinator">
						<Link href="/">{commonT('Main')}</Link> |{' '}
						<Link href="/сatalog">{commonT('catalog')}</Link> |{' '}
						<span>
							{
								feedbackProduct?.productName?.[
									router.locale as 'ua' | 'en' | 'rs' | 'ru'
								]
							}
						</span>
						| <span>{t('feedback')}</span>
					</div>
					<div className={s.feedback_content}>
						<div className={s.feedback_imgWrapper}>
							<Image
								src={
									feedbackProduct?.imageUrl ??
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
										{validationT('name')}
									</label>
									<div className={s.feedback_input}>
										<input
											placeholder={validationT('enter_name')}
											type="text"
											className=""
											name="email"
											{...feedBackInfoForm.register('name')}
										/>
									</div>
									<span className="auth_error">
										{feedBackInfoForm.formState.errors.name &&
											validationT(
												feedBackInfoForm.formState.errors.name.message
											)}
									</span>
								</div>
								<div className={s.feedback_field}>
									<label className={s.feedback_label} htmlFor="email">
										{validationT('surname')}
									</label>
									<div className={s.feedback_input}>
										<input
											placeholder={validationT('enter_surname')}
											type="text"
											className=""
											name="email"
											{...feedBackInfoForm.register('surname')}
										/>
									</div>
									<span className="auth_error">
										{feedBackInfoForm.formState.errors.surname &&
											validationT(
												feedBackInfoForm.formState.errors.surname.message
											)}
									</span>
								</div>
								<div className={s.feedback_field}>
									<label className={s.feedback_label} htmlFor="email">
										{t('write_feedback')}
									</label>
									<div className={s.feedback_input}>
										<textarea
											placeholder={t('aboutStore')}
											className=""
											name="email"
											{...feedBackInfoForm.register('review')}
										/>
									</div>
									<span className="auth_error">
										{feedBackInfoForm.formState.errors.review &&
											validationT(
												feedBackInfoForm.formState.errors.review.message
											)}
									</span>
								</div>
							</div>
							<div className={s.feedback_options}>
								<p className={s.feedback_descr}>{t('aboutStorePlaceholder')}</p>
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
								<button
									onClick={() => {
										setRequestLoading(true);
										router.push(`/product/${id}`);
									}}
									className={s.feedback_skip}
									type="submit"
								>
									{commonT('cancel')}
								</button>
								<button className={s.feedback_submit} type="submit">
									{t('send_feedback')}
								</button>
							</div>
						</form>
					</div>
				</div>
			</main>
		</>
	);
};

export default FeedBack;
