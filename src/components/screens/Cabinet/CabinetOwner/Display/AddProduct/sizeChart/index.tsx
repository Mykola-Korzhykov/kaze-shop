import React from 'react';
import s from './sizeChart.module.scss';
import { useAppDispatch } from '@/redux/hooks';
import { setSizeChartImageDescription } from '@/redux/slices/formData';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface SizeChartProps {
  id: number;
  title: string;
  placeholder: string;
  leng: string;
  valid?: boolean;
  setValid?: (s: any) => void;
  checkForm: boolean;
}

interface SizeChartImageDescription {
  ua: string;
  ru: string;
  rs: string;
  en: string;
}

export const SizeChart = ({
  title,
  placeholder,
  id,
  leng,
  valid,
  setValid,
  checkForm,
}: SizeChartProps) => {
  const dispatch = useAppDispatch();
  const formData = useSelector((state: RootState) => state.formData);

  console.log('valid', valid);

  return (
    <label className={s.label} htmlFor={`sizechart${id}`}>
      <div className={s.label_wrapper}>
        <div className={s.title}>{title}</div>

        <div
          style={{
            border:
              valid &&
              (!checkForm ||
                (checkForm &&
                  formData.sizeChartImageDescription[
                    leng as keyof SizeChartImageDescription
                  ] !== ''))
                ? ''
                : '#e73232 1.5px solid',
          }}
          className={s.placeholder}
        >
          <input
            // style={{border: valid ? '' : '1px solid red'}}
            onChange={(e) => {
              setValid((prevState: any) => {
                const objCopy = { ...prevState };
                objCopy[id] = e.target.value !== '' ? true : false;
                return objCopy;
              });
              //console.log('value',e.target.value )
              const payload: any = {
                branch: `${leng}`,
                sizeChartImageDescription: e.target.value,
              };
              dispatch(setSizeChartImageDescription(payload));
              e.target.value = e.target.value;
            }}
            placeholder={placeholder}
            id={`sizechart${id}`}
            //@ts-ignore
            className={
              valid &&
              (!checkForm || //@ts-ignore
                (checkForm && formData.sizeChartImageDescription[leng] !== ''))
                ? `${s.input} ${s.input_valid}`
                : `${s.input} ${s.input_off_valid}`
            }
            type="text"
          />
        </div>
      </div>
    </label>
  );
};
