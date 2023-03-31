import { useState } from 'react';
import s from './colorItems.module.scss';
import cn from 'classnames';
import { ColorItemsInterface } from './ColorItems.interface';



const ColorItems = ({ colors, activeColor, setColor }: ColorItemsInterface) => {

    return (
        <div className={s.colors}>
            {colors.map((el, i) => {
                return (
                    <div
                        key={i}
                        onClick={() => setColor(i)}
                        className={cn({
                            [s.active]: activeColor === i
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