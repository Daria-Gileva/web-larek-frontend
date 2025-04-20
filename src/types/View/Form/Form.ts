import { IEventEmitter } from '../..';
import {
	cloneTemplate,
	ensureAllElements,
	ensureElement,
} from '../../../utils/utils';

export class Form {
	protected _submit: HTMLButtonElement;
	protected _container: HTMLFormElement;
	protected _inputs?: HTMLInputElement[];
	protected _buttonsInput?: HTMLButtonElement[];

	submitEvent = 'Form:Submit';
	changeEvent = 'Form:Change';

	constructor(
		template: HTMLTemplateElement,
		protected _events: IEventEmitter,
		name?: string
	) {
		this._container = cloneTemplate<HTMLFormElement>(template);

		let tmpContextActions = ensureElement<HTMLElement>(
			`.modal__actions`,
			this._container
		);
		this._submit = ensureElement<HTMLButtonElement>(
			`.button`,
			tmpContextActions
		);

		this._inputs = ensureAllElements<HTMLInputElement>(
			'.form__input',
			this._container
		);

		let tmpContextButtons = ensureElement<HTMLElement>(
			`.order`,
			this._container
		);
		this._buttonsInput = ensureAllElements<HTMLButtonElement>(
			'.button',
			tmpContextButtons
		);

		if (name) {
			this.submitEvent = name + ':Submit';
			this.changeEvent = name + ':Change';
		}
		this._inputs.forEach((element) => {
			element.addEventListener('input', (event: Event) => {
				const target = event.target as HTMLInputElement;
				this._events.emit(this.changeEvent, target.value);
			});
		});
		this._buttonsInput.forEach((element) => {
			element.addEventListener('click', (event: Event) => {
				const target = event.target as HTMLButtonElement;

				this._buttonsInput.forEach((button) => {
					button.classList.remove('button_alt-active');
				});
				target.classList.add('button_alt-active');
				this._events.emit(this.changeEvent, target.name);
			});
		});

		this._submit.addEventListener('click', (e) => {
			e.preventDefault();
			this.onConfirm();
		});
	}

	setActiveSubmit(cond: boolean) {
		if (cond) {
			this._submit.removeAttribute('disabled');
		} else {
			this._submit.setAttribute('disabled', String(cond));
		}
	}

	onConfirm() {
		this._events.emit(this.submitEvent);
	}
}
