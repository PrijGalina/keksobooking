import {formElement, HOUSING_MIN_PRICE} from './data.js';
const adTitleInput = formElement.querySelector('#title');
const typeSelect = formElement.querySelector('#type');
const priceInput = formElement.querySelector('#price');
const countRoomsSelect = formElement.querySelector('#room_number');
const countGuestsSelect = formElement.querySelector('#capacity');

adTitleInput.addEventListener('invalid', () => {
  if (adTitleInput.validity.tooShort) {
    adTitleInput.setCustomValidity('Минимальная длина заголовка объявления - 30 символов');
  } else if (adTitleInput.validity.tooLong) {
    adTitleInput.setCustomValidity('Заголовок объявления не может быть длинее 100 символов');
  } else if (adTitleInput.validity.valueMissing) {
    adTitleInput.setCustomValidity('Обязательное поле');
  } else {
    adTitleInput.setCustomValidity('');
  }
});

typeSelect.addEventListener('change', () => {
  priceInput.min = HOUSING_MIN_PRICE[typeSelect.value];
  priceInput.placeholder = String(HOUSING_MIN_PRICE[typeSelect.value]);
});

countRoomsSelect.addEventListener('change', (e) => {
  switch (e.target.value) {
    case '100':
      for (let i = 0; i <= countGuestsSelect.options.length - 1; i++) {
        countGuestsSelect.options[i].attributes.value.nodeValue !== '0' ? countGuestsSelect.options[i].disabled = true : countGuestsSelect.options[i].disabled = false;
      }
      break;
    case '1':
      for (let i = 0; i <= countGuestsSelect.options.length - 1; i++) {
        countGuestsSelect.options[i].attributes.value.nodeValue !== '1' ? countGuestsSelect.options[i].disabled = true : countGuestsSelect.options[i].disabled = false;
      }
      break;
    case '2':
      for (let i = 0; i <= countGuestsSelect.options.length - 1; i++) {
        ((countGuestsSelect.options[i].attributes.value.nodeValue !== '1') && (countGuestsSelect.options[i].attributes.value.nodeValue !== '2')) ? countGuestsSelect.options[i].disabled = true : countGuestsSelect.options[i].disabled = false;
      }
      break;
    case '3':
      for (let i = 0; i <= countGuestsSelect.options.length - 1; i++) {
        (countGuestsSelect.options[i].attributes.value.nodeValue !== '1' && countGuestsSelect.options[i].attributes.value.nodeValue !== '2' && countGuestsSelect.options[i].attributes.value.nodeValue !== '3') ? countGuestsSelect.options[i].disabled = true : countGuestsSelect.options[i].disabled = false;
      }
      break;
  }

});

formElement.addEventListener('submit', (e) => {
  e.preventDefault();
  const indexSelectedOption = countGuestsSelect.options.selectedIndex;
  if (countGuestsSelect.options[indexSelectedOption].disabled === true) {
    countGuestsSelect.setCustomValidity('Недопустимое значение количества мест');
  }
  else {
    countGuestsSelect.setCustomValidity('');
    formElement.submit();
  }
});
