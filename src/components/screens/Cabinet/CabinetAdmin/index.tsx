import { ButtonType } from '@/types/auth';
// import React from "react";
// import s from './CabinetAdmin.module.scss'
// import Image from 'next/image';
// import Link from "next/link";
// //icons
// import icon1 from '../../../../assets/icons/cabinetAdmin/icon1_grey.svg'
// import icon2 from '../../../../assets/icons/cabinetAdmin/icon2_grey.svg'
// import icon3 from '../../../../assets/icons/cabinetAdmin/icon3_grey.svg'
// import icon4 from '../../../../assets/icons/cabinetAdmin/icon4_grey.svg'
// import icon5 from '../../../../assets/icons/cabinetAdmin/icon5_grey.svg'
// import icon6 from '../../../../assets/icons/cabinetAdmin/icon6_gray.svg'
// import icon7 from '../../../../assets/icons/cabinetAdmin/icon7_grey.svg'
// //white
// import icon_white1 from '../../../../assets/icons/cabinetAdmin/icon1_white.svg'
// import icon_white2 from '../../../../assets/icons/cabinetAdmin/icon2_white.svg'
// import icon_white3 from '../../../../assets/icons/cabinetAdmin/icon3_white.svg'
// import icon_white4 from '../../../../assets/icons/cabinetAdmin/icon4_white.svg'
// import icon_white5 from '../../../../assets/icons/cabinetAdmin/icon5_white.svg'
// import icon_white6 from '../../../../assets/icons/cabinetAdmin/icon6_white.svg'
// import icon_white7 from '../../../../assets/icons/cabinetAdmin/icon7_white.svg'
// import findUser from '../../../../assets/icons/cabinetAdmin/findUser.svg'
// //components
// import {Button} from '../CabinetOwner/Buttons/Button'
// import LogoutModal from '../../../modals/LogoutModal/LogoutModal'
// import ChangePasswordSetting  from '../../../screens/Cabinet/CabinetOwner/Display/ChangePasswordSetting'

// export const CabinetAdmin = () =>{

// const buttonsObj: ButtonType[] = [
//     // { id: 1, img_grey: icon1, img_white: icon_white1, text: 'Выдать роль', url: '/admin-settings/role-settings' },
//     // { id: 2, img_grey: icon2, img_white: icon_white2, text: 'Администраторы', url: '/admin-settings/admin-settings' },
//     // { id: 3, img_grey: icon3, img_white: icon_white3, text: 'Редактировать сайт' },
//     { id: 3, img_grey: icon4, img_white: icon_white4, text: 'Добавить товар', url: '/admin-settings/add-product' },
//     { id: 4, img_grey: icon5, img_white: icon_white5, text: 'Редактировать товар' },
//     { id: 5, img_grey: icon6, img_white: icon_white6, text: 'Настройки' },
//     { id: 6, img_grey: icon7, img_white: icon_white7, text: 'Выход' }
// ]

//     const [displayActive, setDisplayActive] = React.useState<number>(1)

//     return (
//         <div className={s.wrapper}>
//               <div className={s.nav_dekstop}>
//                 {buttonsObj.map((obj, ind) => {
//                     return <Button displayActive={displayActive} chengeDisplayOK={setDisplayActive} key={ind} id={obj.id} img_white={obj.img_white} img_grey={obj.img_grey} text={obj.text} />
//                 })}
//             </div>

//              <div className={s.nav_mobile}>
//                 {buttonsObj.map((obj, ind) => {

//                     return <Link className={s.link} href={`${obj.url}`} key={ind}>
//                         <Button displayActive={displayActive} chengeDisplayOK={setDisplayActive} key={obj.id} id={obj.id} img_white={obj.img_white} img_grey={obj.img_grey} text={obj.text} />
//                     </Link>
//                 })}
//             </div>

//             <div className={s.display}>
//                 {displayActive === 6 ? <LogoutModal closeModal={setDisplayActive} /> : ''}
//                 {displayActive === 5 ? <ChangePasswordSetting /> : ''}

//             </div >
//         </div>
//     )
// }
