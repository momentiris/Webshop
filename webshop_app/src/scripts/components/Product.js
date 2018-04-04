
export default class Product {

	constructor(data, app) {
		const {name, description, price, image, id} = data;
		this.app = app;

		this.documentFragment = document.createDocumentFragment();

		this.wrap = document.createElement('div');
		this.wrap.classList.add('product__wrap');
		this.wrap.dataset.id = id;

		this.name = document.createElement('h3');
		this.name.classList.add('product__name');
		this.name.innerHTML = name;

		this.description = document.createElement('p');
		this.description.classList.add('product__description');
		this.description.innerHTML = description;

		this.image = document.createElement('img');
		this.image.classList.add('product__image');
		this.image.setAttribute('src', image)

		this.price = document.createElement('p');
		this.price.classList.add('product__price');
		this.price.innerHTML = `SEK ${price}`;

		this.button = document.createElement('button');
		this.button.classList.add('addtocart');
		this.button.innerHTML = 'Add to cart';
		this.button.addEventListener('click', this.addToCart.bind(this));

		this.wrap.appendChild(this.image);
		this.wrap.appendChild(this.name);
		this.wrap.appendChild(this.description);
		this.wrap.appendChild(this.price);
		this.wrap.appendChild(this.button);

		this.documentFragment.appendChild(this.wrap);

		this.cartTemplate = {
			"cartId": localStorage.getItem('user'),
			"productId": this.wrap.dataset.id,
		}
	}

	 async addToCart() {
		await this.app.webshop.addToCart(this.cartTemplate);
		await this.app.webshop.updateCart();
	}
}
