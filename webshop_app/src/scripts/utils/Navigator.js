
export default class Navigator {

	constructor(app) {
		this.app = app;
		this.anchors = [...document.querySelectorAll('.page')]
	  .map(_anchor => {
				_anchor.addEventListener('click', this.handlePushstate.bind(this))
	      return _anchor;
	  })
	}

	handlePushstate(e) {
		event.preventDefault();

		switch (e.target.href) {
			case 'http://webshop_app.test/products':
				window.history.pushState(e.target.href, null, e.target.href);
				this.app.fetchProducts()
				break;
			case 'http://webshop_app.test/checkout':
				window.history.pushState(e.target.href, null, e.target.href);
				this.app.fetchCart();
				break;
			case 'http://webshop_app.test/':
				window.history.pushState(e.target.href, null, e.target.href);
				this.app.gallery.element.innerHTML = this.app.start;
				break;
		}
	}

	handlePopState() {
		window.addEventListener('popstate', (e) => {

			switch (e.state) {
				case 'http://webshop_app.test/products':
					this.app.fetchProducts();
					break;
				case 'http://webshop_app.test/checkout':
					this.app.fetchCart();
					break;
					case 'http://webshop_app.test/':
					this.app.gallery.element.innerHTML = this.app.start;
					break;
			}
		})
	}

}
