import s from "./About.module.scss";
import woman from "../../../../assets/images/main/About/girl.png";

import Image from "next/image";
import Button from "../Button/Button";
import Link from "next/link";

const About = (): JSX.Element => {
    return (
        <div className="container">
            <div className={s.about}>
                <div className={s.about_img}>
                    <Image src={woman} alt="woman" />
                </div>
                <div className={s.about_description}>
                    <h2>Kaze sport</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur. Aenean nisi in
                        mauris id varius imperdiet vulputate sem vel. Turpis
                        blandit eu sed nec aliquet eget id luctus viverra. Velit
                        iaculis id ac massa eget purus etiam tincidunt morbi.
                        Lectus phasellus tellus nunc egestas blandit
                        suspendisse. Ante condimentum odio sit bibendum dui
                        nunc. Nibh egestas ac sed duis elementum odio enim
                    </p>
                    <Link href="#">
                        <Button className={s.instagram_btn}>Мы в инстаграм</Button>
                    </Link>
                    
                </div>
            </div>
        </div>
    );
};

export default About;
