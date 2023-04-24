import Image from "next/image";
import { SlideItemInterfaces } from "./SlideItem.interface";

import s from './slideItem.module.scss';

import cn from 'classnames';
import { useRouter } from "next/router";

const SlideItem = ({ images, title, price, className, children, }: SlideItemInterfaces): JSX.Element => {
    const router = useRouter();
    const localeType = router.locale as 'ua' | 'en' | 'rs' | 'ru';
    return (
        <>
            <div className={cn(s.slide_item, className)}>
                <Image src={images[0].imagesPaths[0]} width={100} height={100} alt={title[localeType]} quality={100} />
                <h3>{title[localeType]}</h3>
                <span>{price}</span>
            </div>
            {children}
        </>
    );
};

export default SlideItem;
