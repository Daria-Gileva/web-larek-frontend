export interface IEventEmitter {
	emit: (event: string, data?: unknown) => void;
	on: (event: string, callback: (event: unknown) => void) => void;
}

export interface IProductModel {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

export interface IContactModel {
	phone: string;
	email: string;

	clear(): void;
	set(phone: string, email: string): void;
	validate(phone: string, email: string): boolean;
}

export interface IView {
	render(data?: unknown): HTMLElement;
}

export interface IOrderResponseModel {
	id: string;
	total: number;
}

export interface ICatalogModel {
	readonly addEvent: string;
	items: Array<IProductModel>;
	setItems(items: Array<IProductModel>): void;

	getProduct(id: string): IProductModel;

	removeAll(): void;
}

export interface IBasketModel {
	readonly changeEvent: string; //'Backet:Change';

	items: Array<IProductModel>;

	add(item: IProductModel): void;
	isExist(item: IProductModel): boolean;
	remove(id: Number): void;
	removeAll(): void;
	getCounter(): Number;
	getAllSum(): Number;
}

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
