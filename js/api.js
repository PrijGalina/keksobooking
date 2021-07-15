
import {createOtherMarker, markerGroup} from './map.js';
import {filterForm} from './data.js';
import {getSortData, getFilteredData} from './filter.js';

const RERENDER_DELAY = 500;

const debounce = (func, wait, immediate) => {
  let timeout = 0;
  return function() {
    const context = this;
    const args = arguments;
    const later = () => {
      timeout = null;
      (!immediate) ? func.apply(context, args) : '';
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    (callNow) ? func.apply(context, args) : '';
  };
};

const SERVER_ADDRESSES = {
  GET: 'https://23.javascript.pages.academy/keksobooking/data',
  POST: 'https://23.javascript.pages.academy/keksobooking',
};

const ADS_COUNT = 10;

const renderMarker = (dataQ) => {
  markerGroup.clearLayers();
  const data = getFilteredData(dataQ);
  data.sort(getSortData);
  const filterArray = data.slice(0, ADS_COUNT);
  createOtherMarker(filterArray);
};

const setFilterChange = (dataArray) => {
  filterForm.addEventListener('change', debounce(() => renderMarker(dataArray), RERENDER_DELAY));
};

const onDataGetSuccess = (dataArray) => {
  const getPin = () => {
    const adArray = dataArray.slice(0, ADS_COUNT);
    createOtherMarker(adArray);
  };

  setFilterChange(dataArray);
  getPin();
  return dataArray;
};

const getData = (onSuccess, onError) => {
  fetch(SERVER_ADDRESSES.GET)
    .then((response) => response.json())
    .then((ads) => onSuccess(ads))
    .then((data) => {
      const allAds = data;
      return allAds;
    })
    .catch(() => onError('Ошибка получения данных с сервера'));
};

const sendData = (onSuccess, onError, body) => {
  fetch(
    SERVER_ADDRESSES.POST,
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

export {getData, sendData, onDataGetSuccess};
