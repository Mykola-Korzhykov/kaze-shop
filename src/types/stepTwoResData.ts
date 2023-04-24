export interface ResponseData<T extends Boolean> {
	orderId: number;
	paymentLink: T extends true ? null : string;
}
