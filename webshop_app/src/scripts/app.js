import WebShop from './utils/webshop';
import getAnchors from './utils/getanchors';
import Gallery from './components/Gallery.js';
import {url_prod, url_cart} from './url';


export default class App {

  constructor () {


    this.anchors = getAnchors();

    this.currentState = this.navigation(this.anchors);

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

  navigation(anchors) {
    anchors.map(anchor => {
      return anchor.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('hej');
        // history.replaceState('hej', 'hej', _anchor.href);
      })
    })
  }





}
