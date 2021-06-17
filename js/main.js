import {generateAds} from'./generate-ads.js';
import {adSet} from './data.js';

const mapCanvas = document.querySelector('#map-canvas');
const allAdsFragment = generateAds(adSet);
mapCanvas.appendChild(allAdsFragment.firstChild);
