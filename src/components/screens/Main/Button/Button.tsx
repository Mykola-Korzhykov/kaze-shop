import { ToCartButtonInterface } from "./Button.interface";
import ArrowWhite from '../../../../assets/images/main/ArrowRightWhite.svg'

import s from './button.module.scss';
import Image from "next/image";
import cn from "classnames";

const Button = ({ children, className, arrow = true, color = 'black', ...props }: ToCartButtonInterface): JSX.Element => {
    return (
        <button className={cn(s.button, className, {
            [s.black]: color === 'black',
            [s.transparent]: color === 'transparent'
        })}
            {...props}>
            <span>{children}</span>
            {arrow && <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 16H27" stroke="#0B0B0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M18 7L27 16L18 25" stroke="#0B0B0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>}
        </button>
    )
}

export default Button;