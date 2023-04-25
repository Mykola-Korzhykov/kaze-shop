import React from 'react';
import s from './EmptyReviewSlideMessage.module.scss';
import { EmptyReviewSlideMessageProps } from './EmptyReviewSlideMessage.interface';

const EmptyReviewSlideMessage = ({ children }: EmptyReviewSlideMessageProps) => {
    return (
        <div className={s.empty}>
            <h2>{children}</h2>
        </div>
    );
};

export default EmptyReviewSlideMessage;