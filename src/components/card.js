import { openPopup } from "./utils.js";
import { handleLikesServer, removeCardServer } from "./Api.js"
// import { data } from "autoprefixer";

const popupImage = document.querySelector(".popup-picture__img");
const popupImageCaption = document.querySelector(".popup-picture__title");

const cardTemplate = document.querySelector("#card-template").content;

const imagePopup = document.querySelector("#popup-pic-open");


class Card {
    constructor(data, selector, handleCardClick, handleDeleteCard, handleLikes, myId){
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._selector = selector;
        this._owner.id = data.owner._id;
        this._id = data._id;
        this._myId = myId;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCard = handleDeleteCard;
        this._handleLikes = handleLikes;
        this._cardInfo = data;
    }

    _getElement(){
        const cardElement = document.querySelector(this._selector).content.querySelector('.card-item').cloneNode(true);

        return cardElement;
    }


    generate() {
        this._element = this._getElement;

        this._element.querySelector(".card__img").src = this._link;
        this._element.querySelector(".card__title").textContent = this._name;
        this._element.querySelector(".card__title").alt = this._name;
        const cardImage = this._element.querySelector(".card__img");
        const cardDeleteButton = this._element.querySelector(".card__delete");
        const cardLikeButton = this._element.querySelector('.card__like');
        const cardLikes = this._element.querySelector(".card__like-count");
        cardLikes.textContent = cardInfo.likes.length;

        if (cardInfo.likes.some((like) => like._id === this._myId)) {
            cardLikeButton.classList.add("card__like_active");
        }

        if (this._owner.id !== this._myId) {
            cardDeleteButton.style.display = "none";
        }

        return this._element;
    }

    _setEventListeners(){
        cardDeleteButton.addEventListener("click", (evt) => {
            deleteCard(evt, this._id);
        });

        cardLikeButton.addEventListener("click", () => {
            handleLikes(cardLikeButton, cardLikes, this._cardInfo, this._myId);
        });

        cardImage.addEventListener("click", () => { 
            handleCardClick(this._cardInfo);
        });
    }
}

