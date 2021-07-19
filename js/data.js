const adForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');

const COORDINATES_TOKYO = {
  lat: 35.6804,
  lng: 139.769,
};

const ROOMS_FOR_GUESTS_MAP = {
  100: ['0'],
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
};

const HOUSING_TYPE = {
  flat: {
    name: 'Квартира',
    minPrice: 1000,
  },
  bungalow: {
    name: 'Бунгало',
    minPrice: 0,
  },
  house: {
    name: 'Дом',
    minPrice: 5000,
  },
  palace: {
    name: 'Дворец',
    minPrice: 10000,
  },
  hotel: {
    name: 'Отель',
    minPrice: 3000,
  },
};

const VALUE_OF_ALL_ADS = 'any';

const PRICE_MAP = {
  any: {
    max: Infinity,
    min: -Infinity,
  },
  low: {
    max: 10000,
    min: 0,
  },
  middle: {
    max: 50000,
    min: 10000,
  },
  high: {
    max: Infinity,
    min: 50000,
  },
};

const DEFOULT_FORM_IMAGE = {
  avatar: '../img/muffin-grey.svg',
  house: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Antu_folder-camera.svg/64px-Antu_folder-camera.svg.png',
};

export { HOUSING_TYPE, adForm, filterForm, ROOMS_FOR_GUESTS_MAP, COORDINATES_TOKYO, VALUE_OF_ALL_ADS, PRICE_MAP, DEFOULT_FORM_IMAGE};
