import { DetailedHTMLProps } from 'react';

export interface CountButtonProps
	extends DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	countType: 'plus' | 'minus';
}
