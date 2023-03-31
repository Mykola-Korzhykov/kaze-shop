import { Dispatch, SetStateAction } from 'react';

export interface SizeItemsInterface {
	sizes: string[];
	activeSize: number;
	setSize: (i: number) => void;
}
