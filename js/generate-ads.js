import {HOUSING_TYPE} from './data.js';
import {getDeclension} from './util.js';

const generateAds = (ads) => {
  const adsFragment = document.createDocumentFragment();
  const adsTemplate = document.querySelector('#card').content.querySelector('.popup');
  ads.forEach((ad) => {
    const adElement = adsTemplate.cloneNode(true);
    ad.author.avatar ? adElement.querySelector('.popup__avatar').src = ad.author.avatar : adElement.querySelector('.popup__avatar').style.display = 'none';
    adElement.querySelector('.popup__title').textContent = ad.offer.title || '';
    adElement.querySelector('.popup__text--address').textContent = ad.offer.address || '';
    adElement.querySelector('.popup__text--price').innerHTML = ad.offer.price ? `${ad.offer.price  }<span>₽/ночь</span>` : '';
    adElement.querySelector('.popup__type').textContent = HOUSING_TYPE[ad.offer.type] || '';
    adElement.querySelector('.popup__text--capacity').textContent = (ad.offer.guests && ad.offer.rooms) ? `${ad.offer.rooms} ${getDeclension(ad.offer.rooms, ['контата', 'комнаты', 'комнат'])} для ${ad.offer.guests} ${getDeclension(ad.offer.guests, ['гостя', 'гостей', 'гостей'])}` : '';
    adElement.querySelector('.popup__text--time').textContent = (ad.offer.checkin && ad.offer.checkout) ? `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}` : '';
    if (ad.offer.features) {
      const modifiers = ad.offer.features.map((feature) => `popup__feature--${feature}`);
      const adFeaturesElements = adElement.querySelectorAll('.popup__feature');
      adFeaturesElements.forEach((item) => {
        const modifier = item.classList[1];
        if (!modifiers.includes(modifier)) {
          item.style.display = 'none';
        }
      });
    }
    else {
      adElement.querySelector('.popup__features').style.display = 'none';
    }
    adElement.querySelector('.popup__description').textContent = ad.offer.description || '';
    if (ad.offer.photos) {
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
      adElement.querySelector('.popup__photos').style.display = 'none';
    }
    adsFragment.appendChild(adElement);
  });
  return adsFragment;
};

export {generateAds};
