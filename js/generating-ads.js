import {adSet} from './data.js';

const adsTemplate = document.querySelector('#card').content.querySelector('.popup');
adSet;
const adsFragment = document.createDocumentFragment();
const mapCanvas = document.querySelector('#map-canvas');
let i = 0;

adSet.forEach((ad) => {
  const adElement = adsTemplate.cloneNode(true);
  adElement.querySelector('.popup__avatar').setAttribute('src', ad.author.avatar);
  adElement.querySelector('.popup__title').textContent = ad.offer.title;
  adElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  adElement.querySelector('.popup__text--price').innerHTML = `${ad.offer.price  }<span>₽/ночь</span>`;
  const housingTypeCode = ad.offer.type;
  let housingTypeName = '';
  switch (housingTypeCode) {
    case 'flat':
      housingTypeName = 'Квартира';
      break;
    case 'bungalow':
      housingTypeName = 'Бунгало';
      break;
    case 'house':
      housingTypeName = 'Дом';
      break;
    case 'palace':
      housingTypeName = 'Дворец';
      break;
    case 'hotel':
      housingTypeName = 'Отель';
      break;
  }
  adElement.querySelector('.popup__type').textContent = housingTypeName;
  let roomsText = '';
  if (ad.offer.rooms === 1) {
    roomsText = ' комната для ';
  }
  else if (ad.offer.rooms > 4) {
    roomsText = ' комнат для ';
  }
  else {
    roomsText = ' комнаты для ';
  }
  let guestsText = '';
  (ad.offer.guests > 1) ? guestsText = ' гостей' : guestsText = ' гостя';
  adElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + roomsText + ad.offer.guests + guestsText;
  adElement.querySelector('.popup__text--time').textContent = `Заезд после ${  ad.offer.checkin }, выезд до ${  ad.offer.checkout}`;
  const adFeaturesList = adElement.querySelector('.popup__features');
  const modifiers = ad.offer.features.map((feature) => `popup__feature--${feature}`);
  const adFeaturesElements = adFeaturesList.querySelectorAll('.popup__feature');
  adFeaturesElements.forEach((item) => {
    const modifier = item.classList[1];
    if (!modifiers.includes(modifier)) {
      item.remove();
    }
  });
  adElement.querySelector('.popup__description').textContent = ad.offer.description;
  const photoTemplate = adElement.querySelector('.popup__photo');
  const photoFragment = document.createDocumentFragment();

  ad.offer.photos.map((photo) => {
    const photoElement = photoTemplate.cloneNode(true);
    photoElement.setAttribute('src', photo);
    photoFragment.appendChild(photoElement);
  });
  const photoBlock = adElement.querySelector('.popup__photos');
  photoBlock.innerHTML = '';
  photoBlock.appendChild(photoFragment);
  adsFragment.appendChild(adElement);
  if (i === 0) {
    mapCanvas.appendChild(adElement);
  }
  i++;
});

//console.log('adsFragment',adsFragment);
