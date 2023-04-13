import React from 'react';
import { StepTitleProps } from './StepTitle.interface';
import cn from 'classnames';
import s from './StepTitle.module.scss';

const StepTitle = ({ className, step, title, active = false }: StepTitleProps) => {
    return (
        <div className={cn(s.step, className)}>
            <div className={cn(s.step_num, {
                [s.active]: active,
            })}>{step}</div>
            <h2>{title}</h2>
        </div>
    );
};

export default StepTitle;