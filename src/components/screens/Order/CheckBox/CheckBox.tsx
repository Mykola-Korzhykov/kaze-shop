import React, { useCallback, useImperativeHandle, useRef, useState } from 'react';
import { CheckBoxProps } from './CheckBox.interface';
import cn from 'classnames';
import s from './Checkbox.module.scss'; 

const CheckBox = React.forwardRef<HTMLInputElement, CheckBoxProps>(({ className, name, setCheck, onChange, checkView = 'checked', title, checked = false }: CheckBoxProps, ref) => {
    const inputRef = useRef<null | HTMLInputElement>();

    useImperativeHandle(ref, () => inputRef.current);

    const checkedInput = () => {
        setCheck(inputRef.current.checked);
    };

    return (
        <div className={cn(s.checkbox, className)}
        >
            <label onClick={checkedInput}>
                <input ref={inputRef} type="checkbox" name={name} hidden onChange={onChange} />
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
                <h3 className={cn({
                    [s.active]: checked
                })}>{title}</h3>
            </label>
        </div>
    );
});

CheckBox.displayName = 'CheckBox';

export default CheckBox;