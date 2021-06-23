import {adForm,filterForm} from './data.js';
import {toggleDisabledOnFormNodes} from './util.js';

const togglePageActiveState = (bool) => {
  adForm.classList.toggle('ad-form--disabled', bool);
  filterForm.classList.toggle('ad-form--disabled', bool);
  toggleDisabledOnFormNodes(bool);
};

export {togglePageActiveState};
