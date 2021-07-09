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

export {HOUSING_TYPE, adForm, filterForm, ROOMS_FOR_GUESTS_MAP, COORDINATES_TOKYO};
