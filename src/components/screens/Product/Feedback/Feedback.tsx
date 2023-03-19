import Link from 'next/link';
import React from 'react';
import Button from '../../Main/Button/Button';
import s from './feedback.module.scss';


const Feedback = () => {
    return (
        <div className='container'>
            <div className={s.feedback}>
                <h2>Желаете оставить отзыв?</h2>
                <p>Мы будем Вам очень благодарны, если Вы оставите нам отзыв об нашем сервисе, и нашей одежде</p>
                <Link href={'#'}> <Button color='black' arrow={false}>Оставить отзыв</Button></Link>
            </div>
        </div>
    );
};

export default Feedback;