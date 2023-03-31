import Link from 'next/link';
import { RoutesPathInterface } from './RoutesPath.interface';
import s from './routesPath.module.scss';
import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';



const test = [{ path: 'Главная', href: '/' }, { path: 'Каталог', href: '/catalog' }, { path: 'Лосины', href: '/test' }];

const RoutesPath = ({ className, ...props }: RoutesPathInterface): JSX.Element => {
    const miniPath = useRef(test);
    const [windowWidth, setWindowWidth] = useState<null | number>(null);


    useEffect(() => {

        function fn(): void {
            const width = window.innerWidth;
            if (width < 576) {
                miniPath.current = [{ href: '/', path: '...' }, ...test.slice(-2)];
            } else {
                miniPath.current = test;
            }
            setWindowWidth(width);
        }
        window.addEventListener('resize', fn)
        fn();
        return () => window.removeEventListener('resize', fn)

    }, [])
    return (
        <div className={cn(s.path, className)} {...props}>
            {miniPath.current.map(({ path, href }, i, arr) => {
                return (
                    <div key={i}>
                        {arr.length - 1 == i ? <b>{path}</b> : <Link href={href}>{path}</Link>}
                        <span>|</span>
                    </div>
                )
            })}
        </div>
    )
}

export default RoutesPath;