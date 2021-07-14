import './page-state.js';
import './validation.js';
import {setUserFormSubmit, clearForm} from'./user_form.js';
import {getData, onDataGetSuccess} from './api.js';
import { onFail } from './util.js';

setUserFormSubmit(clearForm);
