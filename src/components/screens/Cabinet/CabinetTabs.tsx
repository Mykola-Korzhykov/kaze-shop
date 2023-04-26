import React, { FC, useEffect } from 'react';
import cl from '../../../styles/cabinet2.module.scss';
import ChangeUserInfo from '@/components/UserCabinet/ChangeUserInfo/ChangeUserInfo';
import ChangeUserPassword from '@/components/UserCabinet/ChangeUserPassword/ChangeUserPassword';
import SavedProducts from '@/components/UserCabinet/SavedProducts/SavedProducts';
import OrderHisrtory from '@/components/UserCabinet/OrderHistory/OrderHistory';
import LogoutModal from '@/components/modals/LogoutModal/LogoutModal';
import ForgottenBaskets from '@/components/UserCabinet/ForgottenBaskets/ForgottenBaskets';
import RecentlyWatchedProducts from '@/components/UserCabinet/RecentlyWatchedProducts/RecentlyWatchedProducts';
import ErrorMessage from '../Order/ErrorMessage/ErrorMessage';
import ProductsPagination from '@/components/UserCabinet/ProductsPagination';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
	getUserLeftCarts,
	getUserOrders,
	getUserSavedProducts,
	getUserWatchedProducts,
	setIsSavedProductsTab,
} from '@/redux/slices/user';
import CabinetOrdersModal from '@/components/UserCabinet/CabinetOrdersModal/CabinetOrdersModal';

const TABS = [
	{
		label: 'Изменить данные',
		id: 'vcxzzZZd22rfF@!',
		tabIndex: 1,
		iconCls: 'pencil',
	},
	{
		label: 'Изменить пароль',
		id: 'r23r2fdsdfsdf',
		tabIndex: 2,
		iconCls: 'change',
	},
	{
		label: 'История заказов',
		id: 'rwerwerwe',
		tabIndex: 3,
		iconCls: 'history',
	},
	{
		label: 'Закладки',
		id: 'feewrwefwef',
		tabIndex: 4,
		iconCls: 'bookmarks',
	},
	{
		label: 'Собранные корзины',
		id: 'vfdwee323rwrwer',
		tabIndex: 5,
		iconCls: 'baskets',
	},
	{
		label: 'Смотрели раньше',
		id: ',bvmcvmbcm43534',
		tabIndex: 6,
		iconCls: 'eye',
	},
	{
		label: 'Выход',
		id: 'cvbcvbe43t2grfddf',
		tabIndex: 7,
		iconCls: 'logout',
	},
];

const CabinetTabs: FC = () => {
	const [selectedTab, setSelectedTab] = React.useState<number | null>(1);
	const [showModal, setShowModal] = React.useState<boolean>(false);
	const [showErrorModal, setErrorShowModal] = React.useState<boolean>(false);
	const page = useAppSelector((state) => state.user.page);
	const loadingStatus = useAppSelector((state) => state.user.loadingStatus);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (selectedTab === 3) {
			dispatch(getUserOrders());
		}
		if (selectedTab === 4) {
			dispatch(setIsSavedProductsTab(true));
			dispatch(getUserSavedProducts());
		}

		if (selectedTab === 5) {
			dispatch(getUserLeftCarts());
		}
		if (selectedTab === 6) {
			dispatch(setIsSavedProductsTab(false));
			dispatch(getUserWatchedProducts());
		}
	}, [page]);

	const toggleTab = (e: React.MouseEvent<HTMLButtonElement>) => {
		const tabIndex = (e.target as HTMLButtonElement).getAttribute(
			'data-tabindex'
		);
		if (tabIndex === '3') {
			dispatch(getUserOrders());
		}
		if (tabIndex === '4') {
			dispatch(setIsSavedProductsTab(true));
			dispatch(getUserSavedProducts());
		}
		if (tabIndex === '5') {
			dispatch(getUserLeftCarts());
		}
		if (tabIndex === '6') {
			dispatch(setIsSavedProductsTab(false));
			dispatch(getUserWatchedProducts());
		}

		const tabNumber = tabIndex || 1;
		setSelectedTab(+tabNumber);

		const elX = e.clientX;
		//e.currentTarget.offsetTop + e.currentTarget.offsetHeight;
		window.scrollTo({ top: elX / 10, behavior: 'smooth' });
	};

	const renderTabsContent = () => {
		switch (selectedTab) {
			case 1:
				return <ChangeUserInfo />;
			case 2:
				return <ChangeUserPassword />;
			case 3:
				return <OrderHisrtory setShowModal={setShowModal} />;
			case 4:
				return <SavedProducts />;
			case 5:
				return <ForgottenBaskets setShowModal={setShowModal} />;
			case 6:
				return <RecentlyWatchedProducts />;
			case 7:
				return <LogoutModal closeModal={setSelectedTab} />;
			default:
				return null;
		}
	};
	const closeErrorModal = () => {
		setErrorShowModal(false);
	};
	return (
		<>
			{loadingStatus === 'error' || showErrorModal ? (
				<ErrorMessage closeError={closeErrorModal} />
			) : null}
			{showModal && (
				<CabinetOrdersModal
					ordersTabActive={selectedTab === 3 ? true : false}
					setShowModal={setShowModal}
				/>
			)}
			<div className={cl.cabinet_contentWrapper}>
				<div className={cl.cabinet_tabs}>
					{TABS.map((el) => {
						return (
							<div key={el.id} className={cl.cabinet_tab}>
								<button
									data-tabindex={el.tabIndex}
									className={
										el.tabIndex === selectedTab
											? `${cl.cabinet_tablink_active} ${cl.cabinet_tablink}`
											: cl.cabinet_tablink
									}
									onClick={toggleTab}
								>
									<span
										className={`${cl.cabinet_icon} ${
											cl[`cabinet_icon_${el.iconCls}`]
										}`}
									></span>
									{el.label}
								</button>
								<div className={cl.cabinet_navContent}>
									{el.tabIndex === selectedTab && renderTabsContent()}
								</div>
							</div>
						);
					})}
				</div>

				<div className={cl.cabinet_content}>
					<>
						{renderTabsContent()}
						{selectedTab !== 1 && selectedTab !== 2 ? (
							<ProductsPagination />
						) : null}
					</>
				</div>
			</div>
		</>
	);
};

export default CabinetTabs;
