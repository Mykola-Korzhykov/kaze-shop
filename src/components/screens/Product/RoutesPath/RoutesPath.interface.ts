import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface RoutesPathInterface
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	categories: string;
}
