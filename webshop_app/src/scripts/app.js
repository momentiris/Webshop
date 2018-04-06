import WebShop from './utils/webshop';
import Gallery from './components/Gallery.js';
import Navigator from './utils/Navigator.js';
import {url_prod, url_cart} from './url';

export default class App {

  constructor () {

    this.navigator = new Navigator(this);
    this.anchors = [...document.querySelectorAll('.page')];
    this.webshop = new WebShop(this);
    this.gallery = new Gallery(document.querySelector('#content'), this);
    this.start = this.gallery.element.innerHTML;

    this.navigator.handlePopState();
		this.fetchProducts();
  }

  async fetchProducts() {

    if (localStorage.getItem('products') !== null) {
      console.log('Found products in Local Storage. Retrieving...');
       return JSON.parse(localStorage.getItem('products'))
    }

    const products = await this.webshop.getProducts(url_prod);
    console.log('No products found in Local Storage, fetching and returning...');
    localStorage.setItem('products', JSON.stringify(products));

    return products;
  }

  async fetchCart() {

    if (localStorage.getItem('cart') !== null) {
      console.log('Found cart in Local Storage. Retrieving...');
       return JSON.parse(localStorage.getItem('cart'))
    }

    const cart = await this.webshop.getCart(url_cart);
    if (cart.length != 0)
      localStorage.setItem('cart', JSON.stringify(cart));

    return cart;
  }

  async addProductsToGallery() {

    const products = await this.fetchProducts();

    if (products.length === 0)
      console.log('Nothing found... ');

    this.clearGallery();

    products.forEach(product => {
      this.gallery.addProduct(product);
    })
  }

  async addCartToGallery() {
    const init = await this.fetchCart(url_cart);

    if (init.length === 0)
      console.log('Nothing found... Go buy stuff!');

    this.clearGallery();

    await init.forEach(cartItem => {
      this.gallery.loadCart(cartItem);
    })
    
    await this.webshop.getTotalPrice();
  }

  clearGallery() {
    this.gallery.element.innerHTML = '';

    console.log('cleared');
  }


}
