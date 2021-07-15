
import {filterForm} from './data.js';

const FilterByType = (element) => (filterForm.elements['housing-type'].value === 'any') ? element : element.offer.type === filterForm.elements['housing-type'].value;

const FilterByPrice = (element) => {
  let adPrice = '';
  (element.offer.price < 10000) ? adPrice = 'low' : '';
  ((element.offer.price >= 10000) && (element.offer.price < 50000)) ? adPrice = 'middle' : '';
  (element.offer.price >= 50000) ? adPrice = 'high' : '';
  return (filterForm.elements['housing-price'].value === 'any') ? element : adPrice === filterForm.elements['housing-price'].value;
};

const FilterByRooms = (element) => (filterForm.elements['housing-rooms'].value === 'any') ? element : +element.offer.rooms === +filterForm.elements['housing-rooms'].value ;

const FilterByGuests = (element) => (filterForm.elements['housing-guests'].value === 'any') ? element : +element.offer.guests === +filterForm.elements['housing-guests'].value;

const getCheckedCheckbox = () => {
  const featureCheckedCheckboxs = [];
  filterForm.elements['features'].forEach((checkbox) => {
    if (checkbox.checked === true){
      featureCheckedCheckboxs.push(checkbox.value);
    }
  });
  return featureCheckedCheckboxs;
};

const getRankAd = (element, list) => {
  const adFeatures = element.offer.features;
  const intersection = list.filter((item) => adFeatures.includes(item));
  return intersection.length;
};

const FilterByFeatures = (element) => {
  const checkedCheckboxs = getCheckedCheckbox();
  if (checkedCheckboxs.length !== 0) {
    const elementRank = (element.offer.features) ? getRankAd(element, checkedCheckboxs) : 0;
    if(elementRank !== 0){
      return element;
    }
  }
  else {
    return element;
  }
};

const getSortData = (element, elementNext) => {
  const checkedCheckboxs = getCheckedCheckbox();
  const rankA = (element.offer.features) ? getRankAd(element, checkedCheckboxs) : 0;
  const rankB = (elementNext.offer.features) ? getRankAd(elementNext, checkedCheckboxs) : 0;
  if (rankA < rankB) {
    return 1;
  }
  else if (rankA > rankB){
    return -1;
  }
  else {
    return 0;
  }
};

const getFilteredData = (pin) => pin.filter(FilterByType).filter(FilterByPrice).filter(FilterByRooms).filter(FilterByGuests).filter(FilterByFeatures);

export {getSortData, getFilteredData};
