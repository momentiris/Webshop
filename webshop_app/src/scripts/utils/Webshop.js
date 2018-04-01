

export default class Webshop {

  constructor() {
    this.user = localStorage.user ?
    localStorage.user :
    localStorage.setItem('user', this.guid())

  }

  getData(url) {
    return window.fetch(url)
      .then(blob => blob.json())
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
