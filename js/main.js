import {generateAds} from'./generate-ads.js';
import {adForm, adSet} from './data.js';
import {togglePageActiveState} from './page-state.js';
import './validation.js';

const mapCanvas = document.querySelector('#map-canvas');
const allAdsFragment = generateAds(adSet);
togglePageActiveState(true);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const map = L.map('map-canvas')
  .on('load', () => {
    togglePageActiveState(false);
  })
  .setView({
    lat: 35.6804,
    lng: 139.769,
  }, 14);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const marker = L.marker(
  {
    lat: 35.6804,
    lng: 139.769,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

marker.addTo(map);
adForm['address'].value = `${marker.getLatLng().lat.toFixed(5)  }, ${  marker.getLatLng().lng.toFixed(5)}`;

marker.on('moveend', (evt) => {
  adForm['address'].value = `${evt.target.getLatLng().lat.toFixed(5)  }, ${  evt.target.getLatLng().lng.toFixed(5)}`;
});


