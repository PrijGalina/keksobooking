import './page-state.js';
import './validation.js';
import './map.js';
import {setUserFormSubmit} from'./user_form.js';
import {getData} from './api.js';

const ADS_COUNT = 10;

const clearForm = () => {

};

getData((adArrayData) => {
  const adArray = adArrayData.slice(0, ADS_COUNT);
  return adArray;
});

setUserFormSubmit(clearForm);

