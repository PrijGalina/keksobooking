/* Функция взята из интернета и доработана, Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random */

const LODGINGS = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

const ADS_COUNT = 10;

const getRandomPositiveInteger = function (numValue, otherNumValue) {
  const lower = Math.ceil(Math.min(Math.abs(numValue), Math.abs(otherNumValue)));
  const upper = Math.floor(Math.max(Math.abs(numValue), Math.abs(otherNumValue)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomPositiveFloat = function (numValue, otherNumValue, digits = 1) {
  const lower = Math.min(Math.abs(numValue), Math.abs(otherNumValue));
  const upper = Math.max(Math.abs(numValue), Math.abs(otherNumValue));
  const result = Math.random() * (upper - lower) + lower;
  return result.toFixed(digits);
};

const getAuthor = function () {
  const authorPictureLink = `img/avatars/user0${getRandomPositiveInteger(1, 8)}.png`;
  return {
    avatar: authorPictureLink,
  };
};

const getRandomTime = function () {
  const timeArray = ['12:00','13:00','14:00'];
  const timeArrayLength = timeArray.length - 1;
  const randomIndex = getRandomPositiveInteger(0, timeArrayLength);
  return timeArray[randomIndex];
};

const getRandomLodgingType = function () {
  const lodgingArrayLength = LODGINGS.length - 1;
  const randomIndex = getRandomPositiveInteger(0, lodgingArrayLength);
  return LODGINGS[randomIndex];
};

const getRandomArray = function (customArray) {
  const randomLengthArray = getRandomPositiveInteger(1, customArray.length);
  const newArray = [];
  for (let index = 0; index <= randomLengthArray-1; index++) {
    const newLengthCustomArray = customArray.length;
    const randomIndex = getRandomPositiveInteger(0, newLengthCustomArray - 1);
    newArray[index] = customArray[randomIndex];
    customArray.splice(randomIndex, 1);
  }
  return newArray;
};

const getLocation = function () {
  return {
    lat: getRandomPositiveFloat(35.65000, 35.70000, 5),
    lng: getRandomPositiveFloat(139.70000, 139.80000, 5),
  };
};

const getOffer = function (features, photos, location) {
  return {
    title: 'Dacha. Дизайнерский домик во Всеволожске',
    address: `${location.lat  }, ${  location.lng}`,
    price: getRandomPositiveInteger(1000, 50000),
    type: getRandomLodgingType(),
    rooms: getRandomPositiveInteger(1, 5),
    guests: getRandomPositiveInteger(1, 12),
    checkin: getRandomTime(),
    checkout: getRandomTime(),
    features: getRandomArray(features),
    description: 'Дизайнерский домик с ламповой атмосферой. Только для хороших людей. Построен в 2019 г из двух сорокафутовых морских контейнеров',
    photos: getRandomArray(photos),
  };
};

const createAds = () => {
  const location = getLocation();
  const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  const PHOTOS = [
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg','https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
  ];
  return {
    author: getAuthor(),
    offer: getOffer(FEATURES, PHOTOS, location),
    location: location,
  };
};

const adSet = new Array(ADS_COUNT).fill(null).map(() => createAds());
adSet;
