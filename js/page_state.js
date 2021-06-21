import {formElement,filterElement} from './data.js';
import {toggleDisabledOnFormNodes} from './util.js';

const togglePageActiveState = (bool) => {
  formElement.classList.toggle('ad-form--disabled', bool); // метод toggle умеет принимать второй аргумент. Это удобно как раз для таких случаев
  filterElement.classList.toggle('ad-form--disabled', bool);
  toggleDisabledOnFormNodes(formElement, bool); // можно объединить в одну функцию учитывая, что обе формы у нас отключаются/включаются одновременно
  toggleDisabledOnFormNodes(filterElement, bool);
};

export {togglePageActiveState};
