import s from "./About.module.scss";
import Image from "next/image";
import Button from "../Button/Button";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { STRAPI_API_URL } from "@/services";
import { AboutProps } from "./About.interface";
import cn from 'classnames';

const About = ({ className }: AboutProps): JSX.Element => {
    const { button, image, text, title } = useAppSelector(store => store.strapiValues.about);

    return (
			<div className="container">
				<div className={cn(s.about, className)} id="about">
					<div className={s.about_img}>
						<Image
							src={STRAPI_API_URL + image.data?.attributes.url}
							width={image.data?.attributes.width}
							height={image.data?.attributes.height}
							alt="woman"
							quality={100}
						/>
					</div>
					<div className={s.about_description}>
						<h2>{title}</h2>
						<p>{text}</p>
						<Link href={button.link} target="_blank">
							<Button className={s.instagram_btn}>{button.text}</Button>
						</Link>
					</div>
				</div>
			</div>
		);
};

export default About;
