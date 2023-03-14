import s from './faq.module.scss';
import Girl from '../../../../assets/images/main/FAQ/girl.png';
import Image from 'next/image';
import { useState } from 'react';
import FAQItem from './FAQItem/FAQItem';

const mokItemData = [
    {
        title: 'Как заказывать одежду на Вашем сайте',
        text: [
            'Lorem ipsum dolor sit amet consectetur. Aenean nisi in mauris id varius imperdiet vulputate sem vel. Turpis blandit eu sed nec aliquet eget id luctus viverra. Velit iaculis id ac massa eget purus etiam tincidunt morbi. Lectus phasellus tellus nunc egestas blandit suspendisse. Ante condimentum odio sit bibendum dui nunc',
            'Lorem ipsum dolor sit amet consectetur. Aenean nisi in mauris id varius imperdiet vulputate sem vel. Turpis blandit eu sed nec aliquet eget id luctus viverra. Velit iaculis id ac massa eget purus etiam tincidunt morbi. Lectus phasellus tellus nunc egestas blandit suspendisse. Ante condimentum odio sit bibendum dui nunc'
        ],
    },
    {
        title: 'Как заказывать одежду на Вашем сайте',
        text: [
            'Lorem ipsum dolor sit amet consectetur. Aenean nisi in mauris id varius imperdiet vulputate sem vel. Turpis blandit eu sed nec aliquet eget id luctus viverra. Velit iaculis id ac massa eget purus etiam tincidunt morbi. Lectus phasellus tellus nunc egestas blandit suspendisse. Ante condimentum odio sit bibendum dui nunc',
        ]

    },
    {
        title: 'Как заказывать одежду на Вашем сайте',
        text: [
            'Lorem ipsum dolor sit amet consectetur. Aenean nisi in mauris id varius imperdiet vulputate sem vel. Turpis blandit eu sed nec aliquet eget id luctus viverra. Velit iaculis id ac massa eget purus etiam tincidunt morbi. Lectus phasellus tellus nunc egestas blandit suspendisse. Ante condimentum odio sit bibendum dui nunc'
        ],
    },
    {
        title: 'Как заказывать одежду на Вашем сайте',
        text: [
            'Lorem ipsum dolor sit amet consectetur. Aenean nisi in mauris id varius imperdiet vulputate sem vel. Turpis blandit eu sed nec aliquet eget id luctus viverra. Velit iaculis id ac massa eget purus etiam tincidunt morbi. Lectus phasellus tellus nunc egestas blandit suspendisse. Ante condimentum odio sit bibendum dui nunc'
        ],
    }
]
const FAQ = (): JSX.Element => {
    const [activeItem, setActiveItem] = useState<number | null>(0);
    const handleActive = (index: number) => {
        if (index == activeItem) {
            return setActiveItem(null);
        }
        setActiveItem(index)
    }

    return (
        <div className="container">
            <div className={s.faq}>
                <h3 className={s.faq_title}>
                    Часто задаваемые вопросы
                </h3>
                <div className={s.faq_img}>
                    <Image src={Girl} alt='girl photo' />
                </div>
                <div className={s.faq_items}>
                    {mokItemData.map((item, i) => {
                        return (
                            <FAQItem key={i} {...item} isOpen={activeItem === i} onClick={() => handleActive(i)} />
                        )
                    })}
                </div>
            </div>

        </div>
    )
}

export default FAQ;