export function renderLoading(isLoading, someButton, buttonText) {
  if (isLoading) {
    someButton.textContent = "Сохранение...";
  } else if (someButton.textContent === buttonText) {
    someButton.textContent = "Создать";
  } else {
    someButton.textContent = "Сохранить";
  }
}
