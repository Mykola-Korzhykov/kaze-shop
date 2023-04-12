import React, { useState } from 'react';
import { FormLoadStatus } from '@/types/singleProduct';
import s from './StepOne.module.scss';
import Input from '../Input/Input';
import InputPhone from '../InputPhone/InputPhone';
import CheckBox from '../CheckBox/CheckBox';
import Button from '../../Main/Button/Button';
import FormSpinner from '../FormSpinner/FormSpinner';
import { motion, AnimatePresence } from "framer-motion"
import { StepOneProps } from './StepOne.interface';
import cn from 'classnames';
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { OrderFormStepOne, OrderFormStepOneData } from '@/utils/validation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { stepOneLoaded, stepOneSuccess } from '@/redux/slices/order';



const StepOne = ({ className, ...props }: StepOneProps): JSX.Element => {
    const [otherPerson, setOtherPerson] = useState<boolean>(false);
    const status = useAppSelector(store => store.order.stepOne);
    const dispatch = useAppDispatch();
    const { register, handleSubmit, control, formState: { errors, isValid } } = useForm<OrderFormStepOneData>({
        mode: 'onBlur',
        resolver: yupResolver(OrderFormStepOne),
    });


    const onSubmit: SubmitHandler<OrderFormStepOneData> = data => {
        dispatch(stepOneLoaded());
        console.log(data)
        setTimeout(() => {
            goStepTwo();
        }, 2000);
    };

    const goStepTwo = async () => {
        await new Promise<void>(res => {
            dispatch(stepOneSuccess());
            res();
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (


        <div
            className={cn(s.step_one, className)}
            {...props}>
            <AnimatePresence>
                {['idle', 'loading', 'error'].includes(status) && <motion.form
                    key={'step_one'}
                    initial={{ height: 'auto', opacity: 1 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0, transition: { duration: 0.5 } }}
                    onSubmit={handleSubmit(onSubmit)}>
                    <div className={s.name}>
                        <Input
                            placeholder='Введите Имя'
                            label='Имя'
                            name='userName'
                            {...register('userName')}
                            errorMessage={errors.userName?.message}
                        />
                        <Input
                            placeholder='Введите Фамилию'
                            label='Фамилия'
                            name='userSurname'
                            {...register('userSurname')}
                            errorMessage={errors.userSurname?.message}
                        />
                    </div>
                    <div className={s.contacts}>
                        <Controller
                            control={control}
                            name={'userPhoneNumber'}
                            render={({ field: { onChange, onBlur, value, ref } }) => (
                                <InputPhone
                                    placeholder='+38 (---) --- -- --'
                                    label='Номер телефона'
                                    country={['ua', 'rs']}
                                    masks={{ ua: '(..) ... .. ..', rs: '(..) ... .. ..' }}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    name={'userPhoneNumber'}
                                    ref={ref}
                                    errorMessage={errors.userPhoneNumber?.message} />
                            )}
                        />
                        <Input
                            placeholder='kazesport@gmail.com'
                            label='E-mail'
                            name='userEmail'
                            {...register('userEmail')}
                            errorMessage={errors.userEmail?.message} />
                    </div>

                    <CheckBox checkView='checked'
                        title='Получатель другой человек'
                        setCheck={setOtherPerson}
                        name='otherPerson'
                        checked={otherPerson}
                        {...register('otherPerson')}
                    />

                    <AnimatePresence>
                        {otherPerson && <motion.div
                            initial={{ opacity: 0, height: '0', marginTop: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginTop: 30, transition: { duration: 0.5 } }}
                            exit={{ opacity: 0, height: '0', marginTop: 0 }}
                            className={s.another_block}>

                            <Input
                                placeholder='Введите Имя'
                                label='Имя'
                                name='otherPersonName'
                                className={s.another_name}
                                {...register('otherPersonName')}
                                errorMessage={errors.otherPersonName?.message} />

                            <Input
                                placeholder='Введите Фамилию'
                                label='Фамилия'
                                name='otherPersonSurname'
                                className={s.another_surname}
                                {...register('otherPersonSurname')}
                                errorMessage={errors.otherPersonSurname?.message}
                            />

                            <Controller
                                control={control}
                                name={'otherPersonPhoneNumber'}
                                render={({ field }) => (
                                    <InputPhone
                                        placeholder='+38 (---)--- -- --'
                                        label='Номер телефона'
                                        country={['ua', 'rs']}
                                        masks={{ ua: '(..) ... .. ..', rs: '(..) ... .. ..' }}
                                        className={s.another_contacts}
                                        {...field}
                                        errorMessage={errors.otherPersonPhoneNumber?.message}
                                    />
                                )}
                            />


                        </motion.div>}
                    </AnimatePresence>
                    <Button className={cn(s.submit, {
                        [s.formInvalid]: !isValid
                    })} disabled={false} type='submit' arrow={false}>Продолжить</Button>
                    {status === 'loading' && <FormSpinner />}
                </motion.form>}

            </AnimatePresence>
        </div>


    );
};

export default StepOne;