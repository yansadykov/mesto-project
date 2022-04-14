import "../pages/index.css";

import { fetchGetUserInfo, fetchInitialCards, fetchDeleteCard, fetchHandleLikes } from "./api.js";
import { createCard, handleAddCardFormSubmit } from "./card.js";

import { openProfilePopup, handleProfileFormSubmit, openEditProfilePic, handleEditProfilePic, openAddCardPopup } from "./modal.js";

import { enableValidation } from "./validate.js";
import { closePopup } from "./utils.js";

const popups = document.querySelectorAll(".popup");

const popupCloseBtn = document.querySelectorAll(".popup__close-btn");

const profileForm = document.querySelector("#profileform");
const editProfileButton = document.querySelector(".profile__edit-btn");
const editProfilePicForm = document.querySelector("#profilepicform");
const editProfilePicButton = document.querySelector("#editprofilepicbutton");

const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileImage = document.querySelector(".profile__avatar");

const addCardForm = document.querySelector("#new-card-form");
const addCardButton = document.querySelector(".profile__photo-add-btn");

const elements = document.querySelector(".cards");

Promise.all([fetchGetUserInfo(), fetchInitialCards()])
    .then(([userData, cardsData]) => {
        profileTitle.textContent = userData.name;
        profileSubtitle.textContent = userData.about;
        profileImage.src = userData.avatar;

        const handleLikes = (evt, cardLikes, newCard, myId) => {
            const method = newCard.likes.some((like) => like._id === myId) !== false ? "DELETE" : "PUT";
            
            fetchHandleLikes(newCard, method)
                .then((data) => {
                    newCard.likes = data.likes;
                    cardLikes.textContent = newCard.likes.length;
        
                    if (newCard.likes.some((like) => like._id === myId)) {
                        evt.target.classList.add("card__like_active");
                    } else {
                        evt.target.classList.remove("card__like_active");
                    }
                })
                .catch((err) => console.log(err));
        }

        const deleteCard = (evt, newCard) => {
            fetchDeleteCard(newCard)
                    .then(() => {
                        evt.target.closest(".card-item").remove();
                    })
                    .catch((err) => console.log(err));
        }
        

        const cards = cardsData.map((card) => {
            return createCard(card, userData._id, handleLikes, deleteCard);
        });

        elements.prepend(...cards);
    })
    .catch((err) => console.log(err));

popups.forEach((popup) => {
    popup.addEventListener("mousedown", (evt) => {
        if (evt.target.classList.contains("popup_opened")) {
            closePopup(popup);
        }
        if (evt.target.classList.contains("popup__close")) {
            closePopup(popup);
        }
    });
});

popupCloseBtn.forEach((clsBtn) => {
    clsBtn.addEventListener("click", () => {
        popups.forEach((popup) => {
            closePopup(popup);
        });
    });
});

enableValidation({
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button-submit",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_active",
    inactiveButtonClass: "form__save_inactive",
});

profileForm.addEventListener("submit", handleProfileFormSubmit);
editProfileButton.addEventListener("click", openProfilePopup);
editProfilePicButton.addEventListener("click", openEditProfilePic);
editProfilePicForm.addEventListener("submit", handleEditProfilePic);

addCardForm.addEventListener("submit", handleAddCardFormSubmit);
addCardButton.addEventListener("click", openAddCardPopup);
