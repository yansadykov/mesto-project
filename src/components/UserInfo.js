export default class UserInfo {
    constructor( { usernameElementSelector, usernameInfoElementSelector} ){
        this._usernameElementSelector = usernameElementSelector;
        this._usernameInfoElementSelector = usernameInfoElementSelector;
        this._usernameElement = document.querySelector(`${this._usernameElementSelector}`);
        this._usernameInfoElement = document.querySelector(`${this._usernameInfoElementSelector}`);
    }



    setUserInfo(data){
        this._usernameElement.textContent = data.name;
        this._usernameInfoElement.textContent = data.about;
    }

    getUserInfo(){
        return {
            name: this._usernameElement.textContent,
            about: this._usernameInfoElement.textContent
        }
    }
}