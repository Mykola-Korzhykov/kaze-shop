import { StaticImageData } from "next/image";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface SlideItemInterface
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    img: string | StaticImageData;
    name: string;
    reviewsText: string;
    grade: number;
}
