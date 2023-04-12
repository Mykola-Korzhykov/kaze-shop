import { ChangeHandler } from 'react-hook-form';

export interface InputPhoneProps {
	country: Array<string>;
	masks?: object;
	errorMessage?: string;
	placeholder?: string;
	label: string;
	name?: string;
	className?: string;
	onChange?: () => void;
	onBlur?: () => void;
	ref?: React.Ref<any>;
	value?: string;
}
