import { DetailedHTMLProps } from 'react';

export interface ToggleChangeProps
	extends DetailedHTMLProps<
		React.HTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	> {
	title: string;
	buttonOneText: string;
	buttonTwoText: string;
	active: boolean;
	name: string;
	setActive: (arg: boolean) => void;
}
