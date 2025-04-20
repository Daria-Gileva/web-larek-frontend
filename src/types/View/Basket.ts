import { IEventEmitter } from '..';
import { cloneTemplate, ensureElement } from '../../utils/utils';

export class BasketView implements IView {
	protected _price: HTMLElement;
	protected _button: HTMLButtonElement;
	protected _container: HTMLElement;
	protected _list: HTMLUListElement;
	readonly submit = 'Busket:Submit';

	constructor(template: HTMLTemplateElement, protected _events: IEventEmitter) {
		this._container = cloneTemplate<HTMLElement>(template);

		this._price = ensureElement<HTMLElement>('.basket__price', this._container);
		this._list = ensureElement<HTMLUListElement>(
			'.basket__list',
			this._container
		);
		this._button = ensureElement<HTMLButtonElement>(
			'.basket__button',
			this._container
		);
		this.setActiveSubmit(false);
		this._button.addEventListener('click', () => this.onConfirm());
	}

	onConfirm() {
		this._events.emit(this.submit);
	}

	render(products: HTMLElement[]): HTMLElement {
		this._list.replaceChildren();

		products.forEach((product) => {
			this._list.appendChild(product);
		});

		return this._container;
	}

	setActiveSubmit(cond: boolean) {
		if (cond) {
			this._button.removeAttribute('disabled');
		} else {
			this._button.setAttribute('disabled', String(cond));
		}
	}

	updateTotalPrice(total: Number): void {
		this._price.textContent = `${total} синапсов`;
	}
}
