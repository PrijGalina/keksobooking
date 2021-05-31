function getRandomInteger(min, max){
  min = min < 0 ? 0 : Math.floor(min);
  max = max > 0 ? Math.floor(max) : 0;
  if(min < max && max !== 0) {
    return Math.floor(Math.random() * (max - min + 1) + min);// источник - https://learn.javascript.ru/number
  }
  throw new Error('getRandomInteger — максимальное число не может равняться нулю и должно быть больше минимального, значения float округляются до ближайшего целого');
}

getRandomInteger(5, 50);

function getRandomFloat(min, max, digitsNum){
  min = min < 0 ? 0 : min;
  max = max > 0 ? max : 0;
  if (min < max && max !== 0) {
    const randomValue = Math.random() * (max - min) + min;
    return parseFloat(randomValue.toFixed(digitsNum));
  }
  throw new Error('getRandomFloat — максимальное число не может равняться нулю и должно быть больше минимального');
}

getRandomFloat(0.1, 0.5, 3);
