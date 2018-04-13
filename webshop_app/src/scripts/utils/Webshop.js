import Cart from '../components/cart';
import guid from './helpers.js';
import {url_prod, url_cart} from '../url';

export default class Webshop {

  constructor(app) {
    this.app = app
    this.user = localStorage.user ?
    localStorage.user :
    localStorage.setItem('user', guid()) ||
    localStorage.getItem('user');

		console.log(this.user);


    console.log('start up ' + this.user);
  }
  getProducts() {
    return window.fetch(url_prod)
      .then(blob => blob.json())
      .catch(error => console.log(error));
  }

  getCart(url) {
    return window.fetch(`${url_cart}/${this.user}`)
    .then(res => res.json())
    .catch(error => console.log(error));
  }

  async addToCart(cart) {
    const get = await fetch('http://localhost:5000/api/cart', {
		  method: 'POST',
		  body: JSON.stringify(cart),
		  headers: new Headers({
		    'Accept': 'application/json',
				'Content-Type': 'application/json'
		  })
		});
		const result = await get.json();
    console.log(result);
    await this.updateCart(result.result);
  }

  async removeFromCart(event, id) {
    const remove = await fetch(`${url_cart}/${localStorage.getItem('user')}/${id}`, {
      method: 'DELETE',
      headers: new Headers({
        'Accept': 'application/json',
    		'Content-Type': 'application/json'
      })
    });

    const response = await remove.json();
    if (response.result == true) {
      event.target.parentNode.remove();
      console.log(response.message);
      this.updateCart(response.result);
      this.getTotalPrice();

    }
  }

  async updateCart(result) {
    if (result) {
      console.log(result);
      try {
        // setTimeout(async () => {
        const newCart = await this.getCart(url_cart);
        console.log(newCart);
        await localStorage.setItem('cart', JSON.stringify(newCart));
        // console.log('hej');

        // }, 500)
      } catch (e) {
        console.log(e);
      } finally {
        console.log('Sucessfully updated cart in localstorage!');
        await this.updateTotalPrice();
      }
    }
  }

  async updateTotalPrice() {
    const cart = await this.getCart(url_cart);
    if (cart.length == 0) return;
    return this.returnPrice(cart);
  }

	returnPrice(cart) {
		const reducer = (a, b) => a + b;
 		return cart.map(instance => parseInt(instance.price))
		.reduce(reducer);
	}


  async getTotalPrice() {
    const price = await this.app.gallery.element.querySelector('.total__value p');

    const cart = await this.app.fetchCart();
    console.log(cart);
    console.log(cart.length);
    if (cart == 0) {
      console.log('hej');
    this.app.gallery.element.innerHTML = 'No products in cart...';
    this.app.gallery.formWrap.style.cssText = "display: none";
      return;
    }

    if (price) {
      price.innerHTML = `Total: ${await this.updateTotalPrice()} SEK`;

    } else {

      console.log('creating..');
      const valueWrap = document.createElement('div');
      valueWrap.classList.add('total__value');
      const value = document.createElement('p');

      value.innerHTML = `Total: ${await this.updateTotalPrice()} SEK`
      valueWrap.appendChild(value);
      this.app.gallery.element.appendChild(valueWrap);
      this.app.gallery.formWrap.style.cssText = "display: block";
    }
  }

async placeOrder(e) {
    e.preventDefault();
  const form = document.querySelector('form');
  const inputs = [...form.querySelectorAll('input')].map(input => {
    return input.value;
  });

   const temp = await fetchOrder(this);

   async function fetchOrder(checkout) {
    const get = await fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      body: JSON.stringify({
        "userid": localStorage.getItem('user'),
        "Firstname": inputs[0],
        "Lastname": inputs[1],
        "email": inputs[2],
        "adress": inputs[3],
        "postCode": inputs[4],
        "city": inputs[5],
        "total": await window.app.webshop.updateTotalPrice(),
      }),
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    });

    const response = await get.json();
		console.log(response);

		if (response.result) {
      console.log(response);
      localStorage.clear();
      window.app.gallery.formWrap.innerHTML = '';
      window.app.gallery.element.innerHTML = `
      <h2>The Lord thanks you for shopping at Bible Heaven!<h2>
      `;


    }

  }
  }
}
