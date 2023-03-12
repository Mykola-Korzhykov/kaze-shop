import { ToCartButtonInterface } from './ToCartButton.interface';
import cn from 'classnames';

import s from './toCartButton.module.scss';


const ToCartButton = ({ children, className, ...props }: ToCartButtonInterface): JSX.Element => {
    return (
        <button className={cn(s.to_cart, className)} {...props}>
            <span>{children}</span>
        </button>
    )
}

export default ToCartButton;