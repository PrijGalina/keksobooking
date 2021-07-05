import {createOtherMarker} from './map.js';
//import { onFail } from './util.js';

const getData = (onSuccess, onFail) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((ads) => onSuccess(ads))
    .then((ads) => createOtherMarker(ads))
    .catch(() => onFail('Ошибка получения данных с сервера'));
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://23.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
      mode: 'no-cors',
      headers: {
        'Content-Type': 'multipart/form-data',
        'User-Agent': 'Google Chrome',
      },
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      }
      else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {getData, sendData};
