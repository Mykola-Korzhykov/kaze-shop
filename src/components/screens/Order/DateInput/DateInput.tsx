import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import s from './DateInput.module.scss';
import { DateInputProps } from './DateInput.interface';
import cn from 'classnames';

const DateInput = React.forwardRef<any, DateInputProps>(({ title, placeholder, errorMessage, value, onChange, onBlur, name, className, }: DateInputProps, ref) => {

    return (

        <div className={cn(s.date, className)}
        >
            <h3>{title}</h3>
            <div className={s.date_wrapper}>
                <DatePicker
                    selected={value}
                    onChange={onChange}
                    minDate={subDays(new Date(), 0)}
                    maxDate={subDays(new Date(), -60)}
                    dateFormat='dd.MM.yy'
                    name={name}
                    onBlur={onBlur}
                    popperPlacement='bottom'
                    placeholderText={placeholder}
                    ref={ref}
                    className={cn(s.date_picker, {
                        [s.active]: value,
                        [s.error]: errorMessage
                    })}
                />

                <svg
                    className={cn(s.icon, {
                        [s.active]: value,
                        [s.error]: errorMessage
                    })}
                    width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.5 3.75006H4.5C4.08579 3.75006 3.75 4.08585 3.75 4.50006V19.5001C3.75 19.9143 4.08579 20.2501 4.5 20.2501H19.5C19.9142 20.2501 20.25 19.9143 20.25 19.5001V4.50006C20.25 4.08585 19.9142 3.75006 19.5 3.75006Z" stroke="#9D9D9D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16.5 2.25006V5.25006" stroke="#9D9D9D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7.5 2.25006V5.25006" stroke="#9D9D9D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3.75 8.25006H20.25" stroke="#9D9D9D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
            <span className={s.errorMessage}>{errorMessage}</span>
        </div>

    );
});

DateInput.displayName = 'DateInput';

const subDays = (date: Date, num: number): Date => {
    return new Date(date.getTime() - num * 24 * 60 * 60 * 1000);
}

export default DateInput;

