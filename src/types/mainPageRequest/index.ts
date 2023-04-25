import { Button, Image } from './about';
import { Field } from './faq';
import { Product } from './lastAddedProduct';
import { MainField } from './mainPage';
import { Reviews } from './reviews';

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

export type SlicesInitType = {
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
		clientReviews: Reviews[];
	};
	mainPage: null | {
		vertical_text_one: MainField;
		vertical_text_two: MainField;
		button: Button;
	};
};

export interface IndexPageProps {
	productSliderOne: Product[];
	productSliderTwo: Product[];
	lastAddedProduct: Product[];
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
		clientReviews: Reviews[];
	};
	mainPage: null | {
		vertical_text_one: MainField;
		vertical_text_two: MainField;
		button: Button;
	};
}

export interface MainProps {
	productSliderOne: Product[];
	productSliderTwo: Product[];
	lastAddedProduct: Product[];
}
