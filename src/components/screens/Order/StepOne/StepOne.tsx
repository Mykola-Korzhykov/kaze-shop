import React, { useState } from 'react';
import s from './StepOne.module.scss';
import Input from '../Input/Input';
import InputPhone from '../InputPhone/InputPhone';
import CheckBox from '../CheckBox/CheckBox';
import Button from '../../Main/Button/Button';
import { motion, AnimatePresence } from "framer-motion"
import { StepOneProps } from './StepOne.interface';
import cn from 'classnames';

const StepOne = ({ className, ...props }: StepOneProps): JSX.Element => {
    const [another, setAnother] = useState<boolean>(false);

    return (
        <div className={cn(s.step_one, className)} {...props}>

            <form action="">
                <div className={s.name}>
                    <Input
                        placeholder='Введите Имя'
                        label='Имя'
                        name='name' />
                    <Input
                        placeholder='Введите Фамилию'
                        label='Фамилия'
                        name='surname' />
                </div>
                <div className={s.contacts}>
                    <InputPhone
                        placeholder='+38 (---) --- -- --'
                        label='Номер телефона'
                        country={['ua', 'rs']}
                        masks={{ ua: '(..) ... .. ..', rs: '(..) ... .. ..' }}
                    />
                    <Input
                        placeholder='kazesport@gmail.com'
                        label='E-mail'
                        name='email' />
                </div>

                <CheckBox checkView='checked' title='Получатель другой человек' name='another' checked={another} setCheck={() => setAnother(prev => !prev)} />
                <AnimatePresence>
                    {another && <motion.div
                        initial={{ opacity: 0, height: '0', marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 30, transition: { duration: 0.5 } }}
                        exit={{ opacity: 0, height: '0', marginTop: 0 }}
                        className={s.another_block}>

                        <Input
                            placeholder='Введите Имя'
                            label='Имя'
                            name='anotherName'
                            className={s.another_name} />
                        <Input
                            placeholder='Введите Фамилию'
                            label='Фамилия'
                            name='anotherSurname'
                            className={s.another_surname} />


                        <InputPhone
                            placeholder='+38 (---)--- -- --'
                            label='Номер телефона'
                            country={['ua', 'rs']}
                            masks={{ ua: '(..) ... .. ..', rs: '(..) ... .. ..' }}
                            className={s.another_contacts}
                        />

                    </motion.div>}
                </AnimatePresence>
                <Button className={s.submit} disabled={true} arrow={false}>Продолжить</Button>
            </form>
        </div>
    );
};

export default StepOne;