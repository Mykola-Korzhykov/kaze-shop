export interface CheckBoxProps {
	className?: string;
	checkView?: 'checked' | 'square';
	title: string;
	setCheck: () => void;
	checked: boolean;
	name: string;
}
