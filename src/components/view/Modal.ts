import { IEventEmitter, IView } from '../../types';

export class Modal implements IView {
	protected _closeButton: HTMLButtonElement;
	protected _content: HTMLElement;
	openEvent = 'Modal:Open';
	closeEvent = 'Modal:Close';

	constructor(
		protected _container: HTMLElement,
		protected _events: IEventEmitter
	) {
		this._closeButton = _container.querySelector('.modal__close');
		this._content = _container.querySelector('.modal__content');
		this._closeButton.addEventListener('click', this.close.bind(this));
		document.addEventListener('keydown', (event: KeyboardEvent) => {
			if (event.key === 'Escape') this.close();
		});
		this._container.addEventListener('click', (event) => {
			if (event.currentTarget === event.target) this.close();
		});
	}
	set content(value: HTMLElement) {
		this._content.replaceChildren(value);
	}
	open() {
		this._container.classList.add('modal_active');
		this._events.emit(this.openEvent);
	}

	close() {
		this._container.classList.remove('modal_active');
		this.content = null;
		this._events.emit(this.closeEvent);
	}
	render(data?: HTMLElement, actualName?: String): HTMLElement {
		this.openEvent = actualName + ':Open';
		this.closeEvent = actualName + ':Close';
		this._content.replaceChildren(data);
		return this._container;
	}
}
