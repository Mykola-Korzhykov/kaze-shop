import s from './colorItems.module.scss';
import cn from 'classnames';
import { ColorItemsInterface } from './ColorItems.interface';



const ColorItems = ({ colors, activeColor, setColor, size = '43' }: ColorItemsInterface) => {

    return (
        <div className={s.colors}>
            {colors.map((el, i) => {
                return (
                    <div
                        key={i}
                        onClick={() => setColor?.(i)}
                        className={cn({
                            [s.active]: activeColor === i,
                            [s.cursor]: setColor
                        })}
                    >
                        <div className={cn({
                            [s.size43]: size === '43',
                            [s.size30]: size === '30',
                        })} style={{ background: el }}></div>
                    </div>
                )
            })}
        </div>
    );
};

export default ColorItems;