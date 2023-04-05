import { DetailedHTMLProps } from 'react';

export interface InputProps
	extends DetailedHTMLProps<
		React.InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {
	name: string;
	label: string;
	placeholder: string;
	type?: string;
	errorMessage?: string;
}
