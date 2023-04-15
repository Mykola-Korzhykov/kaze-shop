import React, { FC } from 'react';
import cl from '../../../styles/cabinet2.module.scss';
import ChangeUserInfo from '@/components/UserCabinet/ChangeUserInfo/ChangeUserInfo';
import ChangeUserPassword from '@/components/UserCabinet/ChangeUserPassword/ChangeUserPassword';
import SavedProducts from '@/components/UserCabinet/SavedProducts/SavedProducts';
import LogoutModal from '@/components/modals/LogoutModal/LogoutModal';
const CabinetTabs: FC = () => {
	const [selectedTab, setSelectedTab] = React.useState<number | null>(1);

	const toggleTab = (e: React.MouseEvent<HTMLButtonElement>) => {
		const tabIndex = (e.target as HTMLButtonElement).getAttribute(
			'data-tabindex'
		);

		const tabNumber = tabIndex || 1;
		setSelectedTab(+tabNumber);
		const elX = e.clientX;
		window.scrollTo({ top: elX / 10, behavior: 'smooth' });
	};

	const TABS = [
		{
			label: 'Изменить данные',
			id: 'vcxzzZZd22rfF@!',
			tabIndex: 1,
			iconCls: 'cl.cabinet_icon_eye',
		},
		{
			label: 'Изменить пароль',
			id: 'r23r2fdsdfsdf',
			tabIndex: 2,
			iconCls: 'cl.cabinet_icon_eye',
		},
		{
			label: 'История заказов',
			id: 'rwerwerwe',
			tabIndex: 3,
			iconCls: 'cl.cabinet_icon_eye',
		},
		{
			label: 'Закладки',
			id: 'feewrwefwef',
			tabIndex: 4,
			iconCls: 'cl.cabinet_icon_eye',
		},
		{
			label: 'Собранные корзины',
			id: 'vfdwee323rwrwer',
			tabIndex: 5,
			iconCls: 'cl.cabinet_icon_eye',
		},
		{
			label: 'Смотрели раньше',
			id: ',bvmcvmbcm43534',
			tabIndex: 6,
			iconCls: 'cl.cabinet_icon_eye',
		},
		{
			label: 'Выход',
			id: 'cvbcvbe43t2grfddf',
			tabIndex: 7,
			iconCls: 'cl.cabinet_icon_eye',
		},
	];

	const renderTabsContent = () => {
		switch (selectedTab) {
			case 1:
				return <ChangeUserInfo />;
			case 2:
				return <ChangeUserPassword />;
			case 4:
				return <SavedProducts />;
			case 7:
				return <LogoutModal closeModal={setSelectedTab} />;
			default:
				return null;
		}
	};
	return (
		<>
			{/* {selectedTab === 7 && <LogoutModal closeModal={setSelectedTab} />}
			<div className={cl.cabinet_tabs}>
				<div
					className={selectedTab === 1 ? cl.cabinet_tab_active : cl.cabinet_tab}
				>
					<button
						data-tabindex={1}
						onClick={toggleTab}
						className={
							selectedTab === 1
								? `${cl.cabinet_tablink} ${cl.cabinet_borderBottom}`
								: cl.cabinet_tablink
						}
					>
						<span
							className={`${cl.cabinet_icon} ${cl.cabinet_icon_pencil}`}
						></span>
						Изменить данные
					</button>

					{selectedTab === 1 && <ChangeUserInfo />}
				</div>
				<div
					className={selectedTab === 2 ? cl.cabinet_tab_active : cl.cabinet_tab}
				>
					<button
						data-tabindex={2}
						onClick={toggleTab}
						className={
							selectedTab === 2
								? `${cl.cabinet_tablink} ${cl.cabinet_borderBottom}`
								: cl.cabinet_tablink
						}
					>
						<span
							className={`${cl.cabinet_icon} ${cl.cabinet_icon_change}`}
						></span>
						Изменить пароль
					</button>
					{selectedTab === 2 && <ChangeUserPassword />}
				</div>
				<div className={cl.cabinet_tab}>
					<button data-tabindex={3} className={cl.cabinet_tablink}>
						<span
							className={`${cl.cabinet_icon} ${cl.cabinet_icon_history}`}
						></span>
						История заказов
					</button>
				</div>
				<div
					className={selectedTab === 4 ? cl.cabinet_tab_active : cl.cabinet_tab}
				>
					<button
						data-tabindex={4}
						onClick={toggleTab}
						className={
							selectedTab === 4
								? `${cl.cabinet_tablink} ${cl.cabinet_borderBottom}`
								: cl.cabinet_tablink
						}
					>
						<span
							className={`${cl.cabinet_icon} ${cl.cabinet_icon_bookmarks}`}
						></span>
						Закладки
					</button>
					{selectedTab === 4 && <SavedProducts />}
				</div>
				<div className={cl.cabinet_tab}>
					<button className={cl.cabinet_tablink}>
						<span
							className={`${cl.cabinet_icon} ${cl.cabinet_icon_baskets}`}
						></span>
						Собранные корзины
					</button>
				</div>
				<div className={cl.cabinet_tab}>
					<button className={cl.cabinet_tablink}>
						<span
							className={`${cl.cabinet_icon} ${cl.cabinet_icon_eye}`}
						></span>
						Вы смотрели раньше
					</button>
				</div>
				<div className={cl.cabinet_tab}>
					<button
						data-tabindex={7}
						onClick={toggleTab}
						className={`${cl.cabinet_tablink} ${cl.cabinet_borderBottom2}`}
					>
						<span
							className={`${cl.cabinet_icon} ${cl.cabinet_icon_logout}`}
						></span>
						Выход
					</button>
				</div>
			</div> */}
			<div className={cl.cabinet_contentWrapper}>
				<div className={cl.cabinet_tabs}>
					{TABS.map((el) => {
						return (
							<div key={el.id} className={cl.cabinet_tab}>
								<button
									data-tabindex={el.tabIndex}
									className={cl.cabinet_tablink}
									onClick={toggleTab}
								>
									<span
										className={`${cl.cabinet_icon} ${cl.cabinet_icon_eye}`}
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

				<div className={cl.cabinet_content}>{renderTabsContent()}</div>
			</div>
		</>
	);
};

export default CabinetTabs;
