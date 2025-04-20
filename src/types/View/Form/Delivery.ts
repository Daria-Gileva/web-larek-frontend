import { IEventEmitter } from '../..';
import { ensureAllElements, ensureElement } from '../../../utils/utils';
import { IDeliveryModel, Payment } from '../../Model/Delivery';
import { Form } from './Form';

export class DeliveryFormView extends Form implements IView {
	protected _payment: Array<HTMLButtonElement>;
	protected _address: HTMLInputElement;

	constructor(template: HTMLTemplateElement, protected _events: IEventEmitter) {
		super(template, _events, 'Delivery');

		let tmpContextActions = ensureElement<HTMLElement>(
			`.order`,
			this._container
		);
		this._payment = ensureAllElements(`.button`, tmpContextActions);
		this._address = ensureElement<HTMLInputElement>(
			`.form__input`,
			this._container
		);

		this._payment.forEach((button) => {
			button.addEventListener('click', (event) => {
				this.setPayment(button.name);
			});
		});
	}

	setAddress(value: string) {
		this._address.value = value;
	}

	setPayment(name: string) {
		this._payment.forEach((button) => {
			button.classList.remove('button_alt-active');
		});

		const selectedButton = this._payment.find((button) => button.name === name);
		if (selectedButton) {
			selectedButton.classList.add('button_alt-active');
		}
	}

	getPayment(): Payment.card {
		let ret;
		this._payment.forEach((button) => {
			if (button.classList.contains('button_alt-active')) ret = button.name;
		});
		return ret;
	}

	getValues() {
		return {
			address: this._address.value,
			payment: this.getPayment(),
		};
	}

	render(data: IDeliveryModel): HTMLElement {
		this.setAddress(data.address);
		this.setPayment(data.payment);
		return this._container;
	}
}
