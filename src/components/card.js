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

export function createCard({ name, link, _id, owner, likes }, myId) {
    const cardElement = cardTemplate.querySelector(".card-item").cloneNode(true);
    const cardImage = cardElement.querySelector(".card__img");
    const cardDeleteButton = cardElement.querySelector(".card__delete");
    const cardLikeButton = cardElement.querySelector(".card__like");
    const cardLikes = cardElement.querySelector(".card__like-count");
    const cardText = cardElement.querySelector(".card__title");

    cardImage.alt = name;
    cardImage.src = link;
    cardText.textContent = name;
    cardLikes.textContent = `${likes.length}`;

    if (likes.some((like) => like._id === myId)) {
        cardLikeButton.classList.add("card__like_active");
    }

    if (owner._id === myId) {
        cardDeleteButton.addEventListener("click", () => {
            fetchDeleteCard(_id).then(() => {
                cardElement.remove();
            })
            .catch((err) => console.log(err));
        });
    } else {
        cardDeleteButton.style.display = "none";
    }

    cardImage.addEventListener("click", function () {
        popupImage.alt = name;
        popupImage.src = cardImage.src;
        popupImageCaption.textContent = name;
        openImagePopup();
    });

    cardLikeButton.addEventListener("click", function handleLikes() {
        const myLike = likes.find((like) => like._id === myId);
        const method = myLike !== undefined ? "DELETE" : "PUT";
        fetchHandleLikes(_id, method)
            .then((data) => {
                likes = data.likes;
                cardLikes.textContent = `${likes.length}`;

                if (likes.some((like) => like._id === myId)) {
                    cardLikeButton.classList.add("card__like_active");
                } else {
                    cardLikeButton.classList.remove("card__like_active");
                }
            })
            .catch((err) => console.log(err));
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


