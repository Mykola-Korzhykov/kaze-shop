export const trimPhoneNumber = (phone: string): string => {
	return phone.replace(/\s|\(|\)/g, '');
};
