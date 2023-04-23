import React from 'react';
//redux
import SpinnerLayout from '@/layouts/SpinnerLayout';
//icons
import findUser from '../../../assets/icons/cabinetAdmin/findUser.svg';
import { NextPage } from 'next';
import Link from 'next/link';
import { UsersRole } from '../../../components/screens/Cabinet/CabinetOwner/Display/UsersRole';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import s from './roleSettings.module.scss';
import { ModalSentForm } from '@/components/screens/Cabinet/CabinetOwner/Display/AddProduct/ModalSentForm';

const RoleSettings: NextPage = () => {
	// UserRole
	const sentProductForm = useSelector(
		(state: RootState) => state.modaleSlice.sentProductForm
	);
	const [innerHidth, setInnerHidth] = React.useState<number>(0);
	const refRoot = React.useRef(null);
	React.useEffect(() => {
		if (refRoot.current) {
			setInnerHidth(refRoot.current.clientHeight);
		}
	});

	return (
		<div ref={refRoot} className={s.content}>
			{sentProductForm.turn && (
				<div
					className={s.backround_for_modal}
					style={{ height: `${innerHidth + 380}px` }}
				></div>
			)}
			<SpinnerLayout>
				<main className="content">
					<div className="container">
						<div className="page_coordinator">
							<Link href="/cabinet">.../Личный кабинет | </Link>{' '}
							<span>Выдать роль</span>
						</div>

						{sentProductForm.turn && (
							<ModalSentForm
								title={sentProductForm.title}
								subtitle={sentProductForm.subtitle}
								btntitle={sentProductForm.btntitle}
							/>
						)}

						<UsersRole />
					</div>
				</main>
			</SpinnerLayout>
		</div>
	);
};

export default RoleSettings;
