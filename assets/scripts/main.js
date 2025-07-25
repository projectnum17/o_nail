'use strict';
import toggleClass from './modules/toggleClass.js';
import headerFlow from './modules/headerFlow.js';
import modals from './modules/modals.js';
import form from './modules/form.js';
import reviews from './modules/reviews.js';
import asideMenu from './modules/asideMenu.js';
import activityCollection from './modules/activityCollection.js';
import { basketFlow as basket } from './modules/basket.js';

document.addEventListener('DOMContentLoaded', () => {
    headerFlow();
    basket();
    asideMenu();
    modals();
    toggleClass('.js-submenu', 'submenu');
    form();
    reviews();
    activityCollection('.faq-box', 'is-open');
    activityCollection('.js-filter', 'active');
});
