import { IEventEmitter } from '..';

export interface IProductModel {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

export interface ICatalogModel {
	readonly addEvent: string; // 'Catalog:Change';
	items: Array<IProductModel>;
	// Заполнить элементы
	// Послать сигнал
	setItems(items: Array<IProductModel>): void;

	// Разименовать элемент
	getProduct(id: string): IProductModel;

	// Очистиь элементы
	// Послать сигнал
	removeAll(): void;
}

export class CatalogModel implements ICatalogModel {
	items: IProductModel[];
	addEvent: string = 'Catalog:Change';

	constructor(protected _event: IEventEmitter) {}

	getProduct(id: String): IProductModel {
		for (let counter = 0; counter < this.items.length; counter++) {
			if (this.items[counter].id == id) {
				return this.items[counter];
			}
		}
	}
	removeAll(): void {
		this.items.splice(0, this.items.length);
		this._event.emit(this.addEvent, this.items);
	}
	setItems(items: Array<IProductModel>): void {
		this.items = items;
		this._event.emit(this.addEvent, this.items);
	}
}
