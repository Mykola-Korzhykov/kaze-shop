import s from './favoritesButton.module.scss';

const FavoritesButton = (): JSX.Element => {
    return (
        <button className={s.favorite_button}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 20 24" fill="none">
                <path d="M18.4373 23.25L9.99889 18.5625L1.56226 23.25V1.6875C1.56226 1.43886 1.66103 1.2004 1.83684 1.02459C2.01266 0.848772 2.25112 0.75 2.49976 0.75H17.4998C17.7484 0.75 17.9869 0.848772 18.1627 1.02459C18.3385 1.2004 18.4373 1.43886 18.4373 1.6875V23.25Z" stroke="#0B0B0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </button>
    )
}
export default FavoritesButton;