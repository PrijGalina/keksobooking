import {onFail} from './util.js';
import {sendData} from './api.js';
import {adForm} from './data.js';

const setUserFormSubmit = (onSuccess) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      () => onSuccess(),
      () => onFail('Не удалось отправить форму. Попробуйте ещё раз'),
      new FormData(evt.target),
    );
  });
};

export {setUserFormSubmit};
