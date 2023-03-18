import { useState } from 'react';
import s from './colorItems.module.scss';
import cn from 'classnames';
import { ColorItemsInterface } from './ColorItems.interface';



const ColorItems = ({ colors }: ColorItemsInterface) => {
    const [activeElem, setActiveElem] = useState(0);

    return (
        <div className={s.colors}>
            {colors.map((el, i) => {
                return (
                    <div
                        key={i}
                        onClick={() => setActiveElem(i)}
                        className={cn({
                            [s.active]: activeElem === i
                        })}
                    >
                        <div style={{ background: el }}></div>
                    </div>
                )
            })}
        </div>
    );
};

export default ColorItems;