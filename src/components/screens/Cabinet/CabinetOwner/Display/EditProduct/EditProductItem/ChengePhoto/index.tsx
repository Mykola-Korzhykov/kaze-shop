import React from 'react';
import s from './ChengePhoto.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
//components

interface ChengePhotoProps {
  number: number;
  photo: string;
}

export const ChengePhoto = ({ number }: ChengePhotoProps) => {
  const editProductItemId = useSelector(
    (state: RootState) => state.admin.editProductItemId
  );
  // const activeProduct = useSelector((state: RootState)=> state.admin.editProductItemId)

  return (
    <>
      <div className={s.wrapper}>
        <span className={s.number}>{number}</span>
        <span className={s.title}> Изменить фото </span>
      </div>
    </>
  );
};
