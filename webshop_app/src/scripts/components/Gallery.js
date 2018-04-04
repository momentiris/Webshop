import Product from './product';
import Cart from './cart';

export default class Gallery {

	constructor (element, app) {
		this.element = element;
		this.app = app;

	}

	addProduct (_product) {
		const product = new Product(_product, this.app);
		this.element.appendChild(product.documentFragment)
	}

	loadCart(_cart) {
		const cart = new Cart(_cart, this.app);
		this.element.appendChild(cart.documentFragment)
	}


}
