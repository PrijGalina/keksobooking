import {createOtherMarker} from './map.js';

const SERVER_ADDRESSES = {
  forGetting: 'https://23.javascript.pages.academy/keksobooking/data',
  toSend: 'https://23.javascript.pages.academy/keksobooking',
};

const getData = (onSuccess, onFail) => {
  fetch(SERVER_ADDRESSES.forGetting)
    .then((response) => response.json())
    .then((ads) => onSuccess(ads))
    .then((ads) => createOtherMarker(ads))
    .catch(() => onFail('Ошибка получения данных с сервера'));
};

const sendData = (onSuccess, onError, body) => {
  fetch(
    SERVER_ADDRESSES.toSend,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      }
      else {
        onError();
      }
    })
    .catch(() => {
      onError();
    });
};

export {getData, sendData};
