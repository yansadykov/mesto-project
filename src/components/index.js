import "../pages/index.css";

import { api } from "./Api.js";
import Card from "./Card.js";
import UserInfo from "./UserInfo.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import { renderLoading } from "./utils.js";

import {
  username,
  usernameInfo,
  profileForm,
  editProfilePicForm,
  addCardForm,
  editProfileButton,
  profileSubmitButton,
  editProfilePicButton,
  profilePicSubmitButton,
  addCardButton,
  cardSubmitButton,
  settings,
} from "./constants.js";

const userinfo = new UserInfo({
  usernameElementSelector: ".profile__title",
  usernameInfoElementSelector: ".profile__subtitle",
  userAvatarSelector: ".profile__avatar",
});

const profileFormValidator = new FormValidator(settings, profileForm);
profileFormValidator.enableValidation();

const editProfilePicFormValidator = new FormValidator(
  settings,
  editProfilePicForm
);
editProfilePicFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(settings, addCardForm);
addCardFormValidator.enableValidation();

const cardsList = new Section(renderer, ".cards");

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    userinfo.setUserInfo(userData);
    cardsList.renderItems(cardsData, userData._id);
  })
  .catch((err) => console.log(err));

const imagePopup = new PopupWithImage(".popup-pic-open");

function renderer(item, myId) {
  return new Card(
    { data: item, myId },
    "#card-template",
    handleCardClick,
    handleDeleteCard,
    handleAddLikes,
    handleRemoveLikes
  ).generate();
}

function handleCardClick(cardData) {
  imagePopup.open(cardData);
}
imagePopup.setEventListeners();

function handleDeleteCard(evt, cardId) {
  api
    .removeCardServer(cardId)
    .then(() => {
      evt.target.closest(".card-item").remove();
    })
    .catch((err) => console.log(err));
}

function handleAddLikes(card) {
  api
    .likeCard(card._id)
    .then((cardData) => {
      card.addLike();
      card.countLikes(cardData.likes);
    })
    .catch((err) => console.log(err)); 
}

function handleRemoveLikes(card) {
  api
    .dislikeCard(card._id)
    .then((cardData) => {
      card.deleteLike();
      card.countLikes(cardData.likes);
    })
    .catch((err) => console.log(err));
}

const editProfilePopup = new PopupWithForm(".profile-popup", renderLoading, {
  handleFormSubmit: (formData) => {
    renderLoading(true, profileSubmitButton);
    api
      .setUserInfo(formData)
      .then((data) => {
        userinfo.setUserInfo(data);
        editProfilePopup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => renderLoading(false, profileSubmitButton));
  },
});
editProfilePopup.setEventListeners();

editProfileButton.addEventListener("click", () => {
  const newData = userinfo.getUserInfo();
  username.value = newData.name;
  usernameInfo.value = newData.about;
  editProfilePopup.open();
  editProfilePicFormValidator.resetValidation();
});

const editProfilePicPopup = new PopupWithForm(
  ".popup-profilepic",
  renderLoading,
  {
    handleFormSubmit: (formData) => {
      renderLoading(true, profilePicSubmitButton);
      api
        .setAvatar(formData.link)
        .then((data) => {
          userinfo.setUserInfo(data);
          editProfilePicPopup.close();
        })
        .catch((err) => console.log(err))
        .finally(() => renderLoading(false, profilePicSubmitButton));
    },
  }
);
editProfilePicPopup.setEventListeners();

editProfilePicButton.addEventListener("click", () => {
  editProfilePicPopup.open();
  editProfilePicFormValidator.resetValidation();
});

const addCardPopup = new PopupWithForm(".new-card-popup", renderLoading, {
  handleFormSubmit: (formData) => {
    renderLoading(true, cardSubmitButton, "Создать");
    api
      .addNewCard(formData.name, formData.link)
      .then((card) => {
        cardsList.addItem(card)
      })
      .then(() => {
        addCardPopup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => renderLoading(false, cardSubmitButton, "Создать"));
  },
});

addCardPopup.setEventListeners();

addCardButton.addEventListener("click", () => {
  addCardPopup.open();
  addCardFormValidator.resetValidation();
});
