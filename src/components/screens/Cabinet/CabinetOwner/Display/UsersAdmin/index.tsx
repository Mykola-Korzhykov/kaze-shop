import { useAppDispatch } from '@/redux/hooks';
import s from './UsersAdmin.module.scss';
import { findUsersAdmin, getUsersAdmin } from '@/redux/slices/admin';
import { RootState } from '@/redux/store';
import debounce from 'lodash.debounce';
import React from 'react';
import { useSelector } from 'react-redux';
import { UserAdmin } from '../../UserAdmin/UserAdmin';
import Image from 'next/image';
import findUser from '../../../../../../assets/icons/cabinetAdmin/findUser.svg';

export const UsersAdmin: React.FC = () => {
  const usersAdminUI = useSelector(
    (state: RootState) => state.admin.usersAdmin
  );
  const [idUserOpen, setUserOpen] = React.useState<number>(0);
  const [activePaginatoinAdmin, setActivePaginatoinAdmin] =
    React.useState<number>(1);
  const [paginationLendthAdmin, setPaginationLendthAdmin] = React.useState<
    any[]
  >([]);
  const usersAdminStatus = useSelector(
    (state: RootState) => state.admin.usersAdminStatus
  );

  const dispatch = useAppDispatch();

  // get users
  React.useEffect(() => {
    // console.log('пошел запрос1111')
    dispatch(getUsersAdmin(activePaginatoinAdmin));
  }, [activePaginatoinAdmin]);

  React.useEffect(() => {
    let countAdminPagination = Math.ceil(usersAdminUI.length / 10);
    let arrAdminPagination: number[] = [];
    for (let i = 1; i < countAdminPagination + 1; i++) {
      arrAdminPagination.push(i);
    }

    setPaginationLendthAdmin(arrAdminPagination);
  }, [usersAdminUI]);

  const debouncedSearchAdmin = debounce((term) => {
    dispatch(findUsersAdmin(term));
  }, 500);

  return (
    <>
      <label htmlFor="findUser" className={s.input_wrapper_on}>
        <span className={s.text}> Пользователь </span>
        <div className={s.input_wrapper}>
          <input
            onChange={(e) => {
              if (e.target.value === '' || e.target.value === ' ') {
                dispatch(getUsersAdmin(activePaginatoinAdmin));
              } else {
                debouncedSearchAdmin(
                  e.target.value.toLowerCase().split(' ').join(',')
                );
                //console.log('debouncedSearchAdmin', e.target.value.toLowerCase().split(' ').join(','))
              }
            }}
            className={s.input}
            id="findUser"
            type="findUser"
          />
          <Image src={findUser} alt="findUser" />
        </div>
      </label>

      {usersAdminStatus === 'success' &&
        usersAdminUI.length > 0 &&
        usersAdminUI.map((el, ind) => (
          <UserAdmin
            name={el.name}
            editContent={el.editContent}
            surname={el.surname}
            phoneNumber={el.phoneNumber}
            email={el.email}
            isAdmin={el.isAdmin}
            editWebsite={el.editWebsite}
            addContent={el.addContent}
            key={ind}
            setUserOpenOK={setUserOpen}
            idUserOpen={idUserOpen}
            id={el.id}
          />
        ))}

      {usersAdminStatus === 'success' && usersAdminUI.length < 1 && (
        <div className={s.title_wrapper}>
          <div className={s.title}> Пользователей не найдено </div>
          <p className={s.description}>
            В Вашем интернет магазине пока не зарегистрированных пользователей
          </p>
        </div>
      )}

      {usersAdminStatus === 'error403' && (
        <div className={s.title_wrapper}>
          <div className={s.title}>Администратор не подтвердил права </div>
          <p className={s.description}>
            Для того, чтобы администратор начал работать с сайтом, он должен
            подтвердить права на почте
          </p>
        </div>
      )}

      {usersAdminStatus === 'error' && (
        <div className={s.title_wrapper}>
          <div className={s.title}> Ошибка </div>
          {/* <p className={s.description}>
                            В Вашем интернет магазине пока не зарегистрированных пользователей
                        </p> */}
        </div>
      )}

      {usersAdminStatus === 'success' && usersAdminUI.length > 0 && (
        <div className={s.pagination_wrapper}>
          {paginationLendthAdmin.map((el) => {
            return (
              <span
                key={el}
                onClick={() => {
                  setActivePaginatoinAdmin(el);
                }}
                className={
                  activePaginatoinAdmin === el ? s.item_active : s.item
                }
              >
                {el}
              </span>
            );
          })}
        </div>
      )}
    </>
  );
};
