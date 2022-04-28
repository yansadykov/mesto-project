import { cardSubmitButton } from "./index.js";
export default class Popup{
    constructor(selector){
        this._selector = selector;
        this._popupElement = document.querySelector(this._selector);
    }

     open() {
        this._popupElement.classList.add("popup_opened");
        document.addEventListener("keydown", this._handleEscClose);
      }
    
      close() {
        this._popupElement.classList.remove("popup_opened");
        document.removeEventListener("keydown", this._handleEscClose);
      }
    
      _handleEscClose(evt) {
        if (evt.key === "Escape") {
          document.querySelector(".popup_opened").classList.remove("popup_opened");
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
    
      setEventListeners() {
        this._popupElement.addEventListener("mousedown", (evt) => {
          if (evt.target.classList.contains("popup_opened")) {
            this.close();
          }
          if (evt.target.classList.contains("popup__close-btn")) {
            this.close();
          }
        });
      }
    
}
