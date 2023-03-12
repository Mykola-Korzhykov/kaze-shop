import s from "./buyProducts.module.scss";
import ArrowRight from "../../../../assets/images/main/ArrowRight.svg";

import Link from "next/link";
import Image from "next/image";
import ProductSlider from "./ProductSlider/ProductSlider";
import React from "react";
import { useKeenSlider } from "keen-slider/react";
import Button from "../Button/Button";
import cn from "classnames";

const BuyProducts = (): JSX.Element => {
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const [sliderRef, instanceRef] = useKeenSlider({
        slides: {
            perView: 3,
            spacing: 15,
        },
        breakpoints: {
            "(max-width: 992px)": {
                slides: {
                    perView: 2,
                    spacing: 15,
                },
            },
        },
        loop: true,
        initial: 0,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel);
        },
    });
    return (
        <div className={s.wrapper}>
            <div className={s.wrapper__box}>
                <div className={s.offer}>
                    <div className={s.offer__bg}>
                        <div className={s.offer__bg_vertical}>
                            <Link href="/catalog">
                                <span>Велосипедки</span>
                            </Link>
                            <Link href="/catalog">
                                <span>Повседневное белье</span>
                            </Link>
                        </div>
                        <div className={s.offer__title}>
                            <span>БУДЬ</span>
                            <span>СОБОЙ</span>
                        </div>
                    </div>
                    <div className={s.btn_slider_block}>
                        <div className={s.wrapper__box_bottom}>
                            <Link href={"/catalog"} className={s.button_link}>
                                <Button>Купить</Button>
                            </Link>
                            <div
                                ref={sliderRef}
                                className={cn(s.slider__wrapper, "keen-slider")}
                            >
                                <ProductSlider />
                            </div>
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
