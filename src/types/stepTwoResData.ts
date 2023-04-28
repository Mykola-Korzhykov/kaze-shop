export interface ResponseData<T extends Boolean> {
	orderId: number;
	orderToken: string;
	paymentLink: T extends true ? null : string;
}
