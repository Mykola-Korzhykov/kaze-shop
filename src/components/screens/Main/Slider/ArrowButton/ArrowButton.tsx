import { ArrowButtonInterface } from "./ArrowButton.interface";
import s from './arrowButton.module.scss';

import cn from 'classnames';

const ArrowButton = ({ position= 'right', className, ...props }: ArrowButtonInterface): JSX.Element => {
    return (
        <button
            className={cn(s.arrow_button, className, {
                [s.left]: position === 'left',
                [s.right]: position === 'right',
                [s.up]: position === 'up',
                [s.down]: position === 'down'
            })}
            {...props}>
            <svg width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg" >
                <path d="M5 16H27" stroke="#757575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M18 7L27 16L18 25" stroke="#757575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </button>
    )
}

export default ArrowButton;