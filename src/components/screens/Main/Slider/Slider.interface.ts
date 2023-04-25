import { Product } from '@/types/mainPageRequest/categorySlider';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface SliderInterface
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	items?: Product[];
	title: string;
}
