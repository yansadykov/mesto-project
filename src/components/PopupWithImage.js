import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupImage = this._popupElement.querySelector(".popup-picture__img");
    this._popupTitle = this._popupElement.querySelector(".popup-picture__title");
  }

  open(cardData) {
    this._popupImage.alt = cardData.name;
    this._popupImage.src = cardData.link;
    this._popupTitle.textContent =
      cardData.name;
    super.open();
  }
}
