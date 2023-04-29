import s from "./BuyProducts.module.scss";
import ArrowRight from "../../../../assets/images/main/ArrowRight.svg";

import Link from "next/link";
import Image from 'next/image';
import { useKeenSlider } from 'keen-slider/react';
import Button from '../Button/Button';
import cn from 'classnames';
import GirlPhoto992 from '../../../../assets/images/main/main_girl_bg_992.png';
import { useAppSelector } from '@/redux/hooks';
import { useEffect } from 'react';
import SlideItem from '../Slider/SliderItem/SlideItem';

const BuyProducts = (): JSX.Element => {
	const { button, vertical_text_one, vertical_text_two } = useAppSelector(
		(store) => store.strapiValues.mainPage
	);
	const product = useAppSelector((store) => store.main.lastAddedProduct);

	const [sliderRef, instanceRef] = useKeenSlider({
		slides: {
			perView: 3,
			spacing: 15,
		},
		breakpoints: {
			'(max-width: 992px)': {
				slides: {
					perView: 2,
					spacing: 15,
				},
			},
		},
		loop: true,
	});

	return (
		<div className={s.wrapper}>
			<div className={s.wrapper__box}>
				<div className={s.offer}>
					<div className={s.offer__bg}>
						<Image
							src={GirlPhoto992}
							quality={100}
							alt="girl photo"
							className={s.offer__bg_girl}
						/>
						<div className={s.offer__bg_vertical}>
							<Link href={vertical_text_one.link}>
								<span>{vertical_text_one.text}</span>
							</Link>
							<Link href={vertical_text_two.link}>
								<span>{vertical_text_two.text}</span>
							</Link>
						</div>
						<div className={s.offer__title}>
							<span>БУДЬ</span>
							<span>СОБОЙ</span>
						</div>
					</div>

					<div className={s.btn_slider_block}>
						<div className={s.wrapper__box_bottom}>
							<Link href={button.link} className={s.button_link}>
								<Button>{button.text}</Button>
							</Link>

							{product.length > 0 && (
								<div
									ref={sliderRef}
									className={cn(s.slider__wrapper, 'keen-slider')}
								>
									{product.map((item, i) => (
										<SlideItem
											slideHeight={220}
											{...item}
											className={cn(
												'keen-slider__slide',
												`number-slide${i + 1}`,
												s.slideItem
											)}
											key={item.id}
										/>
									))}
								</div>
							)}
						</div>
					</div>
				</div>
				<div
					className={s.next__slide}
					onClick={() => instanceRef.current?.next()}
				>
					<Image src={ArrowRight} alt="next slide" />
				</div>
			</div>
		</div>
	);
};

export default BuyProducts;
