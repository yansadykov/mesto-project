import { fetchHandleLikes, fetchAddNewCard, fetchDeleteCard } from "./api.js";
import { openPopup, closePopup, renderLoading } from "./utils.js";

const popupImage = document.querySelector(".popup-picture__img");
const popupImageCaption = document.querySelector(".popup-picture__title");

const cardTemplate = document.querySelector("#card-template").content;

const addCardPopup = document.querySelector("#item-form");
const addCardForm = document.querySelector("#new-card-form");
const imageInput = document.querySelector("#imagelink");
const placeInput = document.querySelector("#placename");
const cardSubmitButton = document.querySelector("#addcardbutton");

const imagePopup = document.querySelector("#popup-pic-open");

const elements = document.querySelector(".cards");

export function createCard(newCard, myId, handleLikesFunc, deleteCardFunc) {
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

        cardDeleteButton.addEventListener("click",(evt) => {
            deleteCardFunc(evt, newCard);
        })
    
    } else {
        cardDeleteButton.style.display = "none";
    }

    cardImage.addEventListener("click", function () {
        popupImage.alt = newCard.name;
        popupImage.src = cardImage.src;
        popupImageCaption.textContent = newCard.name;
        openImagePopup();
    });

    cardLikeButton.addEventListener("click", (evt) => {
        handleLikesFunc(evt, cardLikes, newCard, myId)
        
    });
    return cardElement;
}

export function handleAddCardFormSubmit(evt) {
    evt.preventDefault();
    renderLoading(true, cardSubmitButton);
    fetchAddNewCard(placeInput.value, imageInput.value)
        .then((card) => {
            elements.prepend(createCard(card, card.owner._id));
        })
        .then(() => {
            closePopup(addCardPopup);
            addCardForm.reset();
            cardSubmitButton.classList.add("form__save_inactive");
            cardSubmitButton.disabled = true;
        })
        .catch((err) => console.log(err))
        .finally(() => renderLoading(false, cardSubmitButton));
}



export function openImagePopup() {
    openPopup(imagePopup);
}


