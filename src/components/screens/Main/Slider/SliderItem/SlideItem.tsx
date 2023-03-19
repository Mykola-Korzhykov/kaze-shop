import Image from "next/image";
import { SlideItemInterfaces } from "./SlideItem.interface";

import s from './slideItem.module.scss';

import cn from 'classnames';

const SlideItem = ({ img, title, price, className, children, ...props }: SlideItemInterfaces): JSX.Element => {
    return (
        <>
            <div className={cn(s.slide_item, className)} {...props}>
                <Image src={img} alt={title} quality={100} />
                <h3>{title}</h3>
                <span>{price}</span>
            </div>
            {children}
        </>
    );
};

export default SlideItem;
