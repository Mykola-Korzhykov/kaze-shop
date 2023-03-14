import s from "./Main.module.scss";
import Product from '../../../assets/images/main/products/product1.png';
import Product1 from '../../../assets/images/main/ProductsAccessories/product2.png';
import React from "react";
import BuyProducts from "./BuyProducts/BuyProducts";
import Slider from "./Slider/Slider";
import About from "./About/About";
import Reviews from "./Reviews/Reviews";
import FAQ from "./FAQ/FAQ";


const mockSliderProps = [
    {
        img: Product,
        title: 'Лосины ТайДай',
        price: '78$',
    },
    {
        img: Product,
        title: 'Лосины ТайДай',
        price: '78$',
    },
    {
        img: Product,
        title: 'Лосины ТайДай',
        price: '78$',
    },
    {
        img: Product,
        title: 'Лосины ТайДай',
        price: '78$',
    },
    {
        img: Product,
        title: 'Лосины ТайДай',
        price: '78$',
    },
    {
        img: Product,
        title: 'Лосины ТайДай',
        price: '78$',
    }
];

const mockSliderProps1 = [
    {
        img: Product1,
        title: 'Хай тек серая',
        price: '48$',
    },
    {
        img: Product1,
        title: 'Хай тек серая',
        price: '78$',
    },
    {
        img: Product1,
        title: 'Хай тек серая',
        price: '88$',
    },
    {
        img: Product1,
        title: 'Хай тек серая',
        price: '28$',
    },
    {
        img: Product1,
        title: 'Хай тек серая',
        price: '38$',
    },
    {
        img: Product1,
        title: 'Хай тек серая',
        price: '48$',
    }
]

const Main = () => {
    return (
        <div className={s.wrapper}>
            <BuyProducts />
            <Slider items={mockSliderProps} title='Фитнес одежда' />
            <About />
            <Slider items={mockSliderProps1} title='Аксессуары' />
            <Reviews />
            <FAQ/>
        </div>
    );
};

export default Main;
