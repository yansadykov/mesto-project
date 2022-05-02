export default class UserInfo {
  constructor({
    usernameElementSelector,
    usernameInfoElementSelector,
    userAvatarSelector,
  }) {
    this._usernameElementSelector = usernameElementSelector;
    this._usernameInfoElementSelector = usernameInfoElementSelector;
    this._usernameElement = document.querySelector(
      `${this._usernameElementSelector}`
    );
    this._usernameInfoElement = document.querySelector(
      `${this._usernameInfoElementSelector}`
    );

    this._userAvatarSelector = userAvatarSelector;
    this._userAvatarElement = document.querySelector(
      `${this._userAvatarSelector}`
    );
  }

  setUserInfo(data) {
    this._usernameElement.textContent = data.name;
    this._usernameInfoElement.textContent = data.about;
    this._userAvatarElement.src = data.avatar;
  }

  getUserInfo() {
    return {
      name: this._usernameElement.textContent,
      about: this._usernameInfoElement.textContent,
      avatar: this._userAvatarElement.src,
    };
  }
}
