import ArrowButton from './ArrowButton/ArrowButton';
import s from './slider.module.scss';
import { SingleProductRes } from '@/types/product';
import SlideItem from './SliderItem/SlideItem';
import cn from 'classnames';
import { useKeenSlider } from 'keen-slider/react';
import ProductBottomButton from '../ProductBottomButton/ProductBottomButton';
import { SliderInterface } from './Slider.interface';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addProductToCart, addProductToCompare } from '@/redux/slices/goods';
import { useRouter } from 'next/router';
import { Api } from '@/services';
import { useEffect, useState } from 'react';
import { setCookie } from 'nookies';
import { addUserInfo } from '@/redux/slices/user';
import Cookies from 'js-cookie';

const Slider = ({
	title,
	items,
	className,
	slideHeight,
}: SliderInterface): JSX.Element => {
	const [sliderRef, instanceRef] = useKeenSlider({
		slides: {
			perView: 4,
			spacing: 30,
		},
		breakpoints: {
			'(max-width: 992px)': {
				slides: {
					perView: 3,
					spacing: 30,
				},
			},
		},
		loop: true,
	});

	const dispatch = useAppDispatch();
	const { isAuth, user } = useAppSelector((store) => store.user);
	const router = useRouter();
	const [savedProduct, setSavedProduct] = useState<Array<number>>([]);

	const fetchUserData = async () => {
		try {
			const data = await Api().user.getMe(router?.locale);

			setCookie(null, 'accessToken', data?.accessToken, {
				maxAge: data?.maxAge,
				path: '/',
			});
			if (data?.user) {
				dispatch(addUserInfo(data?.user));
			}
			if (data?.admin) {
				dispatch(addUserInfo(data?.admin));
			}
			if (data?.owner) {
				dispatch(addUserInfo(data?.owner));
			}
		} catch (e) {
			//router.push('/404')
			if (e?.response?.status === 400 || e?.response?.status === 404) {
				Cookies.remove('accessToken');
				router.push('/login');
			}
		}
	};

	const basketButtonHandler = (product: SingleProductRes) => {
		dispatch(
			addProductToCart({
				id: product.id,
				imageUrl: product?.images[0]?.imagesPaths[0],
				colourId: product?.images[0]?.colour?.id,
				size: product?.sizes[0],
			})
		);
		dispatch(
			addProductToCompare({
				...product,
			})
		);
		router.push('/compare');
	};

	const addSavedProduct = async (product: SingleProductRes) => {
		if (isAuth) {
			if (!user) {
				fetchUserData();
			}
			try {
				setSavedProduct((prevState) => [...prevState, product.id]);
				await Api().goods.addToFavorites(product?.id);
			} catch (e) {
				router.push('/404');
			}
		} else if (!isAuth) {
			router.push('/login');
		}
	};

	const deleteSavedProductFunc = async (product: SingleProductRes) => {
		if (isAuth) {
			if (!user) {
				fetchUserData();
			}
			try {
				const deleteProduct = savedProduct.filter((id) => id !== product.id);
				setSavedProduct(deleteProduct);
				await Api().user.deleteUserSavedProduct(product?.id);
			} catch (e) {
				router.push('/404');
			}
		} else if (!isAuth) {
			router.push('/login');
		}
	};
	const checkedSaveProduct = (id: number): boolean => {
		const product = savedProduct.find((productId) => productId === id);
		if (product) {
			return true;
		}
		return false;
	};

	useEffect(() => {
		const savedId: Array<number> = [];
		items.forEach((elem) => {
			if (elem.isSaved) {
				savedId.push(elem.id);
			}
		});
		setSavedProduct(savedId);
	}, []);

	return (
		<div className={cn(s.slider_box, 'container', className)}>
			<div className={s.title_box}>
				<h3>{title}</h3>
				<div>
					<ArrowButton
						position="left"
						onClick={() => instanceRef.current?.prev()}
					/>
					<ArrowButton
						position="right"
						onClick={() => instanceRef.current?.next()}
					/>
				</div>
			</div>
			<div className={cn(s.slider, 'keen-slider')} ref={sliderRef}>
				{items.map((item, i) => {
					return (
						<div
							key={i}
							className={cn(
								s.slide_item,
								`keen-slider__slide number-slide${i + 1}`
							)}
						>
							<SlideItem {...item} slideHeight={slideHeight}>
								<ProductBottomButton
									addToCart={() => basketButtonHandler(item)}
									addToFavorites={() => addSavedProduct(item)}
									deleteToFavorites={() => deleteSavedProductFunc(item)}
									isSaved={checkedSaveProduct(item.id)}
								/>
							</SlideItem>
						</div>
					);
				})}
			</div>
		</div>
	);
};



export default Slider;