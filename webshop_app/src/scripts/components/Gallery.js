import Product from './product';
import Cart from './cart';

export default class Gallery {

	constructor (element) {
		this.element = element;

	}

	addProduct (_product) {
		const product = new Product(_product);
		this.element.appendChild(product.documentFragment)
	}

	loadCart(_cart) {
		const cart = new Cart(_cart);
		this.element.appendChild(cart.documentFragment)
	}
}
