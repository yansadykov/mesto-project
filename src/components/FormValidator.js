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
        this._showInputError(inputElement);
    } else {
        this._hideInputError(inputElement);
    }
  };
  

  _toggleButtonState (buttonElement, inputList) {
    if (this._hasInvalidInput(inputList)) {
 

        buttonElement.classList.add(this._inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  };

  _hasInvalidInput (inputList) {
      return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      });
    };


  _showInputError (inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  };
  

  _hideInputError = (inputElement) => {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  };

  _setEventListeners ()  {
    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));


    const buttonElement = this._form.querySelector(this._submitButtonSelector);
    this._toggleButtonState(buttonElement, inputList)
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
            this._checkInputValidity(inputElement);
  
           this._toggleButtonState(buttonElement, inputList);

        });
    });
  };

  enableValidation() {
    this._setEventListeners();
  }
  
}
// const setEventListeners = (formElement, settings) => {
//   const inputList = Array.from(
//     formElement.querySelectorAll(settings.inputSelector)
//   );
//   const buttonElement = formElement.querySelector(
//     settings.submitButtonSelector
//   );

//   toggleButtonState(inputList, buttonElement, settings);

//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener("input", function () {
//       checkInputValidity(formElement, inputElement, settings);
//       toggleButtonState(inputList, buttonElement, settings);
//     });
//   });
// };

// const checkInputValidity = (formElement, inputElement, settings) => {
//   if (!inputElement.validity.valid) {
//     showInputError(
//       formElement,
//       inputElement,
//       inputElement.validationMessage,
//       settings
//     );
//   } else {
//     hideInputError(formElement, inputElement, settings);
//   }
// };

  // const toggleButtonState = (inputList, buttonElement, settings) => {
  //   if (hasInvalidInput(inputList)) {
  //     buttonElement.classList.add(settings.inactiveButtonClass);
  //     buttonElement.disabled = true;
  //   } else {
  //     buttonElement.classList.remove(settings.inactiveButtonClass);
  //     buttonElement.disabled = false;
  //   }
  // };
  
  // const hasInvalidInput = (inputList) => {
  //   return inputList.some((inputElement) => {
  //     return !inputElement.validity.valid;
  //   });
  // };
  