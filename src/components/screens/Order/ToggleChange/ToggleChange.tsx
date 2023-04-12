import React, { ReactEventHandler, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { ToggleChangeProps } from './ToggleChange.interface';
import s from './ToggleChange.module.scss';
import Button from '../../Main/Button/Button';
import cn from 'classnames';
import CheckBox from '../CheckBox/CheckBox';


const ToggleChange = React.forwardRef<HTMLInputElement, ToggleChangeProps>(({ title, buttonOneText, buttonTwoText, name, setActive, onChange, active, className, ...props }, ref) => {
    const inputRef = useRef<null | HTMLInputElement>();
    useImperativeHandle(ref, () => inputRef.current);


    const handleSetActive = () => {
        if (active) {
            return;
        }
        inputRef.current.click();
        setActive(true);
    }

    const handleSetDisabled = () => {
        if (active) {
            inputRef.current.click();
            setActive(false);
        }
    }


    return (
        <div className={cn(s.toggle, className)} {...props}>
            <h3 className={s.toggle_title}>{title}</h3>
            <div className={s.toggle_button}>

                <Button arrow={false}
                    type='button'
                    color={active ? 'transparent' : 'black'}
                    className={cn(s.button, {
                        [s.active]: !active
                    })}
                    onClick={handleSetDisabled}>
                    {buttonOneText}
                </Button>

                <Button
                    onClick={handleSetActive}
                    type='button'
                    className={cn(s.button, {
                        [s.active]: active
                    })}
                    arrow={false}
                    color={active ? 'black' : 'transparent'}>
                    {buttonTwoText}
                </Button>


            </div>
            <input type="checkbox" ref={inputRef} name={name} onChange={onChange} hidden />

            <div className={s.toggle_checkbox}>
                <CheckBox title={buttonOneText} checkView='square' name={name} setCheck={handleSetDisabled}
                    checked={!active} />
                <CheckBox title={buttonTwoText} checkView='square' name={name} checked={active} setCheck={handleSetActive} />
            </div>
        </div>
    );
});

ToggleChange.displayName = 'ToggleChange';

export default ToggleChange;