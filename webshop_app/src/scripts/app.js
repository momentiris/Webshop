import WebShop from './utils/webshop';
import Gallery from './components/Gallery.js';
import Navigator from './utils/Navigator.js';
import {url_prod, url_cart} from './url';


export default class App {

  constructor () {

    this.navigator = new Navigator(this);
    this.anchors = [...document.querySelectorAll('.page')];
    this.webshop = new WebShop();
    this.gallery = new Gallery(document.querySelector('#content'));
    this.start = this.gallery.element.innerHTML;

    this.navigator.handlePopState();


  }


  async fetchProducts() {
    const init = await this.webshop.getProducts(url_prod);


    if (init.length === 0)
      console.log('Nothing found... Go buy stuff!');

    this.gallery.element.innerHTML = '';

    init.forEach(product => {
      this.gallery.addProduct(product);
    })

  }

  async fetchCart() {
    const init = await this.webshop.getCart(url_cart);

    if (init.length === 0)
      console.log('Nothing found... Go buy stuff!');

    this.gallery.element.innerHTML = '';

    init.forEach(cartItem => {
      this.gallery.loadCart(cartItem);
    })

  }

}
