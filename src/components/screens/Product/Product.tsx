import React from 'react';
import Slider from '../Main/Slider/Slider';
import Main from './Main/Main';
import Product1 from '../../../assets/images/main/ProductsAccessories/product2.png';
import Reviews from '../Main/Reviews/Reviews';
import Feedback from './Feedback/Feedback';
import { SingleProductData } from '@/types/singleProduct';

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


const OneProduct = ({ product }: SingleProductData): JSX.Element => {

    return (
        <div>
            <Main {...product} />
            <Slider title='Вы недавно смотрели' items={mockSliderProps1} />
            <Reviews />
            <Feedback id={product.id} />
        </div>

    );
};



export default OneProduct;