import React from 'react'
import s from './Item.module.scss'
import Image from 'next/image';
//ings
import openItem from '../../../../../assets/images/main/FAQ/open_item.svg'
import close_item from '../../../../../assets/images/main/FAQ/close_item.svg'

interface ItemProps {
    activeId: number
    onClickAnswer: (n: number) => void
    question: string,
    answer: string
    id: number
}

const Item: React.FC<ItemProps> = ({ onClickAnswer, activeId, question, answer, id }) => {
    return (
        <div onClick={() => onClickAnswer(activeId !== id ? id : -1)} className={s.wrapper}>
            <div id={`${id}`} className={s.question}>
                <span className={s.question_item}>{question}</span>
                <Image className={id !== activeId ? `${s.question_toggle} ${s.answer_open}` : `${s.question_toggle} ${s.answer_close}`} src={openItem} alt='photo' />
                <Image className={activeId !== id ? `${s.question_toggle} ${s.answer_close}` : `${s.question_toggle} ${s.answer_open}`} src={close_item} alt='photo' />
            </div>
            <div className={activeId === id ? `${s.answer} ${s.answer_open} ` : `${s.answer} ${s.answer_close} `}>
                {answer}
            </div>
        </div>
    )
}

export default Item;