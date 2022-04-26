export function renderLoading(isLoading, someButton) {
    if (isLoading) {
        someButton.textContent = "Сохранение...";
    } else if (someButton === cardSubmitButton) {
        someButton.textContent = "Создать";
    } else {
        someButton.textContent = "Сохранить";
    }
}
