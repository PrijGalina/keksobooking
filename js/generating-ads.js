import {adSet} from './data.js';

const adsTemplate = document.querySelector('#card').content.querySelector('.popup');
adSet;
const adsFragment = document.createDocumentFragment();
const mapCanvas = document.querySelector('#map-canvas');
let i = 0;

adSet.forEach((ad) => {
  const adElement = adsTemplate.cloneNode(true);
  (ad.author.avatar !== null) ? adElement.querySelector('.popup__avatar').setAttribute('src', ad.author.avatar) : adElement.querySelector('.popup__avatar').remove();
  (ad.offer.title !== null) ? adElement.querySelector('.popup__title').textContent = ad.offer.title : adElement.querySelector('.popup__title').remove();
  (ad.offer.address !== null) ? adElement.querySelector('.popup__text--address').textContent = ad.offer.address : adElement.querySelector('.popup__text--address').remove();
  (ad.offer.price !== null) ? adElement.querySelector('.popup__text--price').innerHTML = `${ad.offer.price  }<span>₽/ночь</span>` : adElement.querySelector('.popup__text--price').remove;
  if (ad.offer.type !== null) {
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
    if (ad.offer.guests !== null) {
      (ad.offer.guests > 1) ? guestsText = ' гостей' : guestsText = ' гостя';
    }
    const guestsDescription = (ad.offer.guests !== null) ? ad.offer.guests + guestsText : '';
    adElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + roomsText + guestsDescription;
  }
  else {
    adElement.querySelector('.popup__text--capacity').remove();
  }
  if (ad.offer.checkin !== null && ad.offer.checkout !== null) {
    adElement.querySelector('.popup__text--time').textContent = `Заезд после ${  ad.offer.checkin }, выезд до ${  ad.offer.checkout}`;
  }
  else if (ad.offer.checkin !== null) {
    adElement.querySelector('.popup__text--time').textContent = `Заезд после ${  ad.offer.checkin }`;
  }
  else if (ad.offer.checkout !== null) {
    adElement.querySelector('.popup__text--time').textContent = `Выезд до ${  ad.offer.checkout}`;
  }
  else {
    adElement.querySelector('.popup__text--time').remove();
  }
  if (ad.offer.features !== null) {
    const adFeaturesList = adElement.querySelector('.popup__features');
    const modifiers = ad.offer.features.map((feature) => `popup__feature--${feature}`);
    const adFeaturesElements = adFeaturesList.querySelectorAll('.popup__feature');
    adFeaturesElements.forEach((item) => {
      const modifier = item.classList[1];
      if (!modifiers.includes(modifier)) {
        item.remove();
      }
    });
  }
  else {
    adElement.querySelector('.popup__features').remove();
  }
  (ad.offer.description !== null) ? adElement.querySelector('.popup__description').textContent = ad.offer.description : adElement.querySelector('.popup__description').remove();
  if (ad.offer.photos !== null) {
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
  }
  else {
    adElement.querySelector('.popup__photos').remove();
  }
  adsFragment.appendChild(adElement);
  if (i === 0) {
    mapCanvas.appendChild(adElement);
  }
  i++;
});

//console.log('adsFragment',adsFragment);
