import {adForm,filterForm} from './data.js';

const toggleDisabledOnFormNodes = (isDisabled) => {
  [adForm, filterForm].forEach((form) => {
    for (const element of form.elements) {
      element.disabled = isDisabled;
    }
  });
};

const togglePageActiveState = (bool) => {
  adForm.classList.toggle('ad-form--disabled', bool);
  filterForm.classList.toggle('ad-form--disabled', bool);
  toggleDisabledOnFormNodes(bool);
};

togglePageActiveState(true);

export {togglePageActiveState};
