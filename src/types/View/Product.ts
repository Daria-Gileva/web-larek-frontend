import { IEventEmitter } from '..';
import { cloneTemplate } from '../../utils/utils';
import { IProductModel } from '../Model/Product';

export class ProductView implements IView {
	protected _title: HTMLElement;
	protected _price: HTMLElement;
	protected _description?: HTMLElement;
	protected _image?: HTMLImageElement;
	protected _category?: HTMLElement;
	protected _button?: HTMLButtonElement;
	protected _index?: HTMLElement;
	protected _container: HTMLElement;

	event: string;
	id: string;

	constructor(
		template: HTMLTemplateElement,
		protected _events: IEventEmitter,
		name: String
	) {
		this.event = name + ':Action';

		this._container = cloneTemplate<HTMLElement>(template);

		this._title = this._container.querySelector('.card__title');
		this._price = this._container.querySelector('.card__price');
		this._description = this._container.querySelector('.card__text');
		this._image = this._container.querySelector('.card__image');
		this._category = this._container.querySelector('.card__category');
		this._button = this._container.querySelector('.card__button');
		this._index = this._container.querySelector('.basket__item-index');

		if (this._button) {
			this._button.addEventListener('click', () => this.onAction());
		} else {
			this._container.addEventListener('click', () => this.onAction());
		}
	}

	onAction() {
		this._events.emit(
			this.event,
			this._index ? this._index.textContent : this.id
		);
	}

	setActiveSubmit(cond: boolean): void {
		if (cond) {
			this._button.removeAttribute('disabled');
		} else {
			this._button.setAttribute('disabled', String(cond));
		}
	}

	render(data?: IProductModel, index?: Number): HTMLElement {
		if (data) {
			this.id = data.id;
			this._title.innerText = data.title;
			this._price.innerText = data.price
				? `${data.price} синапсов`
				: 'Бесценно';
			if (this._description && data.description) {
				this._description.innerText = data.description;
			}
			if (this._image && data.image) {
				this._image.src = data.image;
			}
			if (this._category && data.category) {
				this._category.classList.remove('card__category_other');
				switch (data.category) {
					case 'софт-скил':
						this._category.classList.add('card__category_soft');
						break;
					case 'дополнительное':
						this._category.classList.add('card__category_additional');
						break;
					case 'кнопка':
						this._category.classList.add('card__category_button');
						break;
					case 'хард-скил':
						this._category.classList.add('card__category_hard');
						break;
					default:
						this._category.classList.add('card__category_other');
				}
				this._category.innerText = data.category;
			}
			if (this._index && index) {
				this._index.innerText = String(index);
			}
		}
		return this._container;
	}
}
