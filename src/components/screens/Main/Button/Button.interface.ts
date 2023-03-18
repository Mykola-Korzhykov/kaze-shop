import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export interface ToCartButtonInterface
    extends DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    children: ReactNode;
    arrow?: boolean;
    color?: "black" | "transparent";
}
