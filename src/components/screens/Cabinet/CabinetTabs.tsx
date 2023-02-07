import React, { FC } from 'react'
import cl from '../../../styles/cabinet.module.scss'
import ChangeUserInfo from '@/components/ChangeUserInfo/ChangeUserInfo'
import ChangeUserPassword from '@/components/ChangeUserPassword/ChangeUserPassword'
import LogoutModal from '@/components/modals/LogoutModal/LogoutModal'
const CabinetTabs: FC = () => {
	const [selectedTab, setSelectedTab] = React.useState<number | null>(1)

	const toggleTab = React.useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			const tabIndex = (e.target as HTMLButtonElement).getAttribute(
				'data-tabindex'
			)

			const tabNumber = tabIndex || 1
			setSelectedTab(+tabNumber)
			const elX = e.clientX
			window.scrollTo({ top: elX / 10, behavior: 'smooth' })
		},
		[selectedTab]
	)
	return (
		<>
			{selectedTab === 7 && <LogoutModal closeModal={setSelectedTab} />}
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
					<button className={cl.cabinet_tablink}>
						<span
							className={`${cl.cabinet_icon} ${cl.cabinet_icon_history}`}
						></span>
						История заказов
					</button>
				</div>
				<div className={cl.cabinet_tab}>
					<button className={cl.cabinet_tablink}>
						<span
							className={`${cl.cabinet_icon} ${cl.cabinet_icon_bookmarks}`}
						></span>
						Закладки
					</button>
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
			</div>
		</>
	)
}

export default CabinetTabs
