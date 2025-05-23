import { IContactModel } from '../../types';

export class ContactModel implements IContactModel {
	phone: string = '';
	email: string = '';

	clear(): void {
		this.phone = '';
		this.email = '';
	}
	validate(phone: string, email: string): boolean {
		if (!phone || !email) return false;
		return true;
	}
	set(phone: string, email: string): void {
		if (this.validate(phone, email)) {
			this.phone = phone;
			this.email = email;
		}
	}
}
