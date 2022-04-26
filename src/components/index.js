import "../pages/index.css";

import { api } from "./Api.js";
import Card from "./Card.js";
import UserInfo from "./UserInfo.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";


const elements = document.querySelector(".cards");

const username = document.querySelector("#username");
const usernameInfo = document.querySelector("#usernameinfo");

const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileImage = document.querySelector(".profile__avatar");

const profileForm = document.querySelector("#profileform");
const editProfilePicForm = document.querySelector("#profilepicform");
const addCardForm = document.querySelector("#new-card-form");

const imageInput = document.querySelector("#imagelink");
const placeInput = document.querySelector("#placename");

const editProfileButton = document.querySelector(".profile__edit-btn");
const profileSubmitButton = document.querySelector("#profilesubmitbutton");
const editProfilePicButton = document.querySelector("#editprofilepicbutton");
const profilePicSubmitButton = document.querySelector("#profilepicsubmitbutton");
const addCardButton = document.querySelector(".profile__photo-add-btn");
const cardSubmitButton = document.querySelector("#addcardbutton");

const settings = {
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button-submit",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_active",
    inactiveButtonClass: "form__save_inactive",
};

const userinfo = new UserInfo({ profileTitle, profileSubtitle });

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



function handleCardClick(cardData) {
    imagePopup.open(cardData);
} 

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



const imagePopup = new PopupWithImage('.popup-pic-open');



const editProfilePopup = new PopupWithForm('.profile-popup', {
    handleFormSubmit: (formData) => {
        renderLoading(true, profileSubmitButton);
        setUserInfo(formData)
            .then((data) => {
                profileTitle.textContent = data.name;
                profileSubtitle.textContent = data.description;
    
                editProfilePopup.close();
            })
            .catch((err) => console.log(err))
            .finally(() => renderLoading(false, profileSubmitButton));
    }
})

editProfileButton.addEventListener('click', () =>{
    username.value = profileTitle.textContent;
    usernameInfo.value = profileSubtitle.textContent;
    editProfilePopup.open();
});



const editProfilePicPopup = new PopupWithForm('.popup-profilepic', { 
    handleFormSubmit: (formData) => {
        renderLoading(true, profilePicSubmitButton);
        api.setAvatar(formData)
            .then((data) => {
                profileImage.src = data.avatar;
                editProfilePicPopup.close();
            })
            .catch((err) => console.log(err))
            .finally(() => renderLoading(false, profilePicSubmitButton));
    }
});

editProfilePicButton.addEventListener('click', () => {
    editProfilePicPopup.open();
});



const addCardPopup = new PopupWithForm('.new-card-popup', {
    handleFormSubmit: (formData) => {
        renderLoading(true, cardSubmitButton);
        api.addNewCard(placeInput.value, imageInput.value)
            .then((card) => {
                const addedCard = new Card(card, '#cardtemplate', handleCardClick, handleDeleteCard, handleLikes, card.owner._id);
                const cardElement = addedCard.generate();
                elements.prepend(cardElement);
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
})

addCardButton.addEventListener('click', () => {
    addCardPopup.open();
});


const profileFormValidator = new FormValidator(settings, profileForm);
profileFormValidator.enableValidation();

const editProfilePicFormValidator = new FormValidator(settings, editProfilePicForm);
editProfilePicFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(settings, addCardForm);
addCardFormValidator.enableValidation();