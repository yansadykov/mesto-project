import { openPopup } from "./utils.js";
import { handleLikesServer, removeCardServer } from "./Api.js"
import { data } from "autoprefixer";

const popupImage = document.querySelector(".popup-picture__img");
const popupImageCaption = document.querySelector(".popup-picture__title");

const cardTemplate = document.querySelector("#card-template").content;

const imagePopup = document.querySelector("#popup-pic-open");


//const card = new Card(items, '.elements', myId)

class Card {
    constructor(data, selector, myId){
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._selector = selector;
        this._myId = myId;
        this._owner.id = data.owner._id;
        this._id = data._id;
    }

    _getElement(){
        const cardElement = cardTemplate.querySelector(".card-item").cloneNode(true);

        return cardElement;
    }


    generate() {
        this._element = this._getElement;

        this._element.querySelector(".card__img").src = this._link;
        this._element.querySelector(".card__title").textContent = this._name;
        this._element.querySelector(".card__title").alt = this._name;
        this._element.querySelector(".card__like-count").textContent = this._likes.length;

        if (this._likes.some((like) => like._id === this._myId)) {
            this._element.querySelector(".card__like").classList.add("card__like_active");
        }

        if (this._owner.id !== this._myId) {
            this._element.querySelector(".card__delete").style.display = "none";
        }

        return this._element;
    }

    _setEventListeners(){
        this._element.querySelector(".card__delete").addEventListener("click", (evt) => {
            deleteCard(evt, this._id);
        });

        this._element.querySelector(".card__like").addEventListener("click", () => {
            handleLikes(cardLikeButton, cardLikes, newCard, myId);
        });

        this._element.querySelector(".card__img").addEventListener("click", function () {
            popupImage.alt = newCard.name;
            popupImage.src = cardImage.src;
            popupImageCaption.textContent = newCard.name;
            openImagePopup();
        });
    }
}



const handleLikes = (likeButton, cardLikes, newCard, myId) => {
    const method = newCard.likes.some((like) => like._id === myId) !== false ? "DELETE" : "PUT";

    handleLikesServer(newCard, method)
        .then((data) => {
            newCard.likes = data.likes;
            cardLikes.textContent = newCard.likes.length;

            if (newCard.likes.some((like) => like._id === myId)) {
                likeButton.classList.add("card__like_active");
            } else {
                likeButton.classList.remove("card__like_active");
            }
        })
        .catch((err) => console.log(err));
};

function deleteCard(evt, cardId) {
    removeCardServer(cardId)
        .then(() => {
            evt.target.closest(".card-item").remove();
        })
        .catch((err) => console.log(err));
}



export function openImagePopup() {
    openPopup(imagePopup);
}
