export default class Popup{
    constructor(selector){
        this._selector = selector;
        this._popupElement = document.querySelector(this._selector);
    }

    open(){
        this._popupElement.classList.add('popup_opened');
        document.addEventListener("keydown", this._handleEscClose);
    }

    close(){
        this._popupElement.classList.remove('popup_opened');
        document.addEventListener("keydown", this._handleEscClose);
    }

    _handleEscClose(){
        if (evt.key === "Escape") {
            this.close(document.querySelector(".popup_opened"));
        }
    }
}
