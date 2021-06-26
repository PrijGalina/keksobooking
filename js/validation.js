import {adForm, HOUSING_TYPE,ROOMS_FOR_GUESTS_MAP} from './data.js';

adForm.type.addEventListener('change', () => {
  adForm.price.min = HOUSING_TYPE[adForm.type.value].minPrice;
  adForm.price.placeholder = HOUSING_TYPE[adForm.type.value].minPrice;
});

adForm['room_number'].addEventListener('change', (e) => {
  const POSSIBLE_NUMBER_ROOMS = ROOMS_FOR_GUESTS_MAP[e.target.value];
  for (const currentCapacityItem of adForm.capacity.children) {
    currentCapacityItem.disabled = !POSSIBLE_NUMBER_ROOMS.includes(currentCapacityItem.value);
  }
  adForm.capacity.value = POSSIBLE_NUMBER_ROOMS[0];
});

adForm['timein'].addEventListener('change', () => {
  adForm['timeout'].value = adForm['timein'].value;
});

adForm['timeout'].addEventListener('change', () => {
  adForm['timein'].value = adForm['timeout'].value;
});
