import {adForm, HOUSING_TYPE,ROOMS_FOR_GUESTS_MAP} from './data.js';
const adTitleInput = adForm.querySelector('#title');
const typeSelect = adForm.querySelector('#type');
const priceInput = adForm.querySelector('#price');
const countRoomsSelect = adForm.querySelector('#room_number');
const countGuestsSelect = adForm.querySelector('#capacity');

const valuePriceCheck = () => {
  priceInput.min = HOUSING_TYPE[typeSelect.value].minPrice;
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
  priceInput.placeholder = String(HOUSING_TYPE[typeSelect.value].minPrice);
  if(priceInput.value.length > 0) {
    valuePriceCheck();
  }
});

priceInput.addEventListener('input', () => {
  valuePriceCheck();
});

countRoomsSelect.addEventListener('change', (e) => {
  const POSSIBLE_NUMBER_ROOMS = ROOMS_FOR_GUESTS_MAP[e.target.value];
  for (let i = 0; i <= countGuestsSelect.length - 1; i++) {
    (POSSIBLE_NUMBER_ROOMS.includes(countGuestsSelect[i].value)) ? countGuestsSelect[i].disabled = false : countGuestsSelect[i].disabled = true;
  }
  console.log(countGuestsSelect);
});
