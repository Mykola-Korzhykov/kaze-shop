import { Button } from '../components/screens/Cabinet/CabinetOwner/Buttons/Button';
export type LoginDto = {
	email: string;
	password: string;
};

export type CreateUserDto = {
	name: string;
	surname: string;
	phoneNumber: string;
	confirmPassword: string;
} & LoginDto;

export type User = {
	id: number;
	name: string;
	surname: string;
	phoneNumber: string;
	email: string;
	country?: string | null;
	city?: string | null;
	postOffice?: string | null;
	type?: 'OWNER' | 'USER' | 'ADMIN';
};

export type Owner = {
	id: number;
	name: string;
	surname: string;
	phoneNumber: string;
	email: string;
};

export type Admin = {
	id: number;
	name: string;
	surname: string;
	phoneNumber: string;
	email: string;
};

export type AuthResponse = {
	type?: 'OWNER' | 'ADMIN' | 'USER';
	accessToken: string;
	maxAge: number;
	user?: User;
	owner?: Owner;
	admin?: Admin;
};

export type ChangeUserInfoDto = {
	name: string;
	surname: string;
	city: string;
	country: string;
	postOffice: string;
};

export type ChangeUserPasswordDto = {
	password: string;
	confirmPassword: string;
};

export type GetCodeDto = {
	email: string;
};

export type ForgotPasswordDto = {
	code: string;
	password: string;
	confirmPassword: string;
};

// button

export interface ButtonType {
	id: number;
	img_grey: string;
	img_white: string;
	text: string;
	url?: string;
	// chengeDisplayOK: (n: number) => void
}

//product

export interface Product {
	price: string;
	description: string;
	img: string;
	id: number;
}

// admin slice

export interface ProductSend {
	title: {
		ua: string | null;
		ru: string | null;
		rs: string | null;
		en: string | null;
	};
	description: {
		ua: string | null;
		ru: string | null;
		rs: string | null;
		en: string | null;
	};
	sizeChartImageDescription: {
		ua: string | null;
		ru: string | null;
		rs: string | null;
		en: string | null;
	};
	sizes: string[];
	colourId: number | null;
	price: number | null;
	quantity: number | null;
	imagesjpg: null | any;
	allcoloursId: number[] | null;
	allsizes: string[] | null;
	categories: number[] | null;
	netData: string | null;
	arrObjMod: { fileNames: string[]; colourId: number; sizes: string[] }[];
	//images: string [] | File []
	images: any[];
	id: number;
}
