import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import s from './InputPhone.module.scss';
import React, { useState } from 'react';
import { InputPhoneProps } from './InputPhone.interface';

const InputPhone = ({ placeholder, country, masks, label, errorMessage }: InputPhoneProps): JSX.Element => {
    const [value, setValue] = useState<string>();
    return (
        <div className={s.wrapper}>
            <label>
                <span>{label}</span>
                <PhoneInput
                    onlyCountries={country}
                    country={country[0]}
                    value={value}
                    onChange={(e) => setValue(e)}
                    inputClass={s.input}
                    placeholder={placeholder}
                />
            </label>
            <span className={s.error}>{errorMessage}</span>
        </div>
    );
};

export default InputPhone;