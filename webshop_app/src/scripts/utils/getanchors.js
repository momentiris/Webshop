
export default function getAnchors() {
  return [...document.querySelectorAll('.page')]
  .map(_anchor => {
      return _anchor;
  })
}
