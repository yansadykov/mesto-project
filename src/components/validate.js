class Validate{
  constructor(settings, form){
    this._form = form;
    this.inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
  }


  enableValidation() {
    this._setEventListeners();
  }

   _setEventListeners ()  {
    const inputList = Array.from(this._form.querySelectorAll(this.inputSelector));
    const buttonElement = this._form.querySelector(this._submitButtonSelector);
  
    toggleButtonState(buttonElement, this._checkInputValidity());
  
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function () {
            checkInputValidity(this._form, inputElement);
  
            toggleButtonState(buttonElement, this._checkInputValidity());
        });
    });
  };

  _checkInputValidity () {
    const isInputValid = inputElement.validity.valid;
  
    if (!isInputValid) {
        showInputError(this._form, inputElement);
    } else {
        hideInputError(this._form, inputElement);
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
  

}




















// export const enableValidation = (settings) => {
//   const forms = document.querySelectorAll(settings.formSelector);

//   [...forms].forEach((form) => {
//       setEventListeners(form, settings);
//   });
// };







