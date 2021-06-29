import {getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayElement, getShuffledRandomLengthArray} from './util.js';
const adForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const LODGINGS = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECK_IN_TIME = ['12:00','13:00','14:00'];
const CHECK_OUT_TIME = ['12:00','13:00','14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const ADS_COUNT = 10;
const LATITUDE = {
  min: 35.65000,
  max: 35.70000,
};
const LONGITUDE = {
  min: 139.70000,
  max: 139.80000,
};
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
const ROOMS = {
  min: 1,
  max: 5,
};
const GUESTS = {
  min: 1,
  max: 12,
};
const PRICES = {
  min: 1000,
  max: 50000,
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
const getAuthor = () => ({
  avatar: `img/avatars/user0${getRandomPositiveInteger(1, 8)}.png`,
});
const getLocation =  () => ({
  lat: getRandomPositiveFloat(LATITUDE.min, LATITUDE.max, 5),
  lng: getRandomPositiveFloat(LONGITUDE.min, LONGITUDE.max, 5),
});
const getOffer = (location) => ({
  title: 'Dacha. Дизайнерский домик во Всеволожске',
  address: `${location.lat  }, ${  location.lng}`,
  price: getRandomPositiveInteger(PRICES.min, PRICES.max),
  type: getRandomArrayElement(LODGINGS),
  rooms: getRandomPositiveInteger(ROOMS.min, ROOMS.max),
  guests: getRandomPositiveInteger(GUESTS.min, GUESTS.max),
  checkin: getRandomArrayElement(CHECK_IN_TIME),
  checkout: getRandomArrayElement(CHECK_OUT_TIME),
  features: getShuffledRandomLengthArray(FEATURES),
  description: 'Дизайнерский домик с ламповой атмосферой. Только для хороших людей. Построен в 2019 г из двух сорокафутовых морских контейнеров',
  photos: getShuffledRandomLengthArray(PHOTOS),
});
const createAd = () => {
  const location = getLocation();
  return {
    author: getAuthor(),
    offer: getOffer(location),
    location,
  };
};
const adSet = new Array(ADS_COUNT).fill(null).map(createAd);

export { adSet, HOUSING_TYPE, adForm, filterForm, ROOMS_FOR_GUESTS_MAP, COORDINATES_TOKYO};
