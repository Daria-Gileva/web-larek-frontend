export enum Payment {
	card = 'card',
	cash = 'cash',
}

export interface IDeliveryModel {
	payment: Payment;
	address: string;

	clear(): void;
	set(payment: Payment, address: string): void;
	validate(payment: Payment, address: string): boolean;
}

export class DeliveryModel implements IDeliveryModel {
	payment: Payment = Payment.card;
	address: string = '';

	clear(): void {
		this.payment = Payment.card;
		this.address = '';
	}
	validate(payment: Payment, address: string): boolean {
		if (!payment || !address) return false;
		return true;
	}
	set(payment: Payment, address: string): void {
		if (this.validate(payment, address)) {
			this.payment = payment;
			this.address = address;
		}
	}
}
