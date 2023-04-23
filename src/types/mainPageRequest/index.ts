import { Button, Image } from './about';
import { Field } from './faq';
import { Field as footerField } from './footer';
import { Product } from './lastAddedProduct';
import { MainField } from './mainPage';

export type strapiValuesTypes = {
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

export interface IndexPageProps extends strapiValuesTypes, MainProps {}

export interface MainProps {
	productSliderOne: Product[];
	productSliderTwo: Product[];
	lastAddedProduct: Product[];
}
