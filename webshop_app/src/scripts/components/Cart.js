
export default class Cart {

  constructor(data, app) {
    const {name, description, price, image, id} = data;
    this.app = app;

    this.documentFragment = document.createDocumentFragment();

    this.wrap = document.createElement('div');
		this.wrap.classList.add('cart__wrap');
		this.wrap.dataset.id = id;

		this.name = document.createElement('h5');
		this.name.classList.add('product__name');
		this.name.innerHTML = name;

    this.image = document.createElement('img');
    this.image.classList.add('product__image');
    this.image.setAttribute('src', image)

    this.price = document.createElement('p');
    this.price.classList.add('product__price');
    this.price.innerHTML = `SEK ${price}`;

    this.button = document.createElement('button');
    this.button.classList.add('removefromcart');
    this.button.innerHTML = 'Remove';
    this.button.addEventListener('click', this.removeFromCart.bind(this));

    this.wrap.appendChild(this.image);
    this.wrap.appendChild(this.name);
    this.wrap.appendChild(this.price);
    this.wrap.appendChild(this.button);

    this.documentFragment.appendChild(this.wrap);
  }

  async removeFromCart(e) {
    await this.app.webshop.removeFromCart(e, this.wrap.dataset.id)


  }
}
