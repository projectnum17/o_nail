'use strict';
import toggleClass from './modules/toggleClass.js';
import headerFlow from './modules/headerFlow.js';
import modals from './modules/modals.js';
import form from './modules/form.js';
import { basketFlow as basket } from './modules/basket.js';

document.addEventListener('DOMContentLoaded', () => {
    headerFlow();
    toggleClass('.js-submenu', 'submenu');
    modals();
    form();
    basket();
});
