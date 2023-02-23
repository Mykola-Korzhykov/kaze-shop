import React from 'react'
import s from './FAQ.module.scss'
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Image from 'next/image';
import Item from '../Item'
import girlPhoto from '../../../../../assets/images/main/FAQ/girl.svg'



const FAQ = () => {

    const questionsArr = useSelector((state: RootState) => state.main.faqitems)

    // console.log('questionsArr', questionsArr)

    const [activeIndex, setActiveIndex] = React.useState(0)

    const onClickAnswer = (n: number) => {
        setActiveIndex(n)
    }

    return (
        <div className='container'>
            <div className={s.wrapper}>

                <div className={s.title}>
                    Часто задаваемые вопросы
                </div>
                <div className={s.content_wrapper}>
                    <div className={s.img_wrapper}>
                        {/* <Image className={s.img} src={girlPhoto} alt='photo' /> */}
                    </div>
                    <div className={s.question_wrapper}>
                        {questionsArr?.map((obj) => {
                            return <Item key={obj.id} activeId={activeIndex} onClickAnswer={onClickAnswer} id={obj.id} question={obj.question} answer={obj.answer} />
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
};


export default FAQ;