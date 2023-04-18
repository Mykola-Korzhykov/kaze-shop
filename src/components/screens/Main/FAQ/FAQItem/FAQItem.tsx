import React from 'react';
import { FAQItemInterface } from './FAQInterface.interface';
import s from './faqItem.module.scss';
import OpenIcon from '../../../../../assets/images/main/FAQ/open_item.svg';
import Image from 'next/image';
import cn from 'classnames';


const FAQItem = ({ text, title, isOpen, onClick, className, ...props }: FAQItemInterface): JSX.Element => {
    return (
        <div className={cn(s.item, className)} {...props}>
            <div className={cn(s.item_title, { [s.active]: isOpen })} onClick={onClick}>
                <h3>{title}</h3>
                <Image src={OpenIcon} alt='menu icon' />
            </div>
            <div className={cn(s.item_text, { [s.active]: isOpen })}>
                {text.map((item, i) => (
                    <p key={item.id}>
                        {item.text}
                    </p>
                ))}
            </div>
        </div>
    );
};



export default FAQItem;