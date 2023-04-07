import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import s from './InputPhone.module.scss';
import React, { useState } from 'react';
import { InputPhoneProps } from './InputPhone.interface';
import cn from 'classnames';

const InputPhone = ({ placeholder, country, masks, label, errorMessage, className }: InputPhoneProps): JSX.Element => {
    const [value, setValue] = useState<string>();

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
                    onlyCountries={country}
                    country={country[0]}
                    value={value}
                    onChange={(e) => setValue(e)}
                    masks={masks}
                    placeholder={placeholder}
                />
            </label>
            <span className={s.error}>{errorMessage}</span>
        </div>
    );
};

export default InputPhone;