export default class PopupWithForm extends Popup{
    constructor(selector, { handleFormSubmit }){
        super(selector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.form');
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
      
    setEventListeners(){
        super.setEventListeners();  
        this,_handleFormSubmit = this._getInputValues();
        // this._submitButton.addEventlistener('submit', this._handleFormSubmit);
    }

    close(){
        super.close();
        this._form.reset();
    }

}