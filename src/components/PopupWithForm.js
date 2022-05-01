//import { cardSubmitButton } from "./constants.js";
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, renderLoading,{ handleFormSubmit }) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector(".form");
    this._submitButton = this._form.querySelector(".form__submit");
  }

  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._inputList = this._form.querySelectorAll(".form__input");
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  open(){
    super.open();
    this._submitButton.classList.add("form__save_inactive");
    this._submitButton.disabled = true;
  }

}
