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

export {getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayElement, getShuffledRandomLengthArray};
