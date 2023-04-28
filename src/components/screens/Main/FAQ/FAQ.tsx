import s from './faq.module.scss';
import Image from 'next/image';
import { useState } from 'react';
import FAQItem from './FAQItem/FAQItem';
import { useAppSelector } from '@/redux/hooks';
import { STRAPI_API_URL } from '@/services';


const FAQ = (): JSX.Element => {
    const [activeItem, setActiveItem] = useState<number | null>(0);
    const { fields, image, title } = useAppSelector(store => store.strapiValues.faq);
    const fieldArr = fields.map(field => {
        const obj = {
            id: field.id.toString(),
            text: field.area.map(text => text),
            title: field.title,
        }
        return obj;
    });

    const handleActive = (index: number) => {
        if (index == activeItem) {
            return setActiveItem(null);
        }
        setActiveItem(index)
    }

    return (
			<div className="container" id="faq">
				<div className={s.faq}>
					<h3 className={s.faq_title}>{title}</h3>
					<div className={s.faq_img}>
						<Image
							src={STRAPI_API_URL + image.data?.attributes.url}
							width={image.data?.attributes.width}
							height={image.data?.attributes.height}
							alt="girl photo"
							quality={100}
						/>
					</div>
					<div className={s.faq_items}>
						{fieldArr.map((item, i) => {
							return (
								<FAQItem
									key={item.id}
									{...item}
									isOpen={activeItem === i}
									onClick={() => handleActive(i)}
								/>
							);
						})}
					</div>
				</div>
			</div>
		);
}

export default FAQ;