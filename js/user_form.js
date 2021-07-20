import {sendData,getData, onDataGetSuccess} from './api.js';
import {adForm, filterForm, VALUE_OF_ALL_ADS} from './data.js';
import {refreshMap} from './map.js';
import { onFail } from './util.js';

const ERROR_MESSAGE_TEMPLATE = document.querySelector('#error').content.querySelector('.error');
const SUCCESS_MESSAGE_TEMPLATE = document.querySelector('#success').content.querySelector('.success');

const closeMessage = () => {
  document.querySelector('.user-message').remove();
  document.removeEventListener('keydown', keydownEscHandler);
  document.removeEventListener('click', ClickHandler);
};

function keydownEscHandler(e) {
  e.preventDefault();
  (e.key === 'Escape' || e.key === 'Esc') ? closeMessage() : '';
}

function ClickHandler(e) {
  e.preventDefault();
  closeMessage();
}

const displayMessage = (template) => {
  const message = template.cloneNode(true);
  document.body.appendChild(message);
  document.addEventListener('keydown', keydownEscHandler);
  document.addEventListener('click', ClickHandler);
};

const setUserFormSubmit = (onSuccess) => {
  adForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    sendData(
      () => onSuccess(),
      () => displayMessage(ERROR_MESSAGE_TEMPLATE),
      formData,
    );
  });
};

const clearForm = () => {
  adForm.reset();
  displayMessage(SUCCESS_MESSAGE_TEMPLATE);
};


adForm.addEventListener('reset', () => {
  refreshMap();
  filterForm.elements['features'].forEach((checkbox) => {
    checkbox.checked = false;
  });
  filterForm.querySelectorAll('.map__filter').forEach((select) => {
    select.value = VALUE_OF_ALL_ADS;
  });
  scrollTo({top: 0, behavior: 'smooth'});
  getData(onDataGetSuccess, onFail);
});

export {setUserFormSubmit, displayMessage, clearForm};
