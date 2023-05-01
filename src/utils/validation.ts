import * as yup from 'yup';

export const LoginFormSchema = yup.object().shape({
	email: yup
		.string()
		.required('email_required')
		.matches(
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			'email_validation'
		),
	password: yup
		.string()
		.required('pass_required')
		.matches(
			/(?=.*[0-9])(?=.*[a-z])[0-9a-zA-Z!@#.$%^&*]{8,}/g,
			'pass_validation'
		),
});

export const RegisterFormSchema = yup
	.object()
	.shape({
		name: yup
			.string()
			.required('name_required')
			.min(2, 'min2symb')
			.matches(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/, 'onlyLetters'),
		surname: yup
			.string()
			.required('surname_required')
			.min(2, 'min2symb')
			.matches(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/, 'onlyLetters'),

		confirmPassword: yup
			.string()
			.oneOf([yup.ref('password'), null], 'repeat_pass_validation'),
	})
	.concat(LoginFormSchema);

export const ChangeUserInfoShema = yup.object().shape({
	name: yup
		.string()
		.required('name_required')
		.min(2, 'min2symb')
		.matches(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/, 'onlyLetters'),
	surname: yup
		.string()
		.required('surname_required')
		.min(2, 'min2symb')
		.matches(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/, 'onlyLetters'),
	country: yup
		.string()
		.required('required')
		.min(2, 'min2symb')
		.matches(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/, 'onlyLetters'),
	city: yup
		.string()
		.required('required')
		.min(2, 'min2symb')
		.matches(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/, 'onlyLetters'),
	postOffice: yup
		.string()
		.required('required')
		.min(2, 'min2symb')
		.matches(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/, 'onlyLetters'),
});

export const ChangeUserPasswordShema = yup.object().shape({
	password: yup
		.string()
		.required('pass_required')
		.matches(
			/(?=.*[0-9])(?=.*[a-z])[0-9a-zA-Z!@#.$%^&*]{8,}/g,
			'pass_validation'
		),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password'), null], 'repeat_pass_validation'),
});

export const ForgotPasswordSchema = yup
	.object()
	.shape({
		code: yup
			.string()
			.required('code_validation')
			.matches(/^[0-9]+$/, 'code_validation2')
			.min(8, 'code_validation2')
			.max(8, 'code_validation2'),
	})
	.concat(ChangeUserPasswordShema);

export const GetForgotPasswordCodeSchema = yup.object().shape({
	email: yup
		.string()
		.required('email_required')
		.matches(
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			'email_validation'
		),
});

export const FeedbackFormSchema = yup.object().shape({
	name: yup.string().required('name_required'),
	surname: yup.string().required('surname_required'),
	review: yup.string().required('required'),
});

export const OrderFormStepOne = yup.object({
	userName: yup.string().min(2, 'min2symb').max(25, 'max25symb'),
	userSurname: yup.string().min(2, 'min2symb').max(25, 'max25symb'),
	userEmail: yup
		.string()
		.email('email_validation')
		.min(6, 'min6symb')
		.max(30, 'max30symb')
		.matches(
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			'email_validation'
		),
	userPhoneNumber: yup.string().min(12, 'invalid_phone'),
	otherPerson: yup.boolean(),
	otherPersonName: yup.string().when('otherPerson', {
		is: true,
		then: yup.string().min(2, 'min2symb').max(25, 'max25symb'),
	}),
	otherPersonSurname: yup.string().when('otherPerson', {
		is: true,
		then: yup.string().min(2, 'min2symb').max(25, 'max25symb'),
	}),
	otherPersonPhoneNumber: yup.string().when('otherPerson', {
		is: true,
		then: yup.string().min(12, 'invalid_phone'),
	}),
});

export type OrderFormStepOneData = yup.InferType<typeof OrderFormStepOne>;

export const OrderFormStepTwo = yup.object({
	country: yup.string().min(3, 'min3symb').max(25, 'max25symb'),
	city: yup.string().min(3, 'min3symb').max(25, 'max25symb'),
	сourierDelivery: yup.boolean(),
	postOffice: yup.string().when('сourierDelivery', {
		is: false,
		then: yup
			.string()
			.min(2, 'min1symb')
			.max(15, 'max15symb')
			.matches(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,50}/, 'invalid value'),
	}),
	street: yup.string().when('сourierDelivery', {
		is: true,
		then: yup.string().min(5, 'min5symb').max(25, 'max25symb'),
	}),
	house: yup.string().when('сourierDelivery', {
		is: true,
		then: yup.string().min(1, 'min1symb').max(10, 'max10symb'),
	}),
	apartment: yup.string().when('сourierDelivery', {
		is: true,
		then: yup.string().min(1, 'min1symb').max(10, 'max10symb'),
	}),
	anotherDate: yup.boolean(),
	sendDate: yup
		.date()
		.typeError('enter the date')
		.nullable()
		.default(null)
		.when('anotherDate', {
			is: true,
			then: yup.date().typeError('enter the date').required('required'),
		}),
	payInCash: yup.boolean(),
	comment: yup.string().max(100, 'max100symb'),
});

export type OrderFormStepTwoData = yup.InferType<typeof OrderFormStepTwo>;
