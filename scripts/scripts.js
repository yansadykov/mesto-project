// открытие-закрыте модального окна при нажатии кнопки редактировать 

const popup = document.querySelector('.popup');
const popupWindow = document.querySelector('.popup_window');
const popupCloseBtn = document.querySelector('.popup__close-btn');
const formName = document.querySelector('#name');
const formDescription = document.querySelector('#description');
const userName = document.querySelector('.profile__title');
const userDescription = document.querySelector('.profile__subtitle');
const profileEditBtn = document.querySelector('.profile__edit-btn');
const profileCloseBtn = document.querySelector('.popup__close-btn');
const form = document.querySelector('.form');

function openPopup(){
    formName.value = userName.textContent;
    formDescription.value = userDescription.textContent;
    popup.classList.add('popup_opened');
}

profileEditBtn.addEventListener('click', openPopup);

function closePopup() {
    popup.classList.remove('popup_opened');
}

popupCloseBtn.addEventListener('click', closePopup);

//редактирование профиля 

function submitFormHandler(evt) {
    evt.preventDefault();
    userName.textContent = formName.value;
    userDescription.textContent = formDescription.value;
    closePopup();
}
form.addEventListener('submit', submitFormHandler);

//

const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
//открытие-закрытие формы добавления новой карточки 

const itemForm = document.querySelector('#item-form');
const photoAddBtn = document.querySelector('.profile__photo-add-btn');
const photoCloseBtn = document.querySelector('#photo-close-btn');

function openItemForm() {
    itemForm.classList.add('popup_opened');
}
photoAddBtn.addEventListener('click', openItemForm);

function closeItemForm () {
    itemForm.classList.remove('popup_opened');
}
photoCloseBtn.addEventListener('click', closeItemForm);

//new card
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card-item');

const cardContainer = document.querySelector('.cards');

const cardName = document.querySelector('#card-name');
const cardLink = document.querySelector('#card-link');
const newCardForm = document.querySelector('#new-card-form');

const popupPicImg = document.querySelector('.popup-picture__img');
const popupPicTitle = document.querySelector('.popup-picture__title');
const popupPicOpen = document.querySelector('#popup-pic-open');





function createCard (item) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.card__title').textContent = item.name;
  cardElement.querySelector('.card__img').src = item.link;

  // удаляем карточку
  const cardDeleteBtn = cardElement.querySelector('.card__delete');

  cardDeleteBtn.addEventListener('click', (event) => {
  event.target.closest('.card-item').remove();  
  })

//лайк на карточке
  const cardLikeBtn = cardElement.querySelector('.card__like');
function likeCard() {
  cardLikeBtn.classList.toggle('card__like_active');
  }
  cardLikeBtn.addEventListener('click', likeCard);

 const cardImg = cardElement.querySelector('.card__img');
 cardImg.addEventListener('click', () => {
     popupPicImg.src = item.link;
     popupPicTitle.textContent = item.name;
     popupPicOpen.classList.add('popup_opened');
 })

const popupPicClsBtn = document.querySelector('.popup-picture__close-btn');
popupPicClsBtn.addEventListener('click', () => {
    popupPicOpen.classList.remove('popup_opened');
})

//cardContainer.prepend(cardElement);
  return cardElement;
}

const cardItem = initialCards.map((item) => {
  return createCard(item);
});



const submitFormHandlerCard = (evt) => {
  evt.preventDefault();
  const newCard = createCard({name: cardName.value, link: cardLink.value});
  cardContainer.prepend(newCard);
  closeItemForm();
  cardName.value = '';
  cardLink.value = '';
  return newCard;
}



newCardForm.addEventListener('submit', submitFormHandlerCard);
cardContainer.append(...cardItem);




