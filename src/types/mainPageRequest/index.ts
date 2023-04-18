import { Button, Image } from './about';
import { Field } from './faq';
import { Field1 } from './footer';
import { MainField } from './mainPage';

export type HomeProps = {
	about: null | {
		button: Button;
		image: Image;
		text: string;
		title: string;
	};
	faq: null | {
		fields: Field[];
		image: Image;
		title: string;
	};
	footer: null | {
		field: Field1[];
	};
	logo: null | string;
	reviews: null | {
		image: Image;
		title: string;
	};
	mainPage: null | {
		vertical_text_one: MainField;
		vertical_text_two: MainField;
		button: Button;
	};
};
