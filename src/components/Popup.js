import { cardSubmitButton } from "./index.js";
export default class Popup{
    constructor(selector){
        this._selector = selector;
        this._popupElement = document.querySelector(this._selector);
        this._closeButton = this._popupElement.querySelector('.popup__close-btn');
    }

    open(){
        this._popupElement.classList.add('popup_opened');
        document.addEventListener("keydown", this._handleEscClose);
        this._popupElement.addEventListener("mousedown", this._handleOverlayClose);
    }

    close(){
        this._popupElement.classList.remove('popup_opened');

        

        document.removeEventListener("keydown", this._handleEscClose);
        this._popupElement.removeEventListener("mousedown", this._handleOverlayClose);
    }

    
    _handleOverlayClose(evt){
        if (evt.target.classList.contains("popup_opened")) {
            //const openedPopup = document.querySelector(".popup_opened");
            
            this.close();
            
            
        }
    }

    _handleEscClose(evt){
        if (evt.key === "Escape") {
            this.close(document.querySelector(".popup_opened"));
        }
    }

    renderLoading(isLoading, someButton) {
        if (isLoading) {
            someButton.textContent = "Сохранение...";
        } else if (someButton === cardSubmitButton) {
            someButton.textContent = "Создать";
        } else {
            someButton.textContent = "Сохранить";
        }
    }

    setEventListeners(){
        this._closeButton.addEventListener('click', () => {
            this.close();
            console.log('123');
        })
    }
}

