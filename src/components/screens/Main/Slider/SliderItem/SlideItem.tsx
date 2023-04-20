import Image from "next/image";
import { SlideItemInterfaces } from "./SlideItem.interface";

import s from './slideItem.module.scss';

import cn from 'classnames';
import { useRouter } from "next/router";

const SlideItem = ({ images, title, price, className, children, }: SlideItemInterfaces): JSX.Element => {
    const router = useRouter();
    router.locale
    return (
        <>
            <div className={cn(s.slide_item, className)}>
                <Image src={images[0].imagesPaths[0]} width={100} height={100} alt={title['ua']} quality={100} />
                <h3>{title['ua']}</h3>
                <span>{price}</span>
            </div>
            {children}
        </>
    );
};

export default SlideItem;
