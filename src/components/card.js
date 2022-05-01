export default class Card {
  constructor(
    { data, myId },
    selector,
    handleCardClick,
    handleDeleteCard,
    handleLikes
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._selector = selector;
    this._ownerId = data.owner._id;
    this._id = data._id;
    this._myId = myId;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikes = handleLikes;
    this._cardInfo = data;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector(".card-item")
      .cloneNode(true);

    return cardElement;
  }

  generate() {
    this._element = this._getElement();

    const cardTitle = this._element.querySelector(".card__title");
    const cardImage = this._element.querySelector(".card__img");
    const cardDeleteButton = this._element.querySelector(".card__delete");
    const cardLikeButton = this._element.querySelector(".card__like");
    const cardLikes = this._element.querySelector(".card__like-count");
    cardLikes.textContent = this._cardInfo.likes.length;

    cardImage.src = this._link;
    cardTitle.textContent = this._name;
    cardTitle.alt = this._name;

    if (this._cardInfo.likes.some((like) => like._id === this._myId)) {
      cardLikeButton.classList.add("card__like_active");
    }

    if (this._ownerId !== this._myId) {
      cardDeleteButton.style.display = "none";
    }

    this._deleteEventListeners(cardDeleteButton);

    this._likeEventListeners(cardLikeButton, cardLikes);

    this._imageOpenEventListeners(cardImage);

    return this._element;
  }

  _deleteEventListeners(cardDeleteButton) {
    cardDeleteButton.addEventListener("click", (evt) => {
      this._handleDeleteCard(evt, this._id);
    });
  }

  _likeEventListeners(cardLikeButton, cardLikes) {
    cardLikeButton.addEventListener("click", () => {
      this._handleLikes(cardLikeButton, cardLikes, this._cardInfo, this._myId);
    });
  }

  _imageOpenEventListeners(cardImage) {
    cardImage.addEventListener("click", () => {
      this._handleCardClick(this._cardInfo);
    });
  }
}
