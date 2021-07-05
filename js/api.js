import {generateAd} from './generate-ad.js';
const ADS_COUNT = 10;
const adSet = fetch("https://23.javascript.pages.academy/keksobooking/data")
  .then((response) => response.json())
  .then((ads) => {
    generateAd(ads);
  });
export {adSet};
