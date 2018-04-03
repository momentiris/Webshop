import Cart from '../components/cart';
export default class Webshop {

  constructor() {
    this.user = localStorage.user ?
    localStorage.user :
    localStorage.setItem('user', this.guid())

  }

  getProducts(url) {
    return window.fetch(url)
      .then(blob => blob.json())
      //You're trying to work out how to save fetched data in localstorage and check for it there before you fetch again.
      .catch(error => console.log(error));
  }

  getCart(url) {
    return window.fetch(`${url}/${this.user}`)
    .then(res => res.json())
    .catch(error => console.log(error));
  }

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }
}
