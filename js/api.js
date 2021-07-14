import {createOtherMarker, map, markerGroup} from './map.js';
import {filterForm} from './data.js';

const SERVER_ADDRESSES = {
  GET: 'https://23.javascript.pages.academy/keksobooking/data',
  POST: 'https://23.javascript.pages.academy/keksobooking',
};

const ADS_COUNT = 10;

const FilterByType = (element) => {
  return (filterForm.elements['housing-type'].value === 'any') ? element : element.offer.type === filterForm.elements['housing-type'].value;
};

const FilterByPrice = (element) => {
  let adPrice = '';
  (element.offer.price < 10000) ? adPrice = 'low' : '';
  ((element.offer.price >= 10000) && (element.offer.price < 50000)) ? adPrice = 'middle' : '';
  (element.offer.price >= 50000) ? adPrice = 'high' : '';

  return (filterForm.elements['housing-price'].value === 'any') ? element : adPrice === filterForm.elements['housing-price'].value;
};

const FilterByRooms = (element) => {
  return (filterForm.elements['housing-rooms'].value === 'any') ? element : element.offer.rooms == filterForm.elements['housing-rooms'].value ;
}

const FilterByGuests = (element) => {
  return (filterForm.elements['housing-guests'].value === 'any') ? element : element.offer.guests === filterForm.elements['housing-guests'].value;
}

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
  const intersection = list.filter(element => adFeatures.includes(element));
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

const getSortArray = (element, elementNext) => {
  const checkedCheckboxs = getCheckedCheckbox();
  const rankA = (element.offer.features) ? getRankAd(element, checkedCheckboxs) : 0;
  const rankB = (elementNext.offer.features) ? getRankAd(element, checkedCheckboxs) : 0;
  console.log('rankA', rankA);
  console.log('rankB', rankB);
  return (rankA < rankB) ? elementNext - element : element - elementNext;
};

const filter = (pin) => {
  return pin.
    filter(FilterByType).
    filter(FilterByPrice).
    filter(FilterByRooms).
    filter(FilterByGuests).
    filter(FilterByFeatures);
};

const onDataGetSuccess = (dataArray) => {
  const getPin = () => {
    const adArray = dataArray.slice(0, ADS_COUNT);
    createOtherMarker(adArray);
  };

  filterForm.addEventListener('change', (e) => {
    markerGroup.clearLayers();
    const data = filter(dataArray);
    console.log('olddata',data);
    data.sort(getSortArray);
    console.log('data',data);
    const filterArray = data.slice(0, ADS_COUNT)
    createOtherMarker(filterArray);
    console.log('__________________________________________________________________________');
  });

  getPin();
  return dataArray;
};

const getData = (onSuccess, onError) => {
  fetch(SERVER_ADDRESSES.GET)
    .then((response) => response.json())
    .then((ads) => onSuccess(ads))
    .then((data) => {
      const allAds = data;
      return allAds;
    })
    .catch(() => onError('Ошибка получения данных с сервера'));
};

const sendData = (onSuccess, onError, body) => {
  fetch(
    SERVER_ADDRESSES.POST,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      }
      else {
        onError();
      }
    })
    .catch(() => {
      onError();
    });
};

export {getData, sendData, onDataGetSuccess};
