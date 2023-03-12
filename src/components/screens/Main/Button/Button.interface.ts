import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export interface ToCartButtonInterface
    extends DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    children: ReactNode;
}
