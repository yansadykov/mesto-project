import { openPopup, closePopup } from "./utils.js";
import { fetchSetAvatar, fetchSetUserInfo } from "./api.js";

const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const username = document.querySelector("#username");
const usernameInfo = document.querySelector("#usernameinfo");
const pictureLink = document.querySelector("#profilepicture");
const profilePopup = document.querySelector(".profile-popup");
const profileSubmitButton = document.querySelector("#profilesubmitbutton");
const profilePicSubmitButton = document.querySelector("#profilepicsubmitbutton");
const cardSubmitButton = document.querySelector("#addcardbutton");
const profilePicPopup = document.querySelector(".popup-profilepic");
const profileImage = document.querySelector("#profileavatar");

export function openProfilePopup() {
    username.value = profileTitle.textContent;
    usernameInfo.value = profileSubtitle.textContent;
    openPopup(profilePopup);
}

export function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    renderLoading(true, profileSubmitButton);
    fetchSetUserInfo(username.value, usernameInfo.value)
        .then(() => {
            profileTitle.textContent = username.value;
            profileSubtitle.textContent = usernameInfo.value;

            closePopup(profilePopup);
        })
        .catch((err) => console.log(err))
        .finally(() => renderLoading(false, profileSubmitButton));
}

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

function renderLoading(isLoading, someButton) {
    if (isLoading) {
        someButton.textContent = "Сохранение...";
    } else if (someButton === cardSubmitButton) {
        someButton.textContent = "Создать";
    } else {
        someButton.textContent = "Сохранить";
    }
}
