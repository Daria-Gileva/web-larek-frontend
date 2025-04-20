import { IEventEmitter } from '..';
import { IProductModel } from './Product';

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

export class BasketModel implements IBasketModel {
	changeEvent: string = 'Backet:Change';
	items: Array<IProductModel> = [];

	constructor(protected _event: IEventEmitter) {}

	add(item: IProductModel): void {
		if (!this.isExist(item)) {
			this.items.push(item);
			this._event.emit(this.changeEvent, this.items);
		}
	}

	isExist(item: IProductModel): boolean {
		let exist = false;
		this.items.forEach((element) => {
			if (element.id == item.id) exist = true;
		});
		return exist;
	}

	remove(id: Number): void {
		this.items.splice(id.valueOf(), 1);
		this._event.emit(this.changeEvent, this.items);
	}
	removeAll(): void {
		this.items.splice(0, this.items.length);
		this._event.emit(this.changeEvent, this.items);
	}
	getCounter(): Number {
		return this.items.length;
	}
	getAllSum(): Number {
		let price = 0;
		this.items.forEach((element) => {
			price += element.price;
		});
		return price;
	}
}
