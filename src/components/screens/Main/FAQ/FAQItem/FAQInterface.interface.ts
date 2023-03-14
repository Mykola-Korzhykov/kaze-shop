import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface FAQItemInterface
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    title: string;
    text: string[];
    isOpen: boolean;
}
