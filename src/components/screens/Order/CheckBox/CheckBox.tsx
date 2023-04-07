import React, { useRef, useState } from 'react';
import { CheckBoxProps } from './CheckBox.interface';
import cn from 'classnames';
import s from './Checkbox.module.scss';

const CheckBox = ({ className, name, setCheck, checkView = 'checked', title, checked = false }: CheckBoxProps) => {
    const inputRef = useRef<null | HTMLInputElement>()
    const checkedInput = () => {
        inputRef.current.click();
        setCheck()
    }
    return (
        <div className={cn(s.checkbox, className)}
        >
            <label onClick={checkedInput}>
                <input ref={inputRef} type="checkbox" name={name} hidden />
                <div className={cn(s.check, {
                    [s.active]: checked
                })}
                >
                    {
                        checked &&
                        <b className={cn({
                            [s.checked]: checkView === 'checked',
                            [s.square]: checkView === 'square',
                        })}></b>
                    }
                </div>
                <h3>{title}</h3>
            </label>
        </div>
    );
};

export default CheckBox;