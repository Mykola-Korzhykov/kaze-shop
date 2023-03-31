import s from './sizeItems.module.scss';
import cn from 'classnames';
import { useState } from 'react';
import { SizeItemsInterface } from './SizeItems.interface';


const SizeItems = ({ sizes, setSize, activeSize }: SizeItemsInterface) => {

    return (
        <div className={s.sizes}>
            {sizes.map((item, i) => {
                return (
                    <div key={i}
                        className={cn({ [s.active]: activeSize === i })}
                        onClick={() => setSize(i)}>
                        {item}
                    </div>
                )
            })}
        </div>
    );
};



export default SizeItems;