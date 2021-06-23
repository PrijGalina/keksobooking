import {formElement, HOUSING_MIN_PRICE} from './data.js';
const adTitleInput = formElement.querySelector('#title');
const typeSelect = formElement.querySelector('#type');
const priceInput = formElement.querySelector('#price');
const countRoomsSelect = formElement.querySelector('#room_number');
const countGuestsSelect = formElement.querySelector('#capacity');

const valuePriceCheck = () => {
  priceInput.min = HOUSING_MIN_PRICE[typeSelect.value];
  (Number(priceInput.value) < Number(priceInput.min)) ? priceInput.setCustomValidity(`Минимальная цена за ночь ${  priceInput.min}`) : priceInput.setCustomValidity('');
  priceInput.reportValidity();
};

adTitleInput.addEventListener('input', () => {
  const valueLength = adTitleInput.value.length;
  const valueMin = adTitleInput.attributes.minlength.value;
  const valueMax = adTitleInput.attributes.maxlength.value;
  if (valueLength < valueMin) {
    adTitleInput.setCustomValidity(`Ещё ${valueMin - valueLength} симв.`);
  }
  else if (valueLength > valueMax) {
    adTitleInput.setCustomValidity(`Удалите лишние ${valueLength - valueMax} симв.`);
  }
  else {
    adTitleInput.setCustomValidity('');
  }
  adTitleInput.reportValidity();
});

typeSelect.addEventListener('change', () => {
  priceInput.placeholder = String(HOUSING_MIN_PRICE[typeSelect.value]);
  if(priceInput.value.length > 0) {
    valuePriceCheck();
  }
});

priceInput.addEventListener('input', () => {
  valuePriceCheck();
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
