import { IEventEmitter } from '..';
import { cloneTemplate, ensureElement } from '../../utils/utils';
import { IOrderResponseModel } from '../Model/Api';

export class SuccessView implements IView {
	protected _title: HTMLElement;
	protected _description: HTMLElement;
	protected _button: HTMLButtonElement;
	protected _container: HTMLElement;

	readonly event = 'Success:Action';

	constructor(template: HTMLTemplateElement, protected _events: IEventEmitter) {
		this._container = cloneTemplate<HTMLFormElement>(template);

		this._title = ensureElement<HTMLElement>(
			'.order-success__title',
			this._container
		);
		this._description = ensureElement<HTMLElement>(
			'.order-success__description',
			this._container
		);
		this._button = ensureElement<HTMLButtonElement>(
			'.order-success__close',
			this._container
		);

		this._button.addEventListener('click', () => {
			this._events.emit(this.event);
		});
	}

	setTotal(value: number) {
		this._description.textContent = `Списано ${value} синапсов`;
	}

	render(data: IOrderResponseModel): HTMLElement {
		this.setTotal(data.total);

		return this._container;
	}
}
