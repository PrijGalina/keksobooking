import {adForm, HOUSING_TYPE,ROOMS_FOR_GUESTS_MAP} from './data.js';
const typeSelect = adForm.querySelector('#type');
const priceInput = adForm.querySelector('#price');
const countGuestsSelect = adForm.querySelector('#capacity');

const valuePriceCheck = () => {
  priceInput.min = HOUSING_TYPE[typeSelect.value].minPrice;
  priceInput.setCustomValidity(+priceInput.value < +priceInput.min ? `Минимальная цена за ночь ${priceInput.min}` : '');
  priceInput.reportValidity();
};

typeSelect.addEventListener('change', () => {
  priceInput.min = HOUSING_TYPE[typeSelect.value].minPrice;
  priceInput.placeholder = HOUSING_TYPE[typeSelect.value].minPrice;
  if(priceInput.value.length > 0) {
    valuePriceCheck();
  }
});

priceInput.addEventListener('input', () => {
  valuePriceCheck();
});

for (let i = 0; i < countGuestsSelect.children.length - 2; i++) {
  let minDomElement = countGuestsSelect.children[i];
  for (let j = i + 1; j < countGuestsSelect.children.length - 1; j++) {
    if(minDomElement.value > countGuestsSelect.children[j].value){
      minDomElement = countGuestsSelect.children[j];
      const swap = countGuestsSelect.children[i];
      countGuestsSelect.insertBefore(minDomElement,swap);
    }
  }
}

adForm['room_number'].addEventListener('change', (e) => {
  const POSSIBLE_NUMBER_ROOMS = ROOMS_FOR_GUESTS_MAP[e.target.value];
  for (let i = 0; i <= countGuestsSelect.length - 1; i++) {
    (POSSIBLE_NUMBER_ROOMS.includes(countGuestsSelect[i].value)) ? countGuestsSelect[i].disabled = false : countGuestsSelect[i].disabled = true;
  }
  const firstElementPossible = POSSIBLE_NUMBER_ROOMS[0];
  const selectedElement = (countGuestsSelect[firstElementPossible - 1]) ? countGuestsSelect[firstElementPossible - 1]: countGuestsSelect[countGuestsSelect.length - 1];
  selectedElement.selected = true;
});
