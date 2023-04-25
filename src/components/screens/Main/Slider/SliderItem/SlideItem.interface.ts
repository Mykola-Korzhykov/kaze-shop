import { SingleProductRes } from '@/types/product';

export interface SlideItemInterfaces extends SingleProductRes {
	children?: JSX.Element;
	className?: string;
}
