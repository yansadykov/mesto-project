export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items, myId) {
    this._items = items;
    this._myId = myId;
    this._items.forEach((item) => {
      this.addItem(item);
    });
  }

  addItem(item) {
    const card = this._renderer(item, this._myId);
    this._container.prepend(card);
  }
}