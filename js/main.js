import {generateAds} from'./generate-ads.js';
import {adSet} from './data.js';
import {togglePageActiveState} from './page-state.js';
import './validation.js';

const mapCanvas = document.querySelector('#map-canvas');
const allAdsFragment = generateAds(adSet);
mapCanvas.appendChild(allAdsFragment.firstChild);


togglePageActiveState(false);
