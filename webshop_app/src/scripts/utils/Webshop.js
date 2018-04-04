import Cart from '../components/cart';
import guid from './helpers.js';
import {url_prod, url_cart} from '../url';

export default class Webshop {

  constructor(app) {
    this.app = app
    this.user = localStorage.user ?
    localStorage.user :
    localStorage.setItem('user', guid());

  }

  getProducts() {
    return window.fetch(url_prod)
      .then(blob => blob.json())
      .catch(error => console.log(error));
  }

  getCart() {
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
    }
  }

  async updateCart(url) {
    try {
      const newCart = await this.getCart(url_cart);
      localStorage.setItem('cart', JSON.stringify(newCart));
    } catch (e) {
      console.log(e);
    } finally {
      console.log('Sucessfully updated cart!');
    }
  }


}
