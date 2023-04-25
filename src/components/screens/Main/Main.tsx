import Product from '../../../assets/images/main/productsFitnes/product1.png';
import Product1 from '../../../assets/images/main/ProductsAccessories/product2.png';
import React from "react";
import BuyProducts from "./BuyProducts/BuyProducts";
import Slider from "./Slider/Slider";
import About from "./About/About";
import Reviews from "./Reviews/Reviews";
import FAQ from "./FAQ/FAQ";
import Footer from "@/components/Footer/Footer";
import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/router';




const Main = (): JSX.Element => {
    const productPackOne = useAppSelector(store => store.main.productSliderOne);
    const productPackTwo = useAppSelector(store => store.main.productSliderTwo);
    const clientReviews = useAppSelector(store => store.strapiValues.reviews.clientReviews);
    const router = useRouter();
    const myLocale = router.locale as 'ua' | 'ru' | 'rs' | 'en'
    return (
        <div>
            <BuyProducts />
            {productPackOne.length > 0 && productPackOne.length && <Slider items={productPackOne} title={productPackOne[0].categories[0][myLocale]} />}
            <About />
            {productPackTwo.length > 0 && productPackTwo.length && <Slider items={productPackTwo} title={productPackTwo[0].categories[0][myLocale]} />}
            <Reviews clientReviews={clientReviews} />
            <FAQ />
            <Footer/>
        </div>
    );
};

export default Main;
