import {
	IBasketModel,
	IContactModel,
	IDeliveryModel,
	IOrderResponseModel,
	IProductModel,
	Payment,
} from '../types';
import { Api } from './base/api';

interface IProductListResponseModel {
	total: number;
	items: IProductModel[];
}

interface IOrderRequestModel {
	payment: Payment;
	address: string;
	phone: string;
	email: string;
	total: number;
	items: string[];
}

export class OrderRequestModel implements IOrderRequestModel {
	payment: Payment;
	address: string;
	phone: string;
	email: string;
	total: number;
	items: string[] = [];

	constructor(
		deliveryModel: IDeliveryModel,
		contactModel: IContactModel,
		basketModel: IBasketModel
	) {
		this.payment = deliveryModel.payment;
		this.address = deliveryModel.address;
		this.phone = contactModel.phone;
		this.email = contactModel.email;
		this.total = basketModel.getAllSum().valueOf();
		basketModel.items.forEach((element) => {
			if (element.price && element.price > 0) this.items.push(element.id);
		});

		console.log(this.items);
	}
}

interface IAppAPI {
	getProductList: () => Promise<IProductModel[]>;
	order: (order: IOrderRequestModel) => Promise<IOrderResponseModel>;
}

export class AppApi extends Api implements IAppAPI {
	readonly cdn: string;
	readonly imgExtens?: string;

	constructor(
		cdn: string,
		baseUrl: string,
		imgExtens?: string,
		options?: RequestInit
	) {
		super(baseUrl, options);

		this.cdn = cdn;
		this.imgExtens = imgExtens;
	}

	getProductList(): Promise<IProductModel[]> {
		return this.get('/product').then((data: IProductListResponseModel) =>
			data.items.map((item) => ({
				...item,
				image:
					this.cdn +
					(this.imgExtens
						? item.image.replace(/\.svg$/, this.imgExtens)
						: item.image),
			}))
		);
	}

	order(order: IOrderRequestModel): Promise<IOrderResponseModel> {
		return this.post('/order', order).then((data: IOrderResponseModel) => data);
	}
}
