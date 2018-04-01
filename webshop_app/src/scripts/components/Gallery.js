import Product from './product';

export default class Gallery {

	constructor (element) {
		this.element = element;
	}

	addItem (_product) {
		const product = new Product(_product);
		this.element.appendChild(product.documentFragment);
	}
}
