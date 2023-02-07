import * as yup from 'yup'

export const LoginFormSchema = yup.object().shape({
	email: yup
		.string()
		.required('Почта обязательная')
		.matches(
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			'Inccorrect email'
		),
	password: yup
		.string()
		.required('Пароль обязательный')
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
			'Пароль должен содержать не менее 8 символов, один в верхнем регистре, один в нижнем регистре, одну цифру и один специальный регистр'
		),
})

export const RegisterFormSchema = yup
	.object()
	.shape({
		name: yup
			.string()
			.required('Name required')
			.min(2, 'Minimum 2 symbols')
			.matches(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/, 'Use only words'),
		surname: yup
			.string()
			.required('Surname required')
			.min(2, 'Minimum 2 symbols')
			.matches(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/, 'Use only words'),

		confirmPassword: yup
			.string()
			.oneOf([yup.ref('password'), null], 'Passwords must match'),
	})
	.concat(LoginFormSchema)

export const ChangeUserInfoShema = yup.object().shape({
	name: yup.string().required('Name required').min(2, 'Minimum 2 symbols'),
	surname: yup
		.string()
		.required('Surname required')
		.min(2, 'Minimum 2 symbols')
		.matches(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/, 'Use only words'),
	country: yup
		.string()
		.required('Country required')
		.min(2, 'Minimum 2 symbols')
		.matches(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/, 'Use only words'),
	city: yup
		.string()
		.required('City required')
		.min(2, 'Minimum 2 symbols')
		.matches(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/, 'Use only words'),
	postOffice: yup
		.string()
		.required('Post office required')
		.min(2, 'Minimum 2 symbols')
		.matches(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/, 'Use only words'),
})

export const ChangeUserPasswordShema = yup.object().shape({
	password: yup
		.string()
		.required('Пароль обязательный')
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
			'Пароль должен содержать не менее 8 символов, один в верхнем регистре, один в нижнем регистре, одну цифру и один специальный регистр'
		),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Passwords must match'),
})

export const ForgotPasswordSchema = yup
	.object()
	.shape({
		code: yup
			.string()
			.required('required')
			.matches(/^[0-9]+$/, 'Must be only digits')
			.min(8, 'Must be exactly 8 digits')
			.max(8, 'Must be exactly 8 digits'),
	})
	.concat(ChangeUserPasswordShema)

export const GetForgotPasswordCodeSchema = yup.object().shape({
	email: yup
		.string()
		.required('Почта обязательная')
		.matches(
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			'Inccorrect email'
		),
})
