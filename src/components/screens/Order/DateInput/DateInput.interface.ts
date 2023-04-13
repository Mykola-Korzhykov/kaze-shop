import { DetailedHTMLProps, LabelHTMLAttributes } from 'react';
import { ChangeHandler, Noop } from 'react-hook-form';

export interface DateInputProps {
	title: string;
	placeholder: string;
	errorMessage?: string;
	name?: string;
	onChange?: (d: Date) => void;
	value: Date | null;
	onBlur?: Noop;
	ref?: React.Ref<any>;
	className?: string;
}
