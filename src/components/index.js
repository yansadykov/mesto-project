import "../pages/index.css";

import { api } from "./Api.js";
import Card from "./card.js";
import UserInfo from "./UserInfo.js";
import { createCard } from "./card.js";

import { openEditProfilePic, openAddCardPopup } from "./modal.js";

import { enableValidation } from "./validate.js";
import { closePopup, openPopup, renderLoading } from "./utils.js";
import Section from "./Section";

const popups = document.querySelectorAll(".popup");

const profileForm = document.querySelector("#profileform");
const editProfileButton = document.querySelector(".profile__edit-btn");
const editProfilePicForm = document.querySelector("#profilepicform");
const editProfilePicButton = document.querySelector("#editprofilepicbutton");
const profilePopup = document.querySelector(".profile-popup");
const profilePicPopup = document.querySelector(".popup-profilepic");

const pictureLink = document.querySelector("#profilepicture");
const profilePicSubmitButton = document.querySelector("#profilepicsubmitbutton");

const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileImage = document.querySelector(".profile__avatar");
const profileSubmitButton = document.querySelector("#profilesubmitbutton");

const username = document.querySelector("#username");
const usernameInfo = document.querySelector("#usernameinfo");
//const card = new Card(items, '.elements', myId)

const addCardButton = document.querySelector(".profile__photo-add-btn");

const addCardPopup = document.querySelector("#item-form");
const addCardForm = document.querySelector("#new-card-form");
const imageInput = document.querySelector("#imagelink");
const placeInput = document.querySelector("#placename");
const cardSubmitButton = document.querySelector("#addcardbutton");

const elements = document.querySelector(".cards");

const userinfo = new UserInfo({ profileTitle, profileSubtitle });

function handleDeleteCard(evt, cardId) {
    removeCardServer(cardId)
        .then(() => {
            evt.target.closest(".card-item").remove();
        })
        .catch((err) => console.log(err));
}

function handleLikes(likeButton, cardLikes, cardInfo, myId) {
    const method = cardInfo.likes.some((like) => like._id === myId) !== false ? "DELETE" : "PUT";

    handleLikesServer(cardInfo, method)
        .then((data) => {
            cardInfo.likes = data.likes;
            cardLikes.textContent = cardInfo.likes.length;

            if (cardInfo.likes.some((like) => like._id === myId)) {
                likeButton.classList.add("card__like_active");
            } else {
                likeButton.classList.remove("card__like_active");
            }
        })
        .catch((err) => console.log(err));
}

function handleCardClick () {
    imagePopup.open()
    // popupImage.alt = newCard.name;
    // popupImage.src = cardImage.src;
    // popupImageCaption.textContent = newCard.name;
}

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cardsData]) => {
        userinfo.setUserInfo(userData);
        profileImage.src = userData.avatar;

        const cardsList = new Section({cardsData, 
            renderer: (item) => {
                const card = new Card(item, '#cardtemplate', handleCardClick, handleDeleteCard, handleLikes, userData._id);
                const cardElement =  card.generate();
                cardsList.setItem(cardElement);
             }
        }, '.cards')
    })
    .catch((err) => console.log(err));

function handleAddCardFormSubmit(evt) {
    evt.preventDefault();
    renderLoading(true, cardSubmitButton);
    addNewCard(placeInput.value, imageInput.value)
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


function openProfilePopup() {
    username.value = profileTitle.textContent;
    usernameInfo.value = profileSubtitle.textContent;
    openPopup(profilePopup);
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    renderLoading(true, profileSubmitButton);
    setUserInfo(username.value, usernameInfo.value)
        .then(() => {
            profileTitle.textContent = username.value;
            profileSubtitle.textContent = usernameInfo.value;

            closePopup(profilePopup);
        })
        .catch((err) => console.log(err))
        .finally(() => renderLoading(false, profileSubmitButton));
}

popups.forEach((popup) => {
    popup.addEventListener("mousedown", (evt) => {
        if (evt.target.classList.contains("popup_opened")) {
            closePopup(popup);
        }
        if (evt.target.classList.contains("popup__close-btn")) {
            closePopup(popup);
        }
    });
});

function handleEditProfilePic(evt) {
    evt.preventDefault();
    renderLoading(true, profilePicSubmitButton);
    setAvatar(pictureLink.value)
        .then((data) => {
            profileImage.src = data.avatar;
            closePopup(profilePicPopup);
        })
        .catch((err) => console.log(err))
        .finally(() => renderLoading(false, profilePicSubmitButton));
}


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
