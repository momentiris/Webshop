import WebShop from './utils/webshop';
import Navigator from './utils/Navigator';
import Gallery from './components/Gallery.js';
import {url_prod, url_cart} from './url';


export default class App {

  constructor () {
    this.navigator = new Navigator();
    console.log(this.navigator.links);
    // history.pushState(1, 'hej', 'hej');
    this.webshop = new WebShop();
    this.gallery = new Gallery(document.querySelector('#gallery'));

    this.loadContent();

    // fetch('about.html')
    // .then (response => response.text())
    // .then(blob => {
    //   document.querySelector('#gallery').innerHTML = blob;
    // })
  }

  loadContent() {
    this.webshop.getData(url_prod)
      .then(response => {
      if (response.length === 0)
            console.log('Nothing found...');

        response.forEach(product => {
          this.gallery.addItem(product);
        })
      })
  }


}
