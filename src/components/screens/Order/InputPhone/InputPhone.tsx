import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import s from './InputPhone.module.scss';
import React, { useState } from 'react';
import { InputPhoneProps } from './InputPhone.interface';
import cn from 'classnames';

const InputPhone = React.forwardRef<HTMLInputElement, InputPhoneProps>(({ placeholder, country, masks, value, label, onBlur, onChange, name, errorMessage, className }, ref): JSX.Element => {

    return (
        <div className={cn(s.wrapper, className)}>
            <label>
                <span className={s.span}>{label}</span>
                <PhoneInput
                    inputClass={cn(s.input, {
                        [s.error]: errorMessage,
                        [s.touched]: value,
                    })}
                    buttonClass={cn(s.box, {
                        [s.touched]: value,
                        [s.error]: errorMessage
                    })}
                    inputProps={{
                        name,
                        onBlur,
                        ref: ref ? ref : '',
                        onChange: onChange
                    }}
                    onlyCountries={country}
                    country={country[0]}
                    value={value}
                    masks={masks}
                    placeholder={placeholder}
                />
            </label>
            <span className={cn(s.errorMessage, s.error)}>{errorMessage}</span>
        </div>
    );
});

InputPhone.displayName = 'InputPhone';

export default InputPhone;