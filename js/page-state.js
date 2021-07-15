import {adForm, filterForm} from './data.js';

const toggleDisabledOnFormNodes = (isDisabled, pageElement) => {
  for (const element of pageElement.elements) {
    element.disabled = isDisabled;
  }
};

const togglePageActiveState = (bool, pageElement) => {
  pageElement.classList.toggle('ad-form--disabled', bool);
  toggleDisabledOnFormNodes(bool, pageElement);
};

togglePageActiveState(true, adForm);
togglePageActiveState(true, filterForm);

export {togglePageActiveState};
