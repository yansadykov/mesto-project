export default class UserInfo {
    constructor( { usernameElement, usernameInfoElement} ){
        this._usernameElement = usernameElement;
        this._usernameinfoElement = usernameInfoElement;
    }

    getUserInfo(){
        return {
            name: this._usernameElement.textContent,
            about: this._usernameinfoElement.textContent
        }
    }

    setUserInfo(data){
        this._usernameElement = data.name;
        this._usernameinfoElement = data.about;
    }
}