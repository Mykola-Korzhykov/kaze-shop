import * as yup from 'yup';

export const LoginFormSchema = yup.object().shape({
	email: yup
		.string()
		.required('Почта обязательная')
		.matches(
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			'Неверный email'
		),
	password: yup
		.string()
		.required('Пароль обязательный')
		.matches(
			/(?=.*[0-9])(?=.*[a-z])[0-9a-zA-Z!@#.$%^&*]{8,}/g,
			'Пароль должен содержать не менее 8 символов и хотя бы одну цыфру'
		),
});

export const RegisterFormSchema = yup
	.object()
	.shape({
		name: yup
			.string()
			.required('Name required')
			.min(2, 'Minimum 2 symbols')
			.matches(
				/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/,
				'Используйте только слова'
			),
		surname: yup
			.string()
			.required('Surname required')
			.min(2, 'Minimum 2 symbols')
			.matches(
				/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/,
				'Используйте только слова'
			),

		confirmPassword: yup
			.string()
			.oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
	})
	.concat(LoginFormSchema);

export const ChangeUserInfoShema = yup.object().shape({
	name: yup
		.string()
		.required('Name required')
		.min(2, 'Minimum 2 symbols')
		.matches(
			/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/,
			'Используйте только слова'
		),
	surname: yup
		.string()
		.required('Surname required')
		.min(2, 'Minimum 2 symbols')
		.matches(
			/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/,
			'Используйте только слова'
		),
	country: yup
		.string()
		.required('Country required')
		.min(2, 'Minimum 2 symbols')
		.matches(
			/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/,
			'Используйте только слова'
		),
	city: yup
		.string()
		.required('City required')
		.min(2, 'Minimum 2 symbols')
		.matches(
			/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/,
			'Используйте только слова'
		),
	postOffice: yup
		.string()
		.required('Post office required')
		.min(2, 'Minimum 2 symbols')
		.matches(
			/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/,
			'Используйте только слова'
		),
});

export const ChangeUserPasswordShema = yup.object().shape({
	password: yup
		.string()
		.required('Пароль обязательный')
		.matches(
			/(?=.*[0-9])(?=.*[a-z])[0-9a-zA-Z!@#.$%^&*]{8,}/g,
			'Пароль должен содержать не менее 8 символов и хотя бы одну цыфру'
		),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
});

export const ForgotPasswordSchema = yup
	.object()
	.shape({
		code: yup
			.string()
			.required('required')
			.matches(/^[0-9]+$/, 'Должны быть только цыфри')
			.min(8, 'Должно быть только 8 цыфр')
			.max(8, 'Должно быть только 8 цыфр'),
	})
	.concat(ChangeUserPasswordShema);

export const GetForgotPasswordCodeSchema = yup.object().shape({
	email: yup
		.string()
		.required('Почта обязательная')
		.matches(
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			'Неверный email'
		),
});

export const FeedbackFormSchema = yup.object().shape({
	name: yup.string().required('Поле обязательное'),
	surname: yup.string().required('Поле обязательное'),
	review: yup.string().required('Поле обязательное'),
});

export const OrderFormStepOne = yup.object({
	userName: yup.string().min(2, 'min 2 charset').max(25, 'max 25 charset'),
	userSurname: yup.string().min(2, 'min 2 charset').max(25, 'max 25 charset'),
	userEmail: yup
		.string()
		.email('invalid email')
		.min(6, 'min 6 charset')
		.max(30, 'max 30 charset'),
	userPhoneNumber: yup.string().min(18, 'invalid phone'),
	otherPerson: yup.boolean(),
	otherPersonName: yup.string().when('otherPerson', {
		is: true,
		then: yup.string().min(2, 'min 2 charset').max(25, 'max 25 charset'),
	}),
	otherPersonSurname: yup.string().when('otherPerson', {
		is: true,
		then: yup.string().min(2, 'min 2 charset').max(25, 'max 25 charset'),
	}),
	otherPersonPhoneNumber: yup.string().when('otherPerson', {
		is: true,
		then: yup.string().min(18, 'invalid phone'),
	}),
});

export type OrderFormStepOneData = yup.InferType<typeof OrderFormStepOne>;

export const OrderFormStepTwo = yup.object({
	country: yup.string().min(3, 'min 3 charset').max(25, 'max 25 charset'),
	city: yup.string().min(3, 'min 3 charset').max(25, 'max 25 charset'),
	сourierDelivery: yup.boolean(),
	postOffice: yup.string().when('сourierDelivery', {
		is: false,
		then: yup.string().min(1, 'min 1 charset').max(15, 'max 15 charset'),
	}),
	street: yup.string().when('сourierDelivery', {
		is: true,
		then: yup.string().min(5, 'min 5 charset').max(25, 'max 25 charset'),
	}),
	house: yup.string().when('сourierDelivery', {
		is: true,
		then: yup.string().min(1, 'min 1 charset').max(10, 'max 10 charset'),
	}),
	apartment: yup.string().when('сourierDelivery', {
		is: true,
		then: yup.string().min(1, 'min 1 charset').max(10, 'max 10 charset'),
	}),
	anotherDate: yup.boolean(),
	sendDate: yup
		.date()
		.typeError('enter the date')
		.nullable()
		.default(null)
		.when('anotherDate', {
			is: true,
			then: yup
				.date()
				.typeError('enter the date')
				.required('is a required field'),
		}),
	payInCash: yup.boolean(),
	comment: yup.string().max(100, 'max 100 charset'),
});

export type OrderFormStepTwoData = yup.InferType<typeof OrderFormStepTwo>;
