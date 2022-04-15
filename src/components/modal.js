import { openPopup, closePopup, renderLoading } from "./utils.js";
import { fetchSetAvatar,  } from "./api.js";

// const profileTitle = document.querySelector(".profile__title");
// const profileSubtitle = document.querySelector(".profile__subtitle");

const profilePicSubmitButton = document.querySelector("#profilepicsubmitbutton");
const profilePicPopup = document.querySelector(".popup-profilepic");
const profileImage = document.querySelector("#profileavatar");
const addCardPopup = document.querySelector("#item-form");

const pictureLink = document.querySelector("#profilepicture");




export function handleEditProfilePic(evt) {
    evt.preventDefault();
    renderLoading(true, profilePicSubmitButton);
    fetchSetAvatar(pictureLink.value)
        .then((data) => {
            profileImage.src = data.avatar;
            closePopup(profilePicPopup);
        })
        .catch((err) => console.log(err))
        .finally(() => renderLoading(false, profilePicSubmitButton));
}

export function openEditProfilePic() {
    openPopup(profilePicPopup);
}

export function openAddCardPopup() {
    openPopup(addCardPopup);
}
