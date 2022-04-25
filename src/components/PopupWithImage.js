class PopupWithImage extends Popup {
    constructor(selector){
        super(selector);
    }

    open(cardData){
        this._popupElement.querySelector('.popup-picture__img').alt = cardData.name;
        this._popupElement.querySelector('.popup-picture__img').src = cardData.link;
        this._popupElement.querySelector('.popup-picture__title').textContent = cardData.name;
    }
}