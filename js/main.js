import {generateAds} from'./generate-ads.js';
import {adSet} from './data.js';
import {setActive,setInactive} from './page_state.js';

const mapCanvas = document.querySelector('#map-canvas');
const allAdsFragment = generateAds(adSet);
mapCanvas.appendChild(allAdsFragment.firstChild);

setActive();
setInactive();
