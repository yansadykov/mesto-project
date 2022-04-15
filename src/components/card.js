import { openPopup } from "./utils.js";
import { deleteCard, handleLikes } from "./index.js";

const popupImage = document.querySelector(".popup-picture__img");
const popupImageCaption = document.querySelector(".popup-picture__title");

const cardTemplate = document.querySelector("#card-template").content;

const imagePopup = document.querySelector("#popup-pic-open");

//const elements = document.querySelector(".cards");

export function createCard(newCard, myId, handleLikesFunc) {
    const cardElement = cardTemplate.querySelector(".card-item").cloneNode(true);
    const cardImage = cardElement.querySelector(".card__img");
    const cardDeleteButton = cardElement.querySelector(".card__delete");
    const cardLikeButton = cardElement.querySelector(".card__like");
    const cardLikes = cardElement.querySelector(".card__like-count");
    const cardText = cardElement.querySelector(".card__title");

    cardImage.alt = newCard.name;
    cardImage.src = newCard.link;
    cardText.textContent = newCard.name;
    cardLikes.textContent = newCard.likes.length;

    if (newCard.likes.some((like) => like._id === myId)) {
        cardLikeButton.classList.add("card__like_active");
    }

    if (newCard.owner._id === myId) {
        cardDeleteButton.addEventListener("click", (evt) => {
            deleteCard(evt, newCard);
        });
    } else {
        cardDeleteButton.style.display = "none";
    }

    cardImage.addEventListener("click", function () {
        popupImage.alt = newCard.name;
        popupImage.src = cardImage.src;
        popupImageCaption.textContent = newCard.name;
        openImagePopup();
    });

    cardLikeButton.addEventListener("click", () => {
        handleLikes(cardLikeButton, cardLikes, newCard, myId);
    });
    return cardElement;
}

export function openImagePopup() {
    openPopup(imagePopup);
}
