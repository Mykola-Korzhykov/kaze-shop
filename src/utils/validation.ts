import * as yup from 'yup'

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
})

export const RegisterFormSchema = yup
	.object()
	.shape({
		name: yup
			.string()
			.required('Name required')
			.min(2, 'Minimum 2 symbols')
			.matches(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/, 'Используйте только слова'),
		surname: yup
			.string()
			.required('Surname required')
			.min(2, 'Minimum 2 symbols')
			.matches(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/, 'Используйте только слова'),

		confirmPassword: yup
			.string()
			.oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
	})
	.concat(LoginFormSchema)

export const ChangeUserInfoShema = yup.object().shape({
	name: yup.string().required('Name required').min(2, 'Minimum 2 symbols'),
	surname: yup
		.string()
		.required('Surname required')
		.min(2, 'Minimum 2 symbols')
		.matches(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/, 'Используйте только слова'),
	country: yup
		.string()
		.required('Country required')
		.min(2, 'Minimum 2 symbols')
		.matches(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/, 'Используйте только слова'),
	city: yup
		.string()
		.required('City required')
		.min(2, 'Minimum 2 symbols')
		.matches(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/, 'Используйте только слова'),
	postOffice: yup
		.string()
		.required('Post office required')
		.min(2, 'Minimum 2 symbols')
		.matches(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/, 'Используйте только слова'),
})

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
})

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
	.concat(ChangeUserPasswordShema)

export const GetForgotPasswordCodeSchema = yup.object().shape({
	email: yup
		.string()
		.required('Почта обязательная')
		.matches(
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			'Неверный email'
		),
})
