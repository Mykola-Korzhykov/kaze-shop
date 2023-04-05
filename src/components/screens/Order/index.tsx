import React from 'react';
import Input from './Input/Input';
import s from './Order.module.scss';
import InputPhone from './InputPhone/InputPhone';

const Order = (): JSX.Element => {
    return (
        <div className={s.order}>
            <Input name={'name'}
                label={'Имя'}
                placeholder={'Введите Имя'}
                type={'text'}
                errorMessage=''
            />
            <InputPhone country={['ua', 'rs']} masks={undefined} placeholder={'(---) --- -- --'} label={'Номер телефона'} />
        </div>
    );
};

export default Order;