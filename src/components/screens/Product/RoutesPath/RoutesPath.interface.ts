import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface RoutesPathInterface
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	categories: PathObj[];
}

interface PathObj {
	path: string;
	href: string;
}
