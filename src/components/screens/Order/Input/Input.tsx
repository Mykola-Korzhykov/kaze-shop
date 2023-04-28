import React, { useState } from 'react';
import s from './Input.module.scss';
import { InputProps } from './Input.interface';
import cn from 'classnames';

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			placeholder,
			name,
			label,
			errorMessage,
			type = 'text',
			onChange,
			onBlur,
			value,
			className,
			...props
		},
		ref
	): JSX.Element => {
		return (
			<div className={s.wrapper}>
				<label htmlFor={name}>
					<span>{label}</span>
					<input
						className={cn(s.input, className, {
							[s.error]: errorMessage,
							[s.noEmpty]: value,
						})}
						id={name}
						type={type}
						name={name}
						placeholder={placeholder}
						onChange={onChange}
						onBlur={onBlur}
						ref={ref}
						{...props}
					/>
				</label>
				<span className={cn(s.errorMessage, s.error)}>{errorMessage}</span>
			</div>
		);
	}
);

Input.displayName = 'Input';

export default Input;
