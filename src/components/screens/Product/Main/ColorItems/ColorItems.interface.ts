import { Dispatch, SetStateAction } from 'react';

export interface ColorItemsInterface {
	colors: string[];
	activeColor: number;
	setColor?: (i: number) => void;
	size?: '43' | '30';
}
