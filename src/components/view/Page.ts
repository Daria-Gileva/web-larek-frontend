import { IEventEmitter, IView } from '../../types';
import { ensureElement } from '../../utils/utils';

export class Page implements IView {
	protected _basketButton: HTMLButtonElement;
	protected _basketCounter: HTMLElement;
	protected _catalog: HTMLElement;

	event: string = 'Page:Action';

	constructor(
		protected _wrapper: HTMLElement,
		protected _events: IEventEmitter
	) {
		this._basketButton = ensureElement<HTMLButtonElement>(
			'.header__basket',
			this._wrapper
		);
		this._basketCounter = ensureElement<HTMLElement>(
			'.header__basket-counter',
			this._wrapper
		);
		this._catalog = ensureElement<HTMLElement>('.gallery', this._wrapper);

		this._basketButton.addEventListener('click', () => {
			this.lock(true);
			this._events.emit(this.event);
		});
	}

	updateCounter(value: Number) {
		this._basketCounter.textContent = String(value);
	}

	lock(value: boolean) {
		if (value) this._wrapper.classList.add('page__wrapper_locked');
		else this._wrapper.classList.remove('page__wrapper_locked');
	}

	render(items: HTMLElement[]): HTMLElement {
		items.forEach((item) => {
			this._catalog.appendChild(item);
		});

		return this._wrapper;
	}
}
