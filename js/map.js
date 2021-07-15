import { generateAd } from './generate-ad.js';
import { adForm, filterForm, COORDINATES_TOKYO } from './data.js';
import { togglePageActiveState } from './page-state.js';
import { getData, onDataGetSuccess } from './api.js';
import { onFail } from './util.js';

const PinSetting = {
  MAIN: {
    iconUrl: 'img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  },
  REGULAR: {
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  },
};

const mainPinIcon = L.icon(PinSetting.MAIN);

const pinIcon = L.icon(PinSetting.REGULAR);
let initMap = false;

const map = L.map('map-canvas')
  .on('load', () => {
    togglePageActiveState(false, adForm);
    initMap = true;
  })
  .setView({
    lat: COORDINATES_TOKYO.lat,
    lng: COORDINATES_TOKYO.lng,
  }, 14);

const myPromise = new Promise((resolve, reject) => {
  if (initMap) {
    resolve();
  } else {
    reject();
  }
});

myPromise
  .then(() => {
    getData(onDataGetSuccess, onFail);
  })
  .then(() => {
    togglePageActiveState(false, filterForm);
  })
  .catch(() => {});

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const MainMarker = L.marker(
  {
    lat: COORDINATES_TOKYO.lat,
    lng: COORDINATES_TOKYO.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

MainMarker.addTo(map);

const getAddressStr = (marker) => `${marker.getLatLng().lat.toFixed(5)}, ${marker.getLatLng().lng.toFixed(5)}`;

adForm.address.value = getAddressStr(MainMarker);

MainMarker.on('mousemove', (evt) => {
  adForm.address.value = getAddressStr(evt.target);
});

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (ad) => {
  const marker = L.marker(
    ad.location,
    {
      icon: pinIcon,
    },
  );
  return marker;
};

const createOtherMarker = (adArrayData) => {
  Object.values(adArrayData).forEach((ad) => {
    const marker = createMarker(ad);
    marker
      .addTo(markerGroup)
      .bindPopup(
        generateAd(ad),
        {
          keepInView: true,
        },
      );
  });
};

const refreshMap = () => {
  map.setView(COORDINATES_TOKYO, 14);
  MainMarker.setLatLng(L.latLng(COORDINATES_TOKYO.lat,COORDINATES_TOKYO.lng));
};

export {MainMarker, createOtherMarker, refreshMap, markerGroup, map};
