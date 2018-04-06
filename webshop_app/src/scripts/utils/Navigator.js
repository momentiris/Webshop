
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
				this.app.addProductsToGallery()
				this.app.gallery.formWrap.style.cssText = "display: none";
				break;

			case 'http://webshop_app.test/checkout':
				window.history.pushState(e.target.href, null, e.target.href);
				this.app.addCartToGallery();

				document.querySelector('form') ?
				this.app.gallery.formWrap.style.cssText = "display: block" :
				this.app.gallery.formWrap.appendChild(this.app.gallery.checkout.documentFragment);

				break;

			case 'http://webshop_app.test/':
				window.history.pushState(e.target.href, null, e.target.href);
				this.app.gallery.element.innerHTML = this.app.start;
				this.app.gallery.formWrap.style.cssText = "display: none";


				break;
		}
	}

	handlePopState() {
		window.addEventListener('popstate', (e) => {

			switch (e.state) {
				case 'http://webshop_app.test/products':
					this.app.addProductsToGallery();
					break;
				case 'http://webshop_app.test/checkout':
					this.app.addCartToGallery();
					break;
					case 'http://webshop_app.test/':
					this.app.gallery.element.innerHTML = this.app.start;
					break;
			}
		})
	}

}
