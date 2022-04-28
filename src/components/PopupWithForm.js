import { cardSubmitButton } from "./constants.js";
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
    constructor(selector, { handleFormSubmit }){
        super(selector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popupElement.querySelector('.form');
        this._submitButton = this._form.querySelector('.form__submit');
    }

    _getInputValues() {
        this._inputList = this._form.querySelectorAll('.form__input');
      
        this._formValues = {};

        this._inputList.forEach(input => {
          this._formValues[input.name] = input.value;
        });
      
        return this._formValues;
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
        super.setEventListeners();  
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.close();
        })
    }

    close(){
        super.close();
        this._form.reset();
    }

}