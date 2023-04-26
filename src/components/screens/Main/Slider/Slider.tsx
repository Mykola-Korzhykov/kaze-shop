import ArrowButton from './ArrowButton/ArrowButton';
import s from './slider.module.scss';
import { SingleProductRes } from '@/types/product';
import SlideItem from './SliderItem/SlideItem';
import cn from 'classnames';
import { useKeenSlider } from 'keen-slider/react';
import ProductBottomButton from '../ProductBottomButton/ProductBottomButton';
import { SliderInterface } from './Slider.interface';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addProductToCart, addProductToCompare, addToSavedProducts, deleteCatalogSavedProduct } from '@/redux/slices/goods';
import { useRouter } from 'next/router';
import { deleteSavedProduct } from '@/redux/slices/user';
import { Api } from '@/services';

const Slider = ({ title, items, className, slideHeight }: SliderInterface): JSX.Element => {
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
                }
            }
        },
        loop: true,
    });

    const dispatch = useAppDispatch();
    const { isAuth, user } = useAppSelector(store => store.user);
    const router = useRouter();
    console.log(items)

    const basketButtonHandler = (product: SingleProductRes) => {
        dispatch(
            addProductToCart({
                id: product.id,
                imageUrl: product?.images[0]?.imagesPaths[0],
                colourId: product?.images[0]?.colour?.id,
                size: product?.sizes[0],
            })
        );
        dispatch(addProductToCompare({
            ...product
        }));
        router.push('/compare');
    };

    const addSavedProduct = (product: SingleProductRes) => {
        if (isAuth && user?.type === 'USER') {
            try {
                Api().goods.addToFavorites(product?.id);
                dispatch(addToSavedProducts(product?.id));
            } catch (e) {
                router.push('/404');
            }
        } else if (!isAuth) {
            router.push('/login');
        }
    };

    const deleteSavedProductFunc = (product: SingleProductRes) => {
        if (isAuth && user?.type === 'USER') {
            dispatch(deleteSavedProduct(product?.id));
            dispatch(deleteCatalogSavedProduct(product?.id));
            try {
                Api().user.deleteUserSavedProduct(product?.id);
            } catch (e) {
                router.push('/404');
            }
        } else if (!isAuth) {
            router.push('/login');
        }
    };

    return (
        <div className={cn(s.slider_box, 'container', className)}>
            <div className={s.title_box}>
                <h3>{ title}</h3>
                <div>
                    <ArrowButton position='left' onClick={()=>instanceRef.current?.prev()}/>
                    <ArrowButton position='right' onClick={()=>instanceRef.current?.next()} />
                </div>
            </div>
            <div className={cn(s.slider, 'keen-slider')} ref={sliderRef}>
                {items.map((item, i) => {
                    return (
                        <div key={i} className={
                            cn(s.slide_item, `keen-slider__slide number-slide${i + 1}`)} >
                            <SlideItem {...item} slideHeight={slideHeight}>
                                <ProductBottomButton
                                    addToCart={() => basketButtonHandler(item)}
                                    addToFavorites={() => addSavedProduct(item)}
                                    deleteToFavorites={() => deleteSavedProductFunc(item)}
                                    isSaved={item.isSaved}
                                />
                            </SlideItem>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}



export default Slider;