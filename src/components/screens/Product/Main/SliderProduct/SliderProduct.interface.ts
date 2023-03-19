import { StaticImageData } from "next/image";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface SliderProductInterface
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    images: string[] | StaticImageData[];
}
