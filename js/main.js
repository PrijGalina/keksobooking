function getRandomInteger(min, max){
  min = (min < 0) ? 0 : min;
  max = (max > 0) ? max : 0;
  if(min < max && max !== 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min;// источник - https://learn.javascript.ru/number
  }
  return 'error';
}

getRandomInteger(5, 50);

function getRandomFloat(min, max, digitsNum){
  min = (min < 0) ? 0 : min;
  max = (max > 0) ? max : 0;
  if (min < max && max !== 0) {
    const randomValue = Math.random() * (max - min + 1) + min;
    return parseFloat(randomValue.toFixed(digitsNum));
  }
  return 'error';
}

getRandomFloat(0.1, 0.5, 3);
