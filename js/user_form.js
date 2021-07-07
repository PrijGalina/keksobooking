import {sendData} from './api.js';
import {adForm} from './data.js';

const ERROR_MESSAGE_TEMPLATE = document.querySelector('#error').content.querySelector('.error');
const SUCCESS_MESSAGE_TEMPLATE = document.querySelector('#success').content.querySelector('.success');

const close = () => {
  document.querySelector('.user-message').remove();
  document.removeEventListener('keydown', add);
};

const add = (e) => {
  e.preventDefault();
  (e.key === 'Escape' || e.key === 'Esc') || e.type === 'click' ? close() : '';
};

const displayMessage = (template) => {
  const message = template.cloneNode(true);
  document.body.appendChild(message);
  document.addEventListener('keydown', add);
  message.addEventListener('click', add);
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

export {setUserFormSubmit, displayMessage, clearForm};
