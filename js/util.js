const getRandomPositiveInteger = (numValue, otherNumValue) => {
  // Функция взята из интернета и доработана,
  //Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
  const lower = Math.ceil(Math.min(Math.abs(numValue), Math.abs(otherNumValue)));
  const upper = Math.floor(Math.max(Math.abs(numValue), Math.abs(otherNumValue)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomPositiveFloat = (numValue, otherNumValue, digits = 1) => {
  const lower = Math.min(Math.abs(numValue), Math.abs(otherNumValue));
  const upper = Math.max(Math.abs(numValue), Math.abs(otherNumValue));
  const result = Math.random() * (upper - lower) + lower;
  return result.toFixed(digits);
};

const getRandomArrayElement = (array) => {
  const indexValues = array.length - 1;
  const randomIndex = getRandomPositiveInteger(0, indexValues);
  const randomElement = array[randomIndex];
  return randomElement;
};

const getShuffledRandomLengthArray = (customArray) => {
  const randomLengthArray = getRandomPositiveInteger(1, customArray.length);
  const newArray = [];
  for (let i = 0; i <= randomLengthArray-1; i++) {
    const newLengthCustomArray = customArray.length;
    const randomIndex = getRandomPositiveInteger(0, newLengthCustomArray - 1);
    newArray[i] = customArray[randomIndex];
    customArray.slice(randomIndex, 1);
  }
  return newArray;
};

const getDeclension = (number, titlesArr) => {
  // getDeclension(11, ['гостя', 'гостей', 'гостей']) ==> 'гостей'
  // в массиве слова идут по порядку для чисел 1(гостя), 4(гостей), 10(гостей) и тд
  const cases = [2, 0, 1, 1, 1, 2];
  return titlesArr[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};

const ALERT_SHOW_TIME = 5000;

const onFail = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.display = 'flex';
  alertContainer.style.alignItems = 'center';
  alertContainer.style.zIndex = 500;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '50%';
  alertContainer.style.top = '50%';
  alertContainer.style.width = '300px';
  alertContainer.style.height = '200px';
  alertContainer.style.padding = '10px 35px';
  alertContainer.style.fontSize = '18px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'white';
  alertContainer.style.transform = 'translate(-50%, -50%)';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayElement, getShuffledRandomLengthArray, getDeclension, onFail};
