import React from 'react';
import s from './FromSpinner.module.scss';

const FormSpinner = () => {
    return (
        <div className={s.spinner}>
            <div className={s.mk_spinner_wrap} data-bis_skin_checked="1">
                <div className={s.mk_spinner_bubbles} data-bis_skin_checked="1"></div>
            </div>
        </div>
    );
};

export default FormSpinner;