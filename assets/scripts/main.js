'use strict';
import modals from './modules/modals.js';
import basketFlow from './modules/basket.js';
import toggleClass from './modules/toggleClass.js';
import headerFlow from './modules/headerFlow.js';
import form from './modules/form.js';
import reviews from './modules/reviews.js';
import asideMenu from './modules/asideMenu.js';
import activityCollection from './modules/activityCollection.js';
import orderFlow from './modules/orderFlow.js';
import locationFlow from './modules/locationFlow.js';
import cabinetFlow from './modules/cabinetFlow.js';

document.addEventListener('DOMContentLoaded', () => {
    headerFlow();
    basketFlow();
    asideMenu();
    modals();
    toggleClass('.js-submenu', 'submenu');
    form();
    reviews();
    orderFlow();
    activityCollection('.faq-box', 'is-open');
    activityCollection('.js-filter', 'active');
    activityCollection('.js-order-box', 'shown');
    locationFlow();
    cabinetFlow();
});
