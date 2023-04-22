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
import { ModalSentForm } from '@/components/screens/Cabinet/CabinetOwner/Display/AddProduct/ModalSentForm';

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
	const sentProductForm = useSelector(
		(state: RootState) => state.modaleSlice.sentProductForm
	);
	//imagesData

	const [modalAddColor, serModalAddColor] = React.useState<any>(true);
	const [images, setImages] = React.useState<File[]>([]);
	const [files, setFiles] = React.useState<File[]>([]);
	const [pngImageShow, setPngImageShow] = React.useState<File | null>(null);
	const [jpgImagesShow, setJpgImagesShow] = React.useState<File[]>([]);
	const [netFile, setNetFile] = React.useState<null | any>(null);
	const [netFileShow, setNetFileShow] = React.useState<null | string>(null);

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

				{sentProductForm.turn && (
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
							netFile={netFile}
							setNetFile={setNetFile}
							netFileShow={netFileShow}
							setNetFileShow={setNetFileShow}
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
							files={files}
							setFiles={setFiles}
							pngImageShow={pngImageShow}
							setPngImageShow={setPngImageShow}
							jpgImagesShow={jpgImagesShow}
							setJpgImagesShow={setJpgImagesShow}
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
					{/* {sentProductForm.turn && (
						<div className={s.backround_for_modal}></div>
					)} */}
					{sentProductForm.turn && (
						<ModalSentForm
							title={sentProductForm.title}
							subtitle={sentProductForm.subtitle}
							btntitle={sentProductForm.btntitle}
						/>
					)}

					{/* backround for modal */}
				</div>
			</main>
		</SpinnerLayout>
	);
};

export default AdminSettings;
