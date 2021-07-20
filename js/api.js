
import {createOtherMarker, markerGroup} from './map.js';
import {filterForm} from './data.js';
import {getFilteredData} from './filter.js';
import {debounce} from './utils/debounce.js';
import {togglePageActiveState} from './page-state.js';

const RERENDER_DELAY = 500;

const SERVER_ADDRESSES = {
  GET: 'https://23.javascript.pages.academy/keksobooking/data',
  POST: 'https://23.javascript.pages.academy/keksobooking',
};

const ADS_COUNT = 10;

const renderMarker = (dataAds) => {
  markerGroup.clearLayers();
  const data = getFilteredData(dataAds);
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
  togglePageActiveState(false, filterForm);
  return dataArray;
};

const getData = (onSuccess, onError) => {
  fetch(SERVER_ADDRESSES.GET)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((ads) => {
      onSuccess(ads);
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
