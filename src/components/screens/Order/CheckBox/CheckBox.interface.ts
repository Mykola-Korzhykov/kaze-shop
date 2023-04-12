import { ChangeHandler } from 'react-hook-form';

export interface CheckBoxProps {
	className?: string;
	checkView?: 'checked' | 'square';
	title: string;
	setCheck: (value: boolean) => void;
	checked: boolean;
	name: string;
	onChange?: ChangeHandler;
	onBlur?: ChangeHandler;
	ref?: React.Ref<any>;
}
