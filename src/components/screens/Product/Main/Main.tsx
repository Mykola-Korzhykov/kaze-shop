import Image from "next/image";
import RoutesPath from "../RoutesPath/RoutesPath";
import s from "./main.module.scss";
import Button from "../../Main/Button/Button";
import cn from "classnames";
import productPhoto from "../../../../assets/images/product/product1.png";
import SizeItems from "./SizeItems/SizeItems";
import ColorItems from "./ColorItems/ColorItems";
import Slider from "./SliderProduct/SliderProduct";
import Link from "next/link";
import SlideItem from '../../../../assets/images/product/slider/photo.png';
import { SingleProductData } from "@/types/singleProduct";
import { useState } from "react";

const mockSIze = ["XXS", "XS", "S", "M", "L", "XL", "M", "L", "XL"];
const mockColor = [
    "#123",
    "#234",
    "#345",
    "#456",
    "#567",
    "#678",
    "#789",
    "#890",
    "#901",
];
const mockSlideImg = [SlideItem, SlideItem, SlideItem, SlideItem, SlideItem, SlideItem]
const Main = ({ title, description, price, images, sizes, quantity, categories }: SingleProductData) => {

    const [activeColor, setActiveColor] = useState<number>(0);
    const [activeSize, setActiveSize] = useState<number>(0);

    const availableColors = images.filter(el => {
        const result = el.sizes.find(sizeItem => sizeItem.replace(/ /g, '') === sizes[activeSize].replace(/ /g, ''));
        return result;
    })

    const renderSlider = availableColors.map((el, i) => {
        if (activeColor === i) {
            return <Slider key={i} images={el.imagesPaths} className={s.main_slider} />
        }
    });
    const fewProduct = quantity < 5;

    const setSize = (i: number) => {
        setActiveColor(0);
        setActiveSize(i);
    }

    const mainImg = images[activeColor].imagesPaths[0]
    return (
        <div className={s.main}>
            <div className={s.main_box}>
                <div className={cn("container", s.main_bg)}>
                    <RoutesPath categories={categories[0].ru} />

                    <div className={s.main_wrapper}>
                        <div className={s.title}>
                            <h1>{title.ua}</h1>
                            <div>
                                <b>{price}</b>
                                {fewProduct && <span>Осталось мало</span>}
                            </div>
                        </div>
                        <div className={s.sizes}>
                            <h3>Size</h3>
                            <SizeItems sizes={sizes} setSize={setSize} activeSize={activeSize} />
                        </div>
                        <div className={s.colors}>
                            <h3>Color</h3>
                            <ColorItems colors={availableColors.map(el => el.colour.hex)}
                                activeColor={activeColor}
                                setColor={setActiveColor} />
                        </div>
                        <div className={s.buttons}>
                            <Button arrow={false}>В корзину</Button>
                            <Button color="transparent">В один клик</Button>
                        </div>
                        <div className={s.main_photo}>
                            <Image src={mainImg} width={100} height={100} alt={"Лосины Тай Дай"} priority={true} quality={100} />

                        </div>
                        {renderSlider}
                        <div className={s.text}>
                            <p>
                                {description.ua}
                            </p>
                            <Link href=''>
                                <span>Размерная сетка</span>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.75 12H20.25" stroke="#0B0B0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M13.5 5.25L20.25 12L13.5 18.75" stroke="#0B0B0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
