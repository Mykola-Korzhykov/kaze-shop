export interface ProductBottomButtonProps {
	addToCart: () => void;
	addToFavorites: () => void;
	deleteToFavorites: () => void;
	isSaved: boolean;
}
