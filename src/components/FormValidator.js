export default class FormValidator{
  constructor(settings, form){
    this._form = form;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
  }

  _checkInputValidity (inputElement) {
    const isInputValid = inputElement.validity.valid;
  
    if (!isInputValid) {
        this._showInputError(this._form, inputElement);
    } else {
        this._hideInputError(this._form, inputElement);
    }
  };
  

  _toggleButtonState (buttonElement, isActive = false) {
    if (isActive) {
        buttonElement.classList.remove(this._inactiveButtonClass);
        buttonElement.disabled = false;
    } else {
        buttonElement.classList.add(this._inactiveButtonClass);
        buttonElement.disabled = true;
    }
  };


  _showInputError (inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  };
  

  _hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  };

  _setEventListeners ()  {
    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    console.log(inputList);

    const buttonElement = this._form.querySelector(this._submitButtonSelector);
    this._toggleButtonState(buttonElement, this._checkInputValidity());
    console.log(buttonElement);
    inputList.forEach((inputElement) => {
      console.log(inputElement);
        inputElement.addEventListener("input", function () {
            this._checkInputValidity(inputElement);
  
           this._toggleButtonState(buttonElement, this._checkInputValidity());

        });
    });
  };

  enableValidation() {
    this._setEventListeners();
  }
  
}