export default class Checkout {
	constructor (app) {
		this.app = app;

		this.documentFragment = document.createDocumentFragment();
		this.f = document.createElement('form');
		this.f.setAttribute('method','post');

		const msg = document.createElement('p');
		msg.innerHTML = "Please fill in your information.";


		const fName = document.createElement('input');
		fName.setAttribute('type','text');
		fName.setAttribute('name','first_name');
		fName.setAttribute('autocomplete', 'first_name');
		fName.required = true;


		const labelfName = document.createElement('label');
		labelfName.setAttribute('for', 'first_name');
		labelfName.innerText = "First name:";


		const lName = document.createElement('input');
		lName.setAttribute('type','text');
		lName.setAttribute('name','last_name');
		lName.setAttribute('autocomplete', 'last_name');
		lName.required = true;

		const labellName = document.createElement('label');
		labellName.setAttribute('for', 'last_name');
		labellName.innerText = "Last name:";

		const adress = document.createElement('input');
		adress.setAttribute('type','text');
		adress.setAttribute('name','adress');
		adress.setAttribute('autocomplete', 'adress');
		adress.required = true;


		const labelAdress = document.createElement('label');
		labelAdress.setAttribute('for', 'adress');
		labelAdress.innerText = "Adress:";

		const postCode = document.createElement('input');
		postCode.setAttribute('type','number');
		postCode.setAttribute('name','post_code');
		postCode.setAttribute('autocomplete', 'postal_code');
		postCode.required = true;


		const labelPostCode = document.createElement('label');
		labelPostCode.setAttribute('for', 'post_code');
		labelPostCode.innerText = "Postal code:";

		const city = document.createElement('input');
		city.setAttribute('type','text');
		city.setAttribute('name','city');
		city.setAttribute('autocomplete', 'city');
		city.required = true;


		const labelCity = document.createElement('label');
		labelCity.setAttribute('for', 'city');
		labelCity.innerText = "City:";

		const email = document.createElement('input');
		email.setAttribute('type', 'email');
		email.setAttribute('name', 'email');
		email.setAttribute('autocomplete', 'email');
		email.required = true;


		const labelEmail = document.createElement('label');
		labelEmail.setAttribute('for', 'email');
		labelEmail.innerText = "Email:";



		const s = document.createElement('button');
		s.setAttribute('type','submit');
		s.setAttribute('value','Submit');
		s.innerText = "Place order!";

		this.f.appendChild(msg);
		this.f.appendChild(labelfName);
		this.f.appendChild(fName);
		this.f.appendChild(labellName)
		this.f.appendChild(lName);
		this.f.appendChild(labelEmail);
		this.f.appendChild(email);
		this.f.appendChild(labelAdress);
		this.f.appendChild(adress);
		this.f.appendChild(labelPostCode);
		this.f.appendChild(postCode);
		this.f.appendChild(labelCity);
		this.f.appendChild(city);
		this.f.appendChild(s);
		this.documentFragment.appendChild(this.f);

		this.f.addEventListener('submit',this.app.webshop.placeOrder);

	}



}
