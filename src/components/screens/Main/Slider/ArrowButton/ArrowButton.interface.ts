import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export interface ArrowButtonInterface
    extends DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    position?: 'up' | 'down' | 'left' | 'right';
}