import { StaticImageData } from "next/image";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface SliderInterface
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    items: Product[];
    title: string;
}

interface Product {
    img: string | StaticImageData;
    title: string;
    price: string;
}