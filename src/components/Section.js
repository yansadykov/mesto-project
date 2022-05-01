export default class Section {
  constructor({ items, myId }, renderer, containerSelector) {
    this._items = items;
    this._myId = myId;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }


  renderItems(){
    this._items.forEach((item) => {
        this.addItem(item);
    })
}



  addItem(item) {
    const card = this._renderer(item, this._myId)
    this._container.prepend(card);
  }
}
