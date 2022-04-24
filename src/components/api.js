class Api{
    constructor({ baseUrl, headers }){
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getUserInfo(){
        return fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: this._headers,
        }).then((res) => this._checkResponse(res));
    }

    setUserInfo(userName, userInfo){
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: userName,
                about: userInfo,
            }),
        }).then((res) => this._checkResponse(res));
    }

    getInitialCards(){
        return fetch(`${this_.baseUrl}/cards`, {
            method: "GET",
            headers: this._headers,
        }).then((res) => this._checkResponse(res));
    }

    setAvatar(link){
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: link,
            }),
        }).then((res) => this._checkResponse(res));
    }

    addNewCard(placename, imagelink){
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: placename,
                link: `${imagelink}`,
            }),
        }).then((res) => this._checkResponse(res));
    }

    removeCardServer(cardId){
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        }).then((res) => this._checkResponse(res));
    }

    handleLikesServer(cardId, method){
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: method,
            headers: this._headers,
        }).then((res) => this._checkResponse(res));
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}


export const api = new Api({
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-8',
    headers: {
      authorization: "837c0be1-5609-4c04-b384-491cd26df7eb",
      'Content-Type': 'application/json'
    }
}); 
