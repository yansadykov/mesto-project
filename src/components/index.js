import "../pages/index.css";

import { api } from "./Api.js";
import Card from "./Card.js";
import UserInfo from "./UserInfo.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";

import {
  elements,
  username,
  usernameInfo,
  profileImage,
  profileForm,
  editProfilePicForm,
  addCardForm,
  imageInput,
  placeInput,
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

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cardsData]) => {
        userinfo.setUserInfo(userData);
        const cardsList = new Section({items: cardsData, myId: userData._id}, renderer,  '.cards')
        cardsList.renderItems()
    })
    .catch((err) => console.log(err));



const imagePopup = new PopupWithImage('.popup-pic-open');


function renderer(item, myId){
  return new Card({data: item, myId}, '#card-template', handleCardClick, handleDeleteCard, handleAddLikes, handleRemoveLikes).generate();
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

function handleAddLikes() {
  api.likeCard(this._id)
  .then((cardData) => {
    this.countLikes(cardData.likes);
  })
  .catch((err) => console.log(err));
}

function handleRemoveLikes() {
  api.dislikeCard(this._id)
  .then((cardData) => {
    this.countLikes(cardData.likes);
  })
  .catch((err) => console.log(err));
}

// function handleLikes(card) {
//   const method =
//     card._likes.some((like) => like._id === card._myId) !== false
//       ? "DELETE"
//       : "PUT";

//   api
//     .handleLikesServer(card._id, method)
//     .then((res) => {
//      card.updateLikes(res);
//     })
//     .catch((err) => console.log(err));
// }

function renderLoading(isLoading, someButton, buttonText){
  if (isLoading) {
    someButton.textContent = "Сохранение...";
  } else if (someButton.textContent === buttonText) {
    someButton.textContent = "Создать";
  } else {
    someButton.textContent = "Сохранить";
  }
}

const editProfilePopup = new PopupWithForm('.profile-popup', renderLoading, {
    handleFormSubmit: (formData) => {
        renderLoading(true, profileSubmitButton);
        api.setUserInfo(formData)
            .then((data) => {
            userinfo.setUserInfo(data);
            editProfilePopup.close();
            })
            .catch((err) => console.log(err))
            .finally(() => renderLoading(false, profileSubmitButton));
    }
});
editProfilePopup.setEventListeners();

editProfileButton.addEventListener("click", () => {
  const newData = userinfo.getUserInfo();
  username.value = newData.name;
  usernameInfo.value = newData.about;
  profileImage.src = newData.avatar;
  editProfilePopup.open();
});




const editProfilePicPopup = new PopupWithForm('.popup-profilepic', renderLoading, { 
    handleFormSubmit: (formData) => {
        renderLoading(true, profilePicSubmitButton);
        api.setAvatar(formData.link)
            .then((data) => {
                profileImage.src = data.avatar;
                editProfilePicPopup.close();
            })
            .catch((err) => console.log(err))
            .finally(() => renderLoading(false, profilePicSubmitButton));
    }
});
editProfilePicPopup.setEventListeners();

editProfilePicButton.addEventListener("click", () => {
  editProfilePicPopup.open();
});



// function renderLoading(isLoading, someButton) {
//   if (isLoading) {
//       someButton.textContent = "Сохранение...";
//   } else if (someButton === cardSubmitButton) {
//       someButton.textContent = "Создать";
//   } else {
//       someButton.textContent = "Сохранить";
//   }
// }

const addCardPopup = new PopupWithForm(".new-card-popup", renderLoading, {
  handleFormSubmit: (formData) => {
    renderLoading(true, cardSubmitButton, "Создать");
    api
      .addNewCard(placeInput.value, imageInput.value)
      .then((card) => {
        elements.prepend(renderer(card, card.owner._id));
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
