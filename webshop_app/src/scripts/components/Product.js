
export default class Product {

	constructor(data) {
		const {name, description, price, img} = data;

		this.documentFragment = document.createDocumentFragment();

		this.wrap = document.createElement('div');
		this.wrap.classList.add('product__wrap');

		this.name = document.createElement('h3');
		this.name.classList.add('product__name');
		this.name.innerHTML = name;

		this.description = document.createElement('p');
		this.description.classList.add('product__description');
		this.description.innerHTML = description;

		this.price = document.createElement('p');
		this.price.classList.add('product__price');
		this.price.innerHTML = price;

		this.wrap.appendChild(this.name);
		this.wrap.appendChild(this.description);
		this.wrap.appendChild(this.price);

		this.documentFragment.appendChild(this.wrap);








	}
}
