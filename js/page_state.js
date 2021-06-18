import {formElement,FORM_FIELD,filterElement,FILTER_FIELD} from './data.js';
import {changeAttributeDisabled} from './util.js';

const setActive = () => {
  formElement.classList.remove('ad-form--disabled');
  filterElement.classList.remove('ad-form--disabled');
  changeAttributeDisabled(FILTER_FIELD, false);
  changeAttributeDisabled(FORM_FIELD, false);
};

const setInactive = () => {
  formElement.classList.add('ad-form--disabled');
  filterElement.classList.add('ad-form--disabled');
  changeAttributeDisabled(FILTER_FIELD, true);
  changeAttributeDisabled(FORM_FIELD, true);
};

export {setActive,setInactive};
