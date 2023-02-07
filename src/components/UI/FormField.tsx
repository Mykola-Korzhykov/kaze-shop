import React, { FC } from 'react'
import { useFormContext } from 'react-hook-form'
import Image from 'next/image'
import hidenIcon from '../../assets/icons/EyeClosed.svg'
import showIcon from '../../assets/icons/show_eye.svg'
interface FormFieldProps {
	name: string
	label: string
	type: string
	placeholder: string
	className?: string
	isPassword?: boolean
}

const FormField: FC<FormFieldProps> = ({
	name,
	isPassword,
	type,
	label,
	placeholder,
	className,
}) => {
	const [passwordShown, setPasswordShown] = React.useState<boolean>(false)
	const [inputType, setInputType] = React.useState<'text' | 'password'>(
		'password'
	)
	const { register, formState } = useFormContext()

	const togglePasswordShown = () => {
		setPasswordShown(prev => !prev)
		if (inputType === 'text') {
			setInputType('password')
		} else {
			setInputType('text')
		}
	}
	return (
		<>
			<div className='auth_field'>
				<label className='auth_label' htmlFor={name}>
					{label}
				</label>
				<div className={`auth_input`}>
					<input
						placeholder={placeholder}
						type={isPassword ? inputType : type}
						className={`${formState.errors?.[name]?.message ? 'error_input' : ''}`}
						{...register(name)}
					/>
					{isPassword && (
						<div onClick={togglePasswordShown} className={`auth_hidden-icon ${!passwordShown ? 'hideIcon' : ''}`}>
							<Image
								src={passwordShown ? showIcon : hidenIcon}
								alt='show password icon'
								width={24}
								height={24}
							/>
						</div>
					)}
				</div>
				<span className='auth_error'>
					{formState.errors?.[name] && formState.errors?.[name]?.message + ''}
				</span>
			</div>
		</>
	)
}

export default FormField
