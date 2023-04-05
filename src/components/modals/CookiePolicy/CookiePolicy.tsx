import React, { FC } from 'react';
import s from './CookiePolicy.module.scss';
const CookiePolicy: FC<{ setCookiePolicyState: (state: boolean) => void }> = ({
	setCookiePolicyState,
}) => {
	const changeAllowCookieStatus = () => {
		setCookiePolicyState(true);
		localStorage.setItem('allowCookie', JSON.stringify(true));
	};
	return (
		<div className={s.cookie_modal}>
			<div className={s.cookie_body}>
				<h3 className={s.cookie_title}>Cookie Policy</h3>
				<p className={s.cookie_descr}>
					Lorem ipsum dolor sit amet consectetur. Volutpat placerat elit magna
					justo eu aliquam. Porttitor at purus urna aenean. Accumsan velit
					vulputate facilisis scelerisque blandit volutpat vel tempus. Fringilla
					dui sed tortor proin. Commodo molestie rutrum aliquam commodo cursus
					integer feugiat arcu et. Tortor accumsan habitant ac felis donec. Elit
					porttitor tempor malesuada ac mauris ut in nunc nunc. Lobortis morbi
					tellus pretium massa risus egestas pretium magna laoreet. Integer id
					habitant mauris cursus neque diam quis.{' '}
				</p>
				<button onClick={changeAllowCookieStatus} className={s.cookie_btn}>
					Принять
				</button>
			</div>
		</div>
	);
};

export default CookiePolicy;
