
export default class Navigator {

	constructor(app) {
		this.url = window.location.href;
		console.log(this.url);
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
			case `${this.url}products`:
				window.history.pushState(e.target.href, null, e.target.href);
				this.app.addProductsToGallery()
				this.app.gallery.formWrap.style.cssText = "display: none";
				break;

			case `${this.url}checkout`:
				window.history.pushState(e.target.href, null, e.target.href);
				this.app.addCartToGallery();

				document.querySelector(`form`) ?
				this.app.gallery.formWrap.style.cssText = "display: block" :
				this.app.gallery.formWrap.appendChild(this.app.gallery.checkout.documentFragment);

				break;

			case `${this.url}`:
				window.history.pushState(e.target.href, null, e.target.href);
				this.app.gallery.element.innerHTML = this.app.start;
				this.app.gallery.formWrap.style.cssText = "display: none";

				break;
		}
	}

	handlePopState() {
		window.addEventListener('popstate', (e) => {

			switch (e.state) {
				case `${this.url}products`:
					this.app.addProductsToGallery();
					break;
				case `${this.url}checkout`:
					this.app.addCartToGallery();
					break;
					case `${this.url}`:
					this.app.gallery.element.innerHTML = this.app.start;
					break;
			}
		})
	}

}
