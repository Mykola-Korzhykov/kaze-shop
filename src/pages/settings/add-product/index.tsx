import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import s from './addProduct.module.scss';
//redux
import SpinnerLayout from '@/layouts/SpinnerLayout';
import Image from 'next/image';
import {
  setModalAddPhoto,
  setModalAddColor,
} from '../../../redux/slices/modal';
import { ModalAddColor } from '../../../components/screens/Cabinet/CabinetOwner/Display/AddProduct/ModalAddColor';
//components
import { AddProduct } from '../../../components/screens/Cabinet/CabinetOwner/Display/AddProduct';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { ModalEditProduct } from '@/components/screens/Cabinet/CabinetOwner/Display/AddProduct/ModalEditProduct';
import { ModalAddCategory } from '@/components/screens/Cabinet/CabinetOwner/Display/AddProduct/ModalAddCategory';
import { ModuleWindiw } from '@/components/screens/Cabinet/CabinetOwner/Display/AddProduct/ModuleWindow';
const AdminSettings: NextPage = () => {
  const user: RootState['user'] = useSelector((state: RootState) => state.user);
  //states
  const refRoot = React.useRef(null);
  const [innerHidth, setInnerHidth] = React.useState<number>(0);
  const [countPhoto, setCountPhoto] = React.useState<number>(1);
  const modalAddPhoto = useSelector(
    (state: RootState) => state.modaleSlice.modalAddPhoto
  );
  const [choiceColor, setChoiceColor] = React.useState<boolean>(false);
  const modalAddCAtegory = useSelector(
    (state: RootState) => state.modaleSlice.modalAddCAtegory
  );
  const modalAddColorTurn = useSelector(
    (state: RootState) => state.modaleSlice.modalAddColor
  );
  const modalEditProductTurn = useSelector(
    (state: RootState) => state.modaleSlice.modalAddEditProduct
  );
  //imagesData
  const [images, setImages] = React.useState<File[]>([]);

  const [modalAddColor, serModalAddColor] = React.useState<any>(true);

  React.useEffect(() => {
    if (refRoot.current) {
      setInnerHidth(refRoot.current.clientHeight);
    }
  });

  return (
    <SpinnerLayout>
      <main ref={refRoot} className={s.content}>
        {modalAddPhoto && (
          <div
            style={{ height: `${innerHidth + 350}px` }}
            className={s.backround_for_modal}
          ></div>
        )}
        {modalAddCAtegory && (
          <div
            className={s.backround_for_modal}
            style={{ height: `${innerHidth + 350}px` }}
          ></div>
        )}
        {/* { modalAddColorTurn &&
                    <div className={s.backround_for_modal}> r</div>
                } */}

        <div className={s.container}>
          <div className="page_coordinator">
            <Link href="/cabinet">.../Личный кабинет |</Link>{' '}
            <span>Выдать роль</span>
          </div>

          <div className={s.wrapper_add_product}>
            <AddProduct
              modalAddCAtegory={modalAddCAtegory}
              imagesData={images}
              setImages={setImages}
              setCountPhoto={setCountPhoto}
              modalAddColor={modalAddColor}
              setModalAddColor={setModalAddColor}
              modalAddPhoto={modalAddPhoto}
            />
          </div>

          {/* модалки */}

          {modalAddPhoto ? (
            <ModuleWindiw
              imagesData={images}
              setImages={setImages}
              setChoiceColor={setChoiceColor}
              choiceColor={choiceColor}
              modalAddPhoto={modalAddPhoto}
              setModalAddPhoto={setModalAddPhoto}
              modalAddColor={modalAddColorTurn}
              setModalAddColor={setModalAddColor}
            />
          ) : (
            ''
          )}
          {modalAddCAtegory ? <ModalAddCategory /> : ''}
          {modalAddColorTurn ? (
            <ModalAddColor setChoiceColor={setChoiceColor} />
          ) : (
            ''
          )}

          {/* {modalEditProductTurn && <ModalEditProduct 
						imagesData={images}
						setImages={setImages}
						setChoiceColor={setChoiceColor}
						choiceColor={choiceColor}
						modalAddPhoto={modalAddPhoto}
						setModalAddPhoto={setModalAddPhoto}
						modalAddColor={modalAddColorTurn}
						setModalAddColor={setModalAddColor}
				/>} */}

          {/* backround for modal */}

          {/* { modalAddPhoto &&
                    <div className={s.backround_for_modal}></div>
                }
                { modalAddCAtegory &&
                    <div className={s.backround_for_modal}></div>
                }
                { modalAddColorTurn &&
                    <div className={s.backround_for_modal}></div>
                } */}
        </div>
      </main>
    </SpinnerLayout>
  );
};

export default AdminSettings;
