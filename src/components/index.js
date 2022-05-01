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
});

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
  api
    .removeCardServer(cardId)
    .then(() => {
      evt.target.closest(".card-item").remove();
    })
    .catch((err) => console.log(err));
}

function handleLikes(likeButton, cardLikes, cardInfo, myId) {
  const method =
    cardInfo.likes.some((like) => like._id === myId) !== false
      ? "DELETE"
      : "PUT";

  api
    .handleLikesServer(cardInfo, method)
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

const editProfilePopup = new PopupWithForm('.profile-popup', renderLoading, {
    handleFormSubmit: (formData) => {
        renderLoading(true, profileSubmitButton);
        api.setUserInfo(formData)
            .then((data) => {
            userinfo.setUserInfo(data);
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
  editProfilePopup.open();
});




const editProfilePicPopup = new PopupWithForm('.popup-profilepic', renderLoading, { 
    handleFormSubmit: (formData) => {
        renderLoading(true, profilePicSubmitButton);
        api.setAvatar(formData.link )
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

function renderLoading(isLoading, someButton, buttonText){
  if (isLoading) {
    someButton.textContent = "Сохранение...";
  } else if (buttonText === "Создать") {
    someButton.textContent = "Создать";
  } else {
    someButton.textContent = "Сохранить";
  }
}

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
        const addedCard = new Card(
          { data: card, myId: card.owner._id },
          "#card-template",
          handleCardClick,
          handleDeleteCard,
          handleLikes
        );
        const cardElement = addedCard.generate();
        elements.prepend(cardElement);
      })
      .then(() => {
        addCardPopup.close();
        addCardForm.reset();
        cardSubmitButton.classList.add("form__save_inactive");
        cardSubmitButton.disabled = true;
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
