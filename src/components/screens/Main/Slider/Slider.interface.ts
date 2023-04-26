import { SingleProductRes } from '@/types/product';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface SliderInterface
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	items: SingleProductRes[];
	title: string;
	slideHeight: number;
}
