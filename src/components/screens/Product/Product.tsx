import React, { useEffect, useState } from 'react';
import s from './Product.module.scss';
import Slider from '../Main/Slider/Slider';
import Main from './Main/Main';
import Product1 from '../../../assets/images/main/ProductsAccessories/product2.png';
import Reviews from '../Main/Reviews/Reviews';
import Feedback from './Feedback/Feedback';
import { ManyProductRes, SingleProductData, SingleProductRes } from '@/types/product';
import cn from 'classnames';
import { Api } from '@/services';
import { useAppSelector } from '@/redux/hooks';

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
    const [recentlyViewed, setRecentlyViewed] = useState<SingleProductRes[]>([]);
    const reviews = useAppSelector(store => store.strapiValues.reviews.clientReviews);


    useEffect(() => {
        const getViewsProduct = async () => {
            const itemId: Array<number> | null = JSON.parse(window.localStorage.getItem('recentlyViewedProducts'));

            if (!itemId) {
                return;
            }
            try {
                const response = await Api().goods.getManyProduct<ManyProductRes>(itemId);
                setRecentlyViewed(response.products);
            } catch (e) {
                console.log(e);
            }
        }
        getViewsProduct();

    }, []);


    return (
        <div>
            <Main {...product} />
            {recentlyViewed.length > 0 && <Slider slideHeight={360} title='Вы недавно смотрели' items={recentlyViewed} />}
            <Reviews clientReviews={reviews} className={cn({
                [s.reviews]: recentlyViewed.length === 0
            })} />
            <Feedback id={product.id} />
        </div>

    );
};



export default OneProduct;