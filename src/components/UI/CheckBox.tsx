import Link from 'next/link';
import { Dispatch, FC, SetStateAction } from 'react';

type Props = {
    isChecked: boolean;
    text: string;
    setIsChecked: Dispatch<SetStateAction<boolean>>;
    linkText?: string;
    linkUrl?: string;
    customClass?: string;
}

const CheckBox: FC<Props> = ({isChecked, setIsChecked, text, linkText, linkUrl, customClass}) => {
    return (
        <div className={`checkbox ${customClass ? customClass : ''}`} data-checked={isChecked}>
            <div className="checkbox__icon" onClick={() => setIsChecked(!isChecked)}></div>
            <p className="checkbox__text">
                {text}
                 
                {(linkText && linkUrl) && 
                    <Link href={linkUrl} target="_blank" legacyBehavior>
                        <a className="checkbox__link" target="_blank">
                            {linkText}
                        </a>
                    </Link>}
            </p>
        </div>
    );
}

export default CheckBox;