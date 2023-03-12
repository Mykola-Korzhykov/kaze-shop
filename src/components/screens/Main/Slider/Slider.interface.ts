import { StaticImageData } from "next/image";

export interface SliderInterface {
    items: Product[];
    title: string;
}

interface Product {
    img: string | StaticImageData;
    title: string;
    price: string;
}