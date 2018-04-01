export default class Navigator {

  constructor() {
    this.links = [...document.querySelectorAll('.page')]
    .map(_anchor => {
      _anchor.addEventListener('click', (e) => {
        e.preventDefault();
      })
        return _anchor.href;
    })

  }
}
