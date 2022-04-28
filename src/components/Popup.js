export default class Popup{
    constructor(selector){
        this._selector = selector;
        this._popupElement = document.querySelector(this._selector);
    }

<<<<<<< HEAD

    
    _handleOverlayClose(evt){
        if (evt.target.classList.contains("popup")) {

            console.log(this);
                this.close();
            
        }
    }

    _handleEscClose(evt){
        evt.preventDefault();
        if (evt.key === "Escape") {
            this._popupElement.close();
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
            console.log(this);
            this.close();
        })
    }

    open(){
        this._popupElement.classList.add('popup_opened');
        window.addEventListener("keydown", this._handleEscClose);
        this._popupElement.addEventListener("mousedown", this._handleOverlayClose);
    }

    close(){
        this._popupElement.classList.remove('popup_opened');

        

        window.removeEventListener("keydown", this._handleEscClose);
        this._popupElement.removeEventListener("mousedown", this._handleOverlayClose);
    }

=======
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
    
      setEventListeners() {
        this._popupElement.addEventListener("mousedown", (evt) => {
          if (evt.target.classList.contains("popup_opened") || evt.target.classList.contains("popup__close-btn")) {
            this.close();
          }
        });
      }
    
>>>>>>> a1dcaf7a5345098ea75ad878871379ed742fff5e
}
