import { ToCartButtonInterface } from "./Button.interface";
import ArrowWhite from '../../../../assets/images/main/ArrowRightWhite.svg'

import s from './button.module.scss';
import Image from "next/image";
import cn from "classnames";

const Button = ({ children, className, ...props }: ToCartButtonInterface): JSX.Element => {
    return (
        <button className={cn(s.button,className)}
            {...props}>
            <span>{children}</span>
            <Image src={ArrowWhite} alt='arrow' />
        </button>
    )
}

export default Button;