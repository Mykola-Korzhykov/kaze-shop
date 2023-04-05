import React from 'react';
import s from './Input.module.scss';
import { InputProps } from './Input.interface';
import cn from 'classnames';

const Input = ({ placeholder, name, label, errorMessage, type = 'text', className, ...props }: InputProps): JSX.Element => {
    return (
        <div className={s.wrapper}>
            <label htmlFor={name}>
                <span>{label}</span>
                <input
                    className={cn(s.input, className, {
                        [s.error]: errorMessage
                    })}
                    id={name}
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    {...props}
                />
            </label>
            <span className={cn(s.errorMessage, s.error)}>{errorMessage}</span>
        </div>
    );
};

export default Input;