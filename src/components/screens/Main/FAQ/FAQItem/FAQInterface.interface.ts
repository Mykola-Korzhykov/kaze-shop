import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface FAQItemInterface
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	title: string;
	text: Text[];
	id: string;
	isOpen: boolean;
}

interface Text {
	text: string;
	id: number;
}