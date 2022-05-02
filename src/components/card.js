export default class Card {
  constructor(
    { data, myId },
    selector,
    handleCardClick,
    handleDeleteCard,
    handleAddLikes,
    handleRemoveLikes
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
    this._handleAddLikes = handleAddLikes;
    this._handleRemoveLikes = handleRemoveLikes;
    this._cardInfo = data;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector(".card-item")
      .cloneNode(true);

    return cardElement;
  }

  _handleCardLikes() {
    this._cardLikeButton.classList.toggle('card__like_active');
    if (this._cardLikeButton.classList.contains('card__like_active')) {
      this._handleAddLikes(this);
    } else {
      this._handleRemoveLikes(this);
    }
  }

  countLikes(likes) {
    this._cardLikes.textContent = likes.length;
  }

  // updateLikes(res){
  //     this._cardInfo.likes = res.likes;
  //     this._cardLikes.textContent = res.likes.length;
  //     if (this._cardInfo.likes.some((like) => like._id === this._myId)) {
  //       this._cardLikeButton.classList.add("card__like_active");
  //       } else {
  //         this._cardLikeButton.classList.remove("card__like_active");
  //       }
  // }

  // getId(){
  //   return this._id; //card id
  // }

  _setEventListeners(){
    this._cardDeleteButton.addEventListener("click", (evt) => {
      this._handleDeleteCard(evt, this._id);
    });

    this._cardLikeButton.addEventListener("click", () => {
      this._handleCardLikes();
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._cardInfo);
    });
  }

  generate() {
    this._element = this._getElement();

    this._cardTitle = this._element.querySelector(".card__title");
    this._cardImage = this._element.querySelector(".card__img");
    this._cardDeleteButton = this._element.querySelector(".card__delete");
    this._cardLikeButton = this._element.querySelector(".card__like");
    this._cardLikes = this._element.querySelector(".card__like-count");
    this._cardLikes.textContent = this._cardInfo.likes.length;

    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._name;
    this._cardTitle.alt = this._name;

    if (this._cardInfo.likes.some((like) => like._id === this._myId)) {
      this._cardLikeButton.classList.add("card__like_active");
    }

    if (this._ownerId !== this._myId) {
      this._cardDeleteButton.style.display = "none";
    }

    this._setEventListeners();

    return this._element;
  }

}
