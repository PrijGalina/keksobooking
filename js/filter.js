
import {filterForm, PRICE_MAP, VALUE_OF_ALL_ADS} from './data.js';

const filterByType = (element) => (filterForm.elements['housing-type'].value === VALUE_OF_ALL_ADS) ? element : element.offer.type === filterForm.elements['housing-type'].value;

const filterByPrice = (element) => {
  let adPrice = '';
  (element.offer.price < PRICE_MAP.low.max) ? adPrice = 'low' : '';
  ((element.offer.price >= PRICE_MAP.middle.min) && (element.offer.price < PRICE_MAP.middle.max)) ? adPrice = 'middle' : '';
  (element.offer.price >= PRICE_MAP.high.min) ? adPrice = 'high' : '';
  return (filterForm.elements['housing-price'].value === VALUE_OF_ALL_ADS) ? element : adPrice === filterForm.elements['housing-price'].value;
};

const filterByRooms = (element) => (filterForm.elements['housing-rooms'].value === VALUE_OF_ALL_ADS) ? element : +element.offer.rooms === +filterForm.elements['housing-rooms'].value ;

const filterByGuests = (element) => (filterForm.elements['housing-guests'].value === VALUE_OF_ALL_ADS) ? element : +element.offer.guests === +filterForm.elements['housing-guests'].value;

const getCheckedCheckbox = () => {
  const featureCheckedCheckboxs = [];
  filterForm.elements['features'].forEach((checkbox) => {
    if (checkbox.checked === true){
      featureCheckedCheckboxs.push(checkbox.value);
    }
  });
  return featureCheckedCheckboxs;
};

const filterByFeatures = (element) => {
  const checkedCheckboxs = getCheckedCheckbox();
  if (checkedCheckboxs.length !== 0) {
    if(element.offer.features){
      let suitableAd = true;
      checkedCheckboxs.forEach((el) => {
        !element.offer.features.includes(el) ? suitableAd = false : '';
      });
      if (suitableAd) {
        return element;
      }
    }
  }
  else {
    return element;
  }
};

const getFilteredData = (pin) => pin.filter(filterByType).filter(filterByPrice).filter(filterByRooms).filter(filterByGuests).filter(filterByFeatures);

export {getFilteredData};
