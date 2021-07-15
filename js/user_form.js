import {sendData} from './api.js';
import {adForm} from './data.js';
import {refreshMap} from './map.js';

const ERROR_MESSAGE_TEMPLATE = document.querySelector('#error').content.querySelector('.error');
const SUCCESS_MESSAGE_TEMPLATE = document.querySelector('#success').content.querySelector('.success');

const closeMessage = () => {
  document.querySelector('.user-message').remove();
  document.removeEventListener('keydown', KeydownHandler);
  document.removeEventListener('click', ClickHandler);
};

function KeydownHandler(e) {
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
  document.addEventListener('keydown', KeydownHandler);
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
});

export {setUserFormSubmit, displayMessage, clearForm};
