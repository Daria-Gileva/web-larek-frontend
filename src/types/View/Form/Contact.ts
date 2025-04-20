import { IEventEmitter } from '../..';
import { ensureElement } from '../../../utils/utils';
import { IContactModel } from '../../Model/Contact';
import { Form } from './Form';

export class ContactFormView extends Form implements IView {
	protected _phone: HTMLInputElement;
	protected _email: HTMLInputElement;

	constructor(template: HTMLTemplateElement, protected _events: IEventEmitter) {
		super(template, _events, 'Contacts');

		this._phone = ensureElement<HTMLInputElement>(
			'input[name="phone"]',
			this._container
		);

		this._email = ensureElement<HTMLInputElement>(
			'input[name="email"]',
			this._container
		);
	}

	setPhone(value: string) {
		this._phone.value = value;
	}
	setEmail(value: string) {
		this._email.value = value;
	}

	getValues() {
		return {
			phone: this._phone.value,
			email: this._email.value,
		};
	}

	render(data: IContactModel): HTMLElement {
		if (data) {
			this.setPhone(data.phone);
			this.setEmail(data.email);
		}
		return this._container;
	}
}
