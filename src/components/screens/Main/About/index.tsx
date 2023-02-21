import React from 'react';
import s from './About.module.scss'
import Image from 'next/image';
//imgs
import girlPhoto from '../../../../assets/images/main/About/girl.svg'
import arrow from '../../../../assets/images/main/ArrowRightForButton.svg'
import { link } from 'fs';
//components 



const About = () => {

    return (
        <div className={s.container}>
            <div className={s.wrapper}>

                <div className={s.img_wrapper}>
                    <Image className={s.img} src={girlPhoto} alt={`img`} />
                </div>
                <div className={s.description_wrapper}>
                    <div className={s.title}>Kaze sport</div>
                    <div className={s.description}>
                        Lorem ipsum dolor sit amet consectetur. Aenean nisi
                        in mauris id varius imperdiet vulputate sem vel.
                        Turpis blandit eu sed nec aliquet eget id luctus viverra.
                        Velit iaculis id ac massa eget purus etiam tincidunt morbi.
                        Lectus phasellus tellus nunc egestas blandit suspendisse.
                        Ante condimentum odio sit bibendum dui nunc.
                        Nibh egestas ac sed duis elementum odio enim.
                        A suspendisse lorem sagittis arcu dui senectus auctor
                        pellentesque arcu. Turpis eu nisl egestas ut ipsum lacus posuere.
                        Ut justo dictum lacus sed eget id. Viverra leo lectus porta convallis aliquam.
                        Tincidunt tempus non egestas proin eget.
                    </div>
                    <a className={s.link} href="#">
                        <div className={s.btn}>

                            <span className={s.btn_title}>Мы в инстаграм</span>
                            <span className={s.btn_arrow}>
                                <Image src={arrow} alt={`img`} />
                            </span>


                        </div>
                    </a>

                </div>

            </div>
        </div>
    );
}

export default About