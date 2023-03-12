import { StaticImageData } from "next/image";
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface SlideItemInterfaces
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    img: string | StaticImageData;
    title: string;
    price: string;
    children?: JSX.Element;
}
