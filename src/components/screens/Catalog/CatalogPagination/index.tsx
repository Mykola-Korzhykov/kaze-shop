import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setPage } from '@/redux/slices/goods';
import s from './CatalogPagination.module.scss';
import { filterGoods } from '@/redux/slices/goods';

const CatalogPagination: FC = () => {
  const dispatch = useAppDispatch();
  const totalProducts = useAppSelector((state) => state.goods.totalProducts);
  const page = useAppSelector((state) => state.goods.page);

  const paginationHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button: HTMLButtonElement = e.currentTarget;
    dispatch(setPage(+button.value));
    dispatch(filterGoods());
  };

  const startPage = Math.max(page - 2, 1);
  const endPage = Math.min(startPage + 4, Math.ceil(totalProducts / 10));

  return (
    <div className={s.paginationWrapper}>
      {startPage > 1 && (
        <>
          <button
            value={1}
            onClick={paginationHandler}
            className={s.paginationItem}
          >
            1
          </button>
          {startPage > 2 && <span className={s.paginationDots}>...</span>}
        </>
      )}

      {new Array(endPage - startPage + 1).fill(null).map((_, index) => {
        const pageNum = startPage + index;
        return (
          <button
            key={pageNum}
            value={pageNum}
            onClick={paginationHandler}
            className={`${s.paginationItem} ${
              pageNum === page ? s.paginationItemActive : ''
            }`}
          >
            {pageNum}
          </button>
        );
      })}

      {endPage < Math.ceil(totalProducts / 10) && (
        <>
          {endPage < Math.ceil(totalProducts / 10) - 1 && (
            <span className={s.paginationDots}>...</span>
          )}
          <button
            value={Math.ceil(totalProducts / 10)}
            onClick={paginationHandler}
            className={s.paginationItem}
          >
            {Math.ceil(totalProducts / 10)}
          </button>
        </>
      )}
    </div>
  );
};

export default CatalogPagination;
