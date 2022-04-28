import "../pages/index.css";

import {api} from "./Api.js";
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
// const profileTitleSelector = ".profile__title";
// const profileSubtitleSelector = ".profile__subtitle";
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
export const cardSubmitButton = document.querySelector("#addcardbutton");

const settings = {
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button-submit",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_active",
    inactiveButtonClass: "form__save_inactive",
};

const userinfo = new UserInfo({ usernameElementSelector: ".profile__title", usernameInfoElementSelector: ".profile__subtitle" });


Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cardsData]) => {
        userinfo.setUserInfo(userData);
        
        profileImage.src = userData.avatar;

        const cardsList = new Section({items: cardsData, 
            renderer: (item) => {
                const card = new Card({data: item, myId: userData._id}, '#card-template', handleCardClick, handleDeleteCard, handleLikes);
                const cardElement = card.generate();
                cardsList.addItem(cardElement);
             }
        }, '.cards')

        cardsList.renderItems();



    })
    .catch((err) => console.log(err));



const imagePopup = new PopupWithImage('.popup-pic-open');

function handleCardClick(cardData) {
    imagePopup.open(cardData);
    
} 

imagePopup.setEventListeners();



function handleDeleteCard(evt, cardId) {
    api.removeCardServer(cardId)
        .then(() => {
            evt.target.closest(".card-item").remove();
        })
        .catch((err) => console.log(err));
}


function handleLikes(likeButton, cardLikes, cardInfo, myId) {
    const method = cardInfo.likes.some((like) => like._id === myId) !== false ? "DELETE" : "PUT";

    api.handleLikesServer(cardInfo, method)
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







const editProfilePopup = new PopupWithForm('.profile-popup', {
    handleFormSubmit: (formData) => {
        editProfilePopup.renderLoading(true, profileSubmitButton);
        api.setUserInfo(formData)
            .then((data) => {
            userinfo.setUserInfo(data);
            })
            .catch((err) => console.log(err))
            .finally(() => editProfilePopup.renderLoading(false, profileSubmitButton));
    }
});
editProfilePopup.setEventListeners();

editProfileButton.addEventListener('click', () => {
    const newData = userinfo.getUserInfo();
    username.value = newData.name;
    usernameInfo.value = newData.about;
    editProfilePopup.open();
});




const editProfilePicPopup = new PopupWithForm('.popup-profilepic', { 
    handleFormSubmit: (formData) => {
        editProfilePicPopup.renderLoading(true, profilePicSubmitButton);
        api.setAvatar(formData.link )
            .then((data) => {
                profileImage.src = data.avatar;
                editProfilePicPopup.close();
                console.log(formData);
            })
            .catch((err) => console.log(err))
            .finally(() => editProfilePicPopup.renderLoading(false, profilePicSubmitButton));
    }
});
editProfilePicPopup.setEventListeners();

editProfilePicButton.addEventListener('click', () => {
    editProfilePicPopup.open();
});



const addCardPopup = new PopupWithForm('.new-card-popup', {
    handleFormSubmit: (formData) => {
        addCardPopup.renderLoading(true, cardSubmitButton);
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
            .finally(() => addCardPopup.renderLoading(false, cardSubmitButton));
    }
})

addCardPopup.setEventListeners();

addCardButton.addEventListener('click', () => {
    addCardPopup.open();
});


const profileFormValidator = new FormValidator(settings, profileForm);
profileFormValidator.enableValidation();

const editProfilePicFormValidator = new FormValidator(settings, editProfilePicForm);
editProfilePicFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(settings, addCardForm);
addCardFormValidator.enableValidation();