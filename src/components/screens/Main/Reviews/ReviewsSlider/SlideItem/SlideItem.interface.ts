import { StaticImageData } from "next/image";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface SlideItemInterface {
	id: number;
	name: string;
	surname: string;
	review: string;
	rating: number;
	imageUrl: string;
	createdAt: string;
	updatedAt: string;
	className?: string;
}
