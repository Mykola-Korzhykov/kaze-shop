import Link from 'next/link';
import { RoutesPathInterface } from './RoutesPath.interface';
import s from './routesPath.module.scss';
import cn from 'classnames';




const RoutesPath = ({ className, categories, ...props }: RoutesPathInterface): JSX.Element => {


    return (
        <div className={cn(s.path, className)} {...props}>
            {categories.map(({ path, href }, i, arr) => {
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