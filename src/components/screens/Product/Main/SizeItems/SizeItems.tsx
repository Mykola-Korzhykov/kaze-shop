import s from './sizeItems.module.scss';
import cn from 'classnames';
import { useState } from 'react';
import { SizeItemsInterface } from './SizeItems.interface';


const SizeItems = ({ sizes }: SizeItemsInterface) => {
    const [activeElem, setActiveElem] = useState(0);
    return (
        <div className={s.sizes}>
            {sizes.map((item, i) => {
                return (
                    <div key={i}
                        className={cn({ [s.active]: activeElem === i })}
                        onClick={() => setActiveElem(i)}>
                        {item}
                    </div>
                )
            })}
        </div>
    );
};



export default SizeItems;