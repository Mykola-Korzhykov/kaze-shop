import { useAppDispatch } from '@/redux/hooks';
import { clearForm } from '@/redux/slices/formData';
import { removeimageUrlArr } from '@/redux/slices/modal';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

export function clearFormData() {
	const imageUrlArr = useSelector(
		(state: RootState) => state.modaleSlice.imageUrlArr
	);
	const dispatch = useAppDispatch();

	dispatch(clearForm());
	dispatch(removeimageUrlArr({ from: 0, size: imageUrlArr.length }));
}
