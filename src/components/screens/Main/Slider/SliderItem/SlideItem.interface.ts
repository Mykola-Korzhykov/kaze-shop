import {
	Category,
	Product,
	SizeChartImageDescription,
} from '@/types/mainPageRequest/categorySlider';
import {
	Description,
	Image,
	Title,
} from '@/types/mainPageRequest/lastAddedProduct';
import { StaticImageData } from 'next/image';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface SlideItemInterfaces extends Product {
	children?: JSX.Element;
	className?: string;
}
