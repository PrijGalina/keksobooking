import { generateAd } from './generate-ads.js';
import { adForm, adSet } from './data.js';
import { togglePageActiveState } from './page-state.js';

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const PinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
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

const MainMarker = L.marker(
  {
    lat: 35.6804,
    lng: 139.769,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

MainMarker.addTo(map);
adForm['address'].value = `${MainMarker.getLatLng().lat.toFixed(5)}, ${MainMarker.getLatLng().lng.toFixed(5)}`;

MainMarker.on('moveend', (evt) => {
  adForm['address'].value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (ad) => {
  const marker = L.marker(
    {
      lat: ad.location.lat,
      lng: ad.location.lng,
    },
    {
      icon: PinIcon,
    },
  );
  return marker;
};

for (let i = 0; i < adSet.length; i++) {
  const marker = createMarker(adSet[i]);
  marker
    .addTo(markerGroup)
    .bindPopup(
      generateAd(adSet[i]),
      {
        keepInView: true,
      },
    );
}

export { map };
