import Product from './product';
import Cart from './cart';
import Checkout from './checkout';

export default class Gallery {

	constructor (element, app) {
		this.element = element;
		this.formWrap = document.querySelector('.formWrap');
		this.app = app;
		this.checkout = new Checkout(this.app);
	}

	addProduct (_product) {
		const product = new Product(_product, this.app);
		this.element.appendChild(product.documentFragment)
	}

	async loadCart(_cart) {
		const cart = new Cart(_cart, this.app);
		await this.element.appendChild(cart.documentFragment);
	}
}
